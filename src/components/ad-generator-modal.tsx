"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Sparkles,
  Instagram,
  Linkedin,
  Facebook,
  MapPin,
  Image as ImageIcon,
  Copy,
  Share2,
  Download,
  RefreshCw,
  Check,
  ExternalLink,
  Loader2,
  Wand2,
  Palette,
  Type,
  Target,
  Send
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// Plataformas disponibles
const PLATFORMS = [
  { id: 'instagram', name: 'Instagram', icon: Instagram, size: '1024x1024', color: 'from-pink-500 to-purple-500' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, size: '1344x768', color: 'from-blue-600 to-blue-700' },
  { id: 'facebook', name: 'Facebook', icon: Facebook, size: '1344x768', color: 'from-blue-500 to-blue-600' },
  { id: 'google_business', name: 'Google Business', icon: MapPin, size: '1024x1024', color: 'from-emerald-500 to-teal-500' },
];

// Modelos de imagen
const IMAGE_MODELS = [
  { id: 'default', name: 'Estándar', description: 'Equilibrado y profesional' },
  { id: 'artistic', name: 'Artístico', description: 'Creativo y único' },
  { id: 'photorealistic', name: 'Fotorrealista', description: 'Como una foto real' },
  { id: 'minimalist', name: 'Minimalista', description: 'Limpio y sencillo' },
  { id: 'vibrant', name: 'Vibrante', description: 'Colores llamativos' },
];

// Tipos de contenido
const CONTENT_TYPES = [
  { id: 'promocion', name: 'Promoción', description: 'Ofertas y descuentos' },
  { id: 'producto', name: 'Producto', description: 'Mostrar un producto' },
  { id: 'servicio', name: 'Servicio', description: 'Destacar un servicio' },
  { id: 'evento', name: 'Evento', description: 'Anunciar un evento' },
  { id: 'noticia', name: 'Noticia', description: 'Compartir novedades' },
];

interface AdGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa?: string;
}

export function AdGeneratorModal({ isOpen, onClose, empresa = "Mi Negocio" }: AdGeneratorModalProps) {
  // Form state
  const [formData, setFormData] = useState({
    empresa: empresa,
    producto: '',
    objetivo: '',
    tono: 'profesional',
    plataforma: 'instagram',
    modeloImagen: 'default',
    tipoContenido: 'promocion',
    incluirHashtags: true,
    incluirEmoji: true,
  });

  // Generated content state
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    titulo: string;
    texto: string;
    hashtags: string[];
    callToAction: string;
  } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [shareUrls, setShareUrls] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  // Reset when modal opens
  useEffect(() => {
    if (isOpen) {
      setFormData(prev => ({ ...prev, empresa }));
    }
  }, [isOpen, empresa]);

  // Generate ad
  const handleGenerate = async () => {
    if (!formData.producto || !formData.objetivo) return;

    setIsGenerating(true);
    setGeneratedContent(null);
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/generate-ad', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setGeneratedContent(data.content);
        setGeneratedImage(data.image.base64);
        setShareUrls(data.shareUrls);
      } else {
        console.error('Error generating ad:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  // Download image
  const downloadImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = `data:image/png;base64,${generatedImage}`;
    link.download = `anuncio-${formData.plataforma}-${Date.now()}.png`;
    link.click();
  };

  // Open in new tab
  const openInNewTab = () => {
    if (!generatedImage) return;
    const newWindow = window.open();
    if (newWindow) {
      newWindow.document.write(`<img src="data:image/png;base64,${generatedImage}" style="max-width:100%" />`);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] flex items-center justify-center p-4"
        onClick={(e) => e.target === e.currentTarget && onClose()}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-background rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden shadow-2xl border border-border"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-violet-500/10 to-purple-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Generador de Anuncios IA</h2>
                <p className="text-xs text-muted-foreground">Elena • Community Manager</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex flex-col lg:grid lg:grid-cols-2 h-[calc(90vh-80px)]">
            {/* Left: Form */}
            <div className="p-4 sm:p-6 overflow-y-auto border-r lg:border-r max-h-[50vh] lg:max-h-full">
              <Tabs defaultValue="datos" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="datos" className="text-xs">
                    <Target className="w-3 h-3 mr-1" /> Datos
                  </TabsTrigger>
                  <TabsTrigger value="plataforma" className="text-xs">
                    <Share2 className="w-3 h-3 mr-1" /> Plataforma
                  </TabsTrigger>
                  <TabsTrigger value="estilo" className="text-xs">
                    <Palette className="w-3 h-3 mr-1" /> Estilo
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="datos" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Nombre de tu empresa/negocio</Label>
                    <Input
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Tu Negocio S.L."
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Producto o servicio a promocionar *</Label>
                    <Input
                      value={formData.producto}
                      onChange={(e) => setFormData({ ...formData, producto: e.target.value })}
                      placeholder="Ej: Servicio de limpieza a domicilio"
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Objetivo del anuncio *</Label>
                    <Textarea
                      value={formData.objetivo}
                      onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                      placeholder="Ej: Conseguir más clientes para el servicio premium con un 20% de descuento"
                      className="h-24 resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tipo de contenido</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {CONTENT_TYPES.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setFormData({ ...formData, tipoContenido: type.id })}
                          className={`p-3 rounded-lg border text-left transition-all ${
                            formData.tipoContenido === type.id
                              ? 'border-violet-500 bg-violet-500/10'
                              : 'hover:border-violet-500/50'
                          }`}
                        >
                          <div className="text-sm font-medium">{type.name}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Tono del mensaje</Label>
                    <Select value={formData.tono} onValueChange={(v) => setFormData({ ...formData, tono: v })}>
                      <SelectTrigger className="h-10">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profesional">Profesional</SelectItem>
                        <SelectItem value="cercano">Cercano y amigable</SelectItem>
                        <SelectItem value="divertido">Divertido y casual</SelectItem>
                        <SelectItem value="urgente">Urgente y persuasivo</SelectItem>
                        <SelectItem value="elegante">Elegante y sofisticado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <TabsContent value="plataforma" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Selecciona la plataforma</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {PLATFORMS.map((platform) => {
                        const Icon = platform.icon;
                        return (
                          <button
                            key={platform.id}
                            onClick={() => setFormData({ ...formData, plataforma: platform.id })}
                            className={`p-4 rounded-xl border text-left transition-all ${
                              formData.plataforma === platform.id
                                ? `border-2 bg-gradient-to-br ${platform.color} text-white`
                                : 'hover:border-violet-500/50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-6 h-6" />
                              <div>
                                <div className="font-medium">{platform.name}</div>
                                <div className={`text-xs ${formData.plataforma === platform.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                                  {platform.size}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.incluirHashtags}
                        onChange={(e) => setFormData({ ...formData, incluirHashtags: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Incluir hashtags</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.incluirEmoji}
                        onChange={(e) => setFormData({ ...formData, incluirEmoji: e.target.checked })}
                        className="rounded"
                      />
                      <span className="text-sm">Incluir emojis</span>
                    </label>
                  </div>
                </TabsContent>

                <TabsContent value="estilo" className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Modelo de generación de imagen</Label>
                    <div className="grid gap-2">
                      {IMAGE_MODELS.map((model) => (
                        <button
                          key={model.id}
                          onClick={() => setFormData({ ...formData, modeloImagen: model.id })}
                          className={`p-3 rounded-lg border text-left transition-all flex items-center justify-between ${
                            formData.modeloImagen === model.id
                              ? 'border-violet-500 bg-violet-500/10'
                              : 'hover:border-violet-500/50'
                          }`}
                        >
                          <div>
                            <div className="text-sm font-medium">{model.name}</div>
                            <div className="text-xs text-muted-foreground">{model.description}</div>
                          </div>
                          {formData.modeloImagen === model.id && (
                            <Check className="w-4 h-4 text-violet-500" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <Separator className="my-4" />

              <Button
                className="w-full h-12 bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 gap-2"
                onClick={handleGenerate}
                disabled={isGenerating || !formData.producto || !formData.objetivo}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generando anuncio...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generar Anuncio
                  </>
                )}
              </Button>
            </div>

            {/* Right: Preview */}
            <div className="p-4 sm:p-6 overflow-y-auto bg-muted/30 flex-1 lg:flex-none">
              {!generatedContent && !isGenerating && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                    <ImageIcon className="w-10 h-10 text-violet-500/50" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Tu anuncio aparecerá aquí</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Completa los datos del formulario y haz clic en "Generar Anuncio" para crear contenido automático para tus redes sociales.
                  </p>
                </div>
              )}

              {isGenerating && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center animate-pulse">
                      <Wand2 className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Loader2 className="w-5 h-5 text-violet-500 animate-spin" />
                    </div>
                  </div>
                  <h3 className="text-lg font-medium mt-6 mb-2">Creando tu anuncio...</h3>
                  <p className="text-sm text-muted-foreground">
                    Elena está generando el texto y la imagen perfectos para tu negocio.
                  </p>
                </div>
              )}

              {generatedContent && generatedImage && (
                <div className="space-y-4">
                  {/* Image Preview */}
                  <div className="relative group">
                    <img
                      src={`data:image/png;base64,${generatedImage}`}
                      alt="Generated ad"
                      className="w-full rounded-xl shadow-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={downloadImage}>
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="secondary" className="h-8 w-8 p-0" onClick={openInNewTab}>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Text Content */}
                  <Card>
                    <CardContent className="p-4 space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-muted-foreground">Título</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => copyToClipboard(generatedContent.titulo, 'titulo')}
                          >
                            {copied === 'titulo' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                        <p className="font-semibold">{generatedContent.titulo}</p>
                      </div>

                      <Separator />

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-muted-foreground">Texto del anuncio</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 text-xs"
                            onClick={() => copyToClipboard(generatedContent.texto, 'texto')}
                          >
                            {copied === 'texto' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          </Button>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{generatedContent.texto}</p>
                      </div>

                      {generatedContent.hashtags && generatedContent.hashtags.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-medium text-muted-foreground">Hashtags</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 text-xs"
                                onClick={() => copyToClipboard(generatedContent.hashtags.join(' '), 'hashtags')}
                              >
                                {copied === 'hashtags' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {generatedContent.hashtags.map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      <Separator />

                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Call to Action</span>
                        <p className="text-sm font-medium text-violet-600">{generatedContent.callToAction}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Share Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => window.open(shareUrls.whatsapp, '_blank')}>
                      <Send className="w-3 h-3" /> WhatsApp
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => window.open(shareUrls.twitter, '_blank')}>
                      <Share2 className="w-3 h-3" /> Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => window.open(shareUrls.linkedin, '_blank')}>
                      <Linkedin className="w-3 h-3" /> LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => window.open(shareUrls.facebook, '_blank')}>
                      <Facebook className="w-3 h-3" /> Facebook
                    </Button>
                    <Button variant="outline" size="sm" className="gap-1" onClick={() => window.open(shareUrls.email, '_blank')}>
                      <Send className="w-3 h-3" /> Email
                    </Button>
                  </div>

                  {/* Regenerate */}
                  <Button
                    variant="outline"
                    className="w-full gap-2"
                    onClick={handleGenerate}
                    disabled={isGenerating}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Generar otro anuncio
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default AdGeneratorModal;
