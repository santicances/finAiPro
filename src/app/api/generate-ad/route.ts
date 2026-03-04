import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

// Modelos de imagen disponibles
const IMAGE_MODELS = [
  { id: 'default', name: 'Estándar', description: 'Modelo equilibrado para todo tipo de imágenes' },
  { id: 'artistic', name: 'Artístico', description: 'Estilo artístico y creativo' },
  { id: 'photorealistic', name: 'Fotorrealista', description: 'Imágenes realistas tipo fotografía' },
  { id: 'minimalist', name: 'Minimalista', description: 'Diseño limpio y sencillo' },
  { id: 'vibrant', name: 'Vibrante', description: 'Colores vivos y llamativos' },
];

// Plataformas sociales
const SOCIAL_PLATFORMS: Record<string, { name: string; size: '1024x1024' | '768x1344' | '864x1152' | '1344x768' | '1152x864' | '1440x720' | '720x1440'; icon: string }> = {
  instagram: { name: 'Instagram', size: '1024x1024', icon: 'instagram' },
  linkedin: { name: 'LinkedIn', size: '1344x768', icon: 'linkedin' },
  facebook: { name: 'Facebook', size: '1344x768', icon: 'facebook' },
  google_business: { name: 'Google Business', size: '1024x1024', icon: 'map-pin' },
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      empresa, 
      producto, 
      objetivo, 
      tono, 
      plataforma,
      modeloImagen = 'default',
      incluirHashtags = true,
      incluirEmoji = true,
      tipoContenido = 'promocion'
    } = body;

    if (!empresa || !producto || !objetivo) {
      return NextResponse.json(
        { error: 'Faltan parámetros requeridos: empresa, producto, objetivo' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    // 1. Generar texto del anuncio
    const platformInfo = SOCIAL_PLATFORMS[plataforma] || SOCIAL_PLATFORMS.instagram;
    
    const systemPrompt = `Eres una experta community manager especializada en marketing digital para PYMES. Creas contenido atractivo, profesional y optimizado para redes sociales. Tu nombre es Elena y trabajas para FinAI Pro.`;

    const userPrompt = `Crea un anuncio publicitario para ${plataforma || 'Instagram'} con los siguientes datos:

EMPRESA: ${empresa}
PRODUCTO/SERVICIO: ${producto}
OBJETIVO DEL ANUNCIO: ${objetivo}
TONO: ${tono || 'profesional y cercano'}
TIPO DE CONTENIDO: ${tipoContenido}

Requisitos:
- Texto principal atractivo y persuasivo (máximo 150 palabras)
- Un título o gancho inicial impactante
- ${incluirHashtags ? '5-8 hashtags relevantes' : 'Sin hashtags'}
- ${incluirEmoji ? 'Emojis estratégicos para mayor engagement' : 'Sin emojis'}
- Call to action claro

Responde en este formato JSON:
{
  "titulo": "Título gancho",
  "texto": "Texto principal del anuncio",
  "hashtags": ["hashtag1", "hashtag2"],
  "callToAction": "Llamada a la acción",
  "sugerenciaImagen": "Descripción detallada de la imagen sugerida para el anuncio"
}`;

    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'assistant', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      thinking: { type: 'disabled' }
    });

    const responseText = completion.choices[0]?.message?.content || '';
    
    // Parsear respuesta JSON
    let adContent;
    try {
      // Intentar extraer JSON de la respuesta
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        adContent = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No se encontró JSON en la respuesta');
      }
    } catch {
      // Si no se puede parsear, crear estructura por defecto
      adContent = {
        titulo: `¡Descubre ${producto}!`,
        texto: responseText.substring(0, 500),
        hashtags: ['#marketing', '#pyme', producto.replace(/\s+/g, '').toLowerCase()],
        callToAction: '¡Contáctanos hoy!',
        sugerenciaImagen: `${producto} profesional para ${empresa}`
      };
    }

    // 2. Generar imagen
    const imagePrompt = buildImagePrompt(adContent.sugerenciaImagen, modeloImagen, empresa, producto);
    
    const imageSize = platformInfo.size;

    const imageResponse = await zai.images.generations.create({
      prompt: imagePrompt,
      size: imageSize
    });

    const imageBase64 = imageResponse.data[0]?.base64;

    // 3. Construir respuesta completa
    return NextResponse.json({
      success: true,
      content: {
        titulo: adContent.titulo,
        texto: adContent.texto,
        hashtags: adContent.hashtags,
        callToAction: adContent.callToAction
      },
      image: {
        base64: imageBase64,
        size: imageSize,
        prompt: imagePrompt,
        model: modeloImagen
      },
      platform: {
        id: plataforma,
        ...platformInfo
      },
      shareUrls: generateShareUrls(plataforma, adContent)
    });

  } catch (error: unknown) {
    console.error('Error generating ad:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al generar el anuncio';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

// GET para obtener modelos disponibles
export async function GET() {
  return NextResponse.json({
    imageModels: IMAGE_MODELS,
    platforms: Object.entries(SOCIAL_PLATFORMS).map(([id, data]) => ({
      id,
      ...data
    }))
  });
}

// Función para construir el prompt de imagen
function buildImagePrompt(
  sugerencia: string, 
  modelo: string, 
  empresa: string, 
  producto: string
): string {
  const styleModifiers: Record<string, string> = {
    default: 'professional, clean design, high quality',
    artistic: 'artistic style, creative, unique visual elements',
    photorealistic: 'photorealistic, studio lighting, professional photography',
    minimalist: 'minimalist design, clean lines, simple composition, elegant',
    vibrant: 'vibrant colors, energetic, eye-catching, bold design'
  };

  const style = styleModifiers[modelo] || styleModifiers.default;
  
  return `Marketing image for ${empresa}, promoting ${producto}. ${sugerencia}. ${style}, social media optimized, no text overlay`;
}

// Función para generar URLs de compartir
function generateShareUrls(plataforma: string, content: { titulo: string; texto: string; hashtags?: string[] }): Record<string, string> {
  const fullText = `${content.titulo}\n\n${content.texto}\n\n${content.hashtags?.join(' ') || ''}`;
  const encodedText = encodeURIComponent(fullText.substring(0, 280));
  
  return {
    twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://example.com')}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}`,
    whatsapp: `https://wa.me/?text=${encodedText}`,
    email: `mailto:?subject=${encodeURIComponent(content.titulo)}&body=${encodedText}`
  };
}
