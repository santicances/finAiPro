import { NextRequest, NextResponse } from 'next/server';
import ZAI from 'z-ai-web-dev-sdk';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages, system_prompt } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Se requiere un array de mensajes' },
        { status: 400 }
      );
    }

    const zai = await ZAI.create();

    // Construir el sistema prompt por defecto si no se proporciona
    const defaultSystemPrompt = `Eres un asistente de IA amable y profesional que trabaja para FinAI Pro. 
Ayudas a usuarios con consultas sobre sus agentes de IA, dashboards, análisis de datos y automatización de procesos.
Responde de forma concisa, útil y en español.`;

    const systemMessage = system_prompt || defaultSystemPrompt;

    // Formatear mensajes para la API
    const formattedMessages = [
      { role: 'assistant', content: systemMessage },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      }))
    ];

    const completion = await zai.chat.completions.create({
      messages: formattedMessages,
      thinking: { type: 'disabled' }
    });

    const reply = completion.choices[0]?.message?.content || 'Lo siento, no pude procesar tu solicitud.';

    return NextResponse.json({ reply });

  } catch (error: unknown) {
    console.error('Error in chat API:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error al procesar la solicitud';
    return NextResponse.json(
      { error: errorMessage, reply: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, inténtalo de nuevo.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Chat API is running'
  });
}
