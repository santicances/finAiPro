"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BarChart3,
  Database,
  Cpu,
  Brain,
  Bot,
  Phone,
  Users,
  TrendingUp,
  Zap,
  Shield,
  Clock,
  Check,
  ArrowRight,
  Play,
  Sparkles,
  Target,
  PieChart,
  Activity,
  Mail,
  MessageSquare,
  UserCheck,
  Layers,
  Star,
  Menu,
  X,
  Send,
  Calendar,
  Video,
  Linkedin,
  Twitter,
  Globe,
  FileText,
  Lock,
  Scale,
  Building,
  HeadphonesIcon,
  DollarSign,
  Megaphone,
  Code,
  Briefcase,
  ArrowLeft,
  CheckCircle2,
  User,
  Building2,
  Settings,
  PhoneCall,
  Mic,
  Webhook,
  MessageCircle,
  FileSignature,
  CpuIcon,
  Puzzle,
  Palette,
  Wallet,
  LineChart,
  Radar,
  Eye,
  Handshake,
  Landmark,
  Coins,
  Newspaper,
  RefreshCw,
  Percent,
  PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  AlertTriangle,
  Lightbulb,
  Rocket,
  BriefcaseIcon,
  LayoutDashboard,
  Rss,
  TrendingDown,
  BarChart2,
  Radio,
  Filter,
  Plus,
  Trash2,
  Edit,
  MoreVertical,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  UserPlus,
  MessageSquareMore,
  Maximize2,
  Minimize2,
  Copy,
  Download,
  Link,
  Power,
  Sliders,
  PhoneIncoming,
  MailOpen,
  ExternalLink,
  Wrench,
  PieChart as PieChartIcon2,
  PhoneOff,
  GripVertical,
  AlertCircle,
  CheckCircle,
  Pause,
  Calendar as CalendarIcon,
  MousePointerClick,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, XAxis, YAxis, PieChart as RechartsPie, Pie, Cell, Area, AreaChart, Line, LineChart as RechartsLineChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar as RechartsRadar } from "recharts";

// Types
type ViewType = "landing" | "equipo" | "legal" | "configuracion" | "panel" | "target" | "login";

import { SmeDashboardDemo } from "@/components/sme-dashboard";
import { TargetDashboardDemo } from "@/components/target-dashboard";

// Wizard Steps - Extended
const WIZARD_STEPS = [
  { id: 1, title: "Contacto", icon: User },
  { id: 2, title: "Empresa", icon: Building2 },
  { id: 3, title: "Funciones", icon: Settings },
  { id: 4, title: "Agentes", icon: Bot },
  { id: 5, title: "Modelos IA", icon: Brain },
  { id: 6, title: "Integraciones", icon: Webhook },
  { id: 7, title: "Objetivos", icon: Target },
  { id: 8, title: "Contrato", icon: FileSignature },
];

// Form Data Type - Extended
interface FormData {
  // Step 1: Contacto
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;

  // Step 2: Empresa
  empleados: string;
  sector: string;
  presupuestoAgente: string;
  esInversor: boolean;
  portfolioEmpresas: string;

  // Step 3: Funciones
  funciones: string[];

  // Step 4: Agentes
  numAgentes: string;
  tipoAgentes: string;
  distribucionAgentes: { [key: string]: number };

  // Step 5: Modelos IA
  modelos: string[];
  modeloPrincipal: string;

  // Step 6: Integraciones MCP
  integracionesMCP: string[];

  // Step 7: Objetivos
  objetivoROI: string;
  plazoObjetivo: string;
  noticiasPreferidas: string[];
  seguimientoCompetencia: boolean;
  comentarios: string;

  // Old integrations (kept for compatibility)
  integracionWeb: boolean;
  integracionWebchat: boolean;
  integracionLlamadas: boolean;
  clonacionVoz: boolean;
  llamadasAutonomas: boolean;
}

// Initial form data
const initialFormData: FormData = {
  nombre: "",
  email: "",
  telefono: "",
  empresa: "",
  empleados: "",
  sector: "",
  presupuestoAgente: "",
  esInversor: false,
  portfolioEmpresas: "",
  funciones: [],
  numAgentes: "",
  tipoAgentes: "",
  distribucionAgentes: {},
  modelos: [],
  modeloPrincipal: "",
  integracionesMCP: [],
  objetivoROI: "",
  plazoObjetivo: "",
  noticiasPreferidas: [],
  seguimientoCompetencia: false,
  comentarios: "",
  integracionWeb: false,
  integracionWebchat: false,
  integracionLlamadas: false,
  clonacionVoz: false,
  llamadasAutonomas: false,
};

// Navigation State
function useNavigation() {
  const [currentView, setCurrentView] = useState<ViewType>("landing");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  return { currentView, setCurrentView, formData, setFormData };
}

// AI Models available
const AI_MODELS = [
  { id: "claude-opus-4.6", name: "Claude Opus 4.6", provider: "Anthropic", tier: "premium", description: "Máximo rendimiento para tareas complejas", speed: "Medio", cost: "Alto" },
  { id: "claude-sonnet-4.6", name: "Claude Sonnet 4.6", provider: "Anthropic", tier: "standard", description: "Balance perfecto rendimiento/coste", speed: "Rápido", cost: "Medio" },
  { id: "claude-haiku-4.5", name: "Claude Haiku 4.5", provider: "Anthropic", tier: "economy", description: "Respuestas instantáneas, bajo coste", speed: "Muy rápido", cost: "Bajo" },
  { id: "gpt-5.2", name: "GPT 5.2", provider: "OpenAI", tier: "premium", description: "Modelo más avanzado de OpenAI", speed: "Medio", cost: "Alto" },
  { id: "gemini-3-flash", name: "Gemini 3 Flash", provider: "Google", tier: "standard", description: "Multimodal y ultrarrápido", speed: "Muy rápido", cost: "Medio" },
  { id: "gemini-2.5-flash-lite", name: "Gemini 2.5 Flash Lite", provider: "Google", tier: "economy", description: "Ligero y eficiente", speed: "Muy rápido", cost: "Bajo" },
  { id: "gemini-3.1-pro-preview", name: "Gemini 3.1 Pro Preview", provider: "Google", tier: "premium", description: "Última generación de Google", speed: "Medio", cost: "Alto" },
  { id: "kat-coder-pro-v1", name: "KAT-Coder-Pro V1", provider: "KimiLabs", tier: "specialized", description: "Especializado en código y análisis técnico", speed: "Rápido", cost: "Medio" },
  { id: "kimi-k2.5", name: "Kimi K2.5", provider: "Moonshot", tier: "standard", description: "Excelente en análisis de documentos largos", speed: "Rápido", cost: "Medio" },
  { id: "minimax-m2.5", name: "MiniMax M2.5", provider: "MiniMax", tier: "standard", description: "Gran rendimiento en tareas creativas", speed: "Rápido", cost: "Medio" },
];

// MCP Integrations
const MCP_INTEGRATIONS = [
  { id: "slack", name: "Slack", icon: MessageSquare, category: "Comunicación", description: "Notificaciones y comandos en canales" },
  { id: "notion", name: "Notion", icon: Layers, category: "Productividad", description: "Crear y actualizar páginas, bases de datos" },
  { id: "github", name: "GitHub", icon: Code, category: "Desarrollo", description: "Issues, PRs, repositorios" },
  { id: "jira", name: "Jira", icon: Briefcase, category: "Gestión", description: "Tickets, sprints, workflows" },
  { id: "linear", name: "Linear", icon: Zap, category: "Gestión", description: "Issues y proyectos ágiles" },
  { id: "asana", name: "Asana", icon: Check, category: "Gestión", description: "Tareas y proyectos" },
  { id: "trello", name: "Trello", icon: Layers, category: "Gestión", description: "Boards, lists y cards" },
  { id: "salesforce", name: "Salesforce", icon: Users, category: "CRM", description: "Leads, oportunidades, cuentas" },
  { id: "hubspot", name: "HubSpot", icon: Target, category: "CRM", description: "Marketing, ventas, service" },
  { id: "intercom", name: "Intercom", icon: MessageCircle, category: "Soporte", description: "Chat y mensajes a usuarios" },
  { id: "zendesk", name: "Zendesk", icon: HeadphonesIcon, category: "Soporte", description: "Tickets de soporte" },
  { id: "figma", name: "Figma", icon: Palette, category: "Diseño", description: "Diseños y prototipos" },
  { id: "miro", name: "Miro", icon: PieChart, category: "Colaboración", description: "Boards y diagramas" },
  { id: "vercel", name: "Vercel", icon: Globe, category: "Infraestructura", description: "Deployments y logs" },
  { id: "aws", name: "AWS", icon: Database, category: "Infraestructura", description: "Servicios cloud AWS" },
];

// News Sources
const NEWS_SOURCES = [
  // Fuentes Españolas
  { id: "expansion", name: "Expansión", category: "Economía España", flag: "ES" },
  { id: "cincodias", name: "Cinco Días", category: "Economía España", flag: "ES" },
  { id: "eleconomista", name: "El Economista", category: "Economía España", flag: "ES" },
  { id: "invertia", name: "Invertia", category: "Mercados España", flag: "ES" },
  { id: "bolsamadrid", name: "Bolsa de Madrid", category: "Mercados España", flag: "ES" },
  // Fuentes Internacionales
  { id: "bloomberg", name: "Bloomberg", category: "Finanzas Global", flag: "INT" },
  { id: "reuters", name: "Reuters", category: "Finanzas Global", flag: "INT" },
  { id: "wsj", name: "Wall Street Journal", category: "Finanzas Global", flag: "INT" },
  { id: "ft", name: "Financial Times", category: "Finanzas Global", flag: "INT" },
  { id: "cnbc", name: "CNBC", category: "Mercados Global", flag: "INT" },
];

// Navbar Component
function Navbar({ currentView, setCurrentView }: { currentView: ViewType; setCurrentView: (v: ViewType) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button
            onClick={() => setCurrentView("landing")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">FinAI Pro</span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {currentView === "landing" && (
              <>
                <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">Servicios</a>
                <a href="#inversores" className="text-muted-foreground hover:text-foreground transition-colors">Inversores</a>
                <a href="#dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard IA</a>
                <a href="#dashboard" className="text-muted-foreground hover:text-foreground transition-colors font-medium text-blue-500">Dashboard Pymes</a>
                <button onClick={() => setCurrentView("target")} className="text-muted-foreground hover:text-blue-500 transition-colors">Configurar Target</button>
                <a href="#precios" className="text-muted-foreground hover:text-foreground transition-colors">Precios</a>
              </>
            )}
            <button
              onClick={() => setCurrentView("equipo")}
              className={`transition-colors ${currentView === "equipo" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
            >
              Equipo
            </button>
            <button
              onClick={() => setCurrentView("legal")}
              className={`transition-colors ${currentView === "legal" ? "text-emerald-500" : "text-muted-foreground hover:text-foreground"}`}
            >
              Legal
            </button>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" onClick={() => setCurrentView("login")}>Iniciar Sesión</Button>
            <Button
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              onClick={() => setCurrentView("configuracion")}
            >
              Demo Gratis
            </Button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="px-4 py-4 space-y-4">
              {currentView === "landing" && (
                <>
                  <a href="#servicios" className="block text-muted-foreground hover:text-foreground">Servicios</a>
                  <a href="#inversores" className="block text-muted-foreground hover:text-foreground">Inversores</a>
                  <a href="#dashboard" className="block text-muted-foreground hover:text-foreground">Dashboard IA</a>
                  <a href="#dashboard" className="block font-medium text-blue-500 hover:text-blue-600">Dashboard Pymes</a>
                  <button onClick={() => { setCurrentView("target"); setIsOpen(false); }} className="block text-muted-foreground hover:text-blue-500 w-full text-left">Configurar Target</button>
                  <a href="#precios" className="block text-muted-foreground hover:text-foreground">Precios</a>
                </>
              )}
              <button onClick={() => { setCurrentView("equipo"); setIsOpen(false); }} className="block text-muted-foreground hover:text-foreground w-full text-left">Equipo</button>
              <button onClick={() => { setCurrentView("legal"); setIsOpen(false); }} className="block text-muted-foreground hover:text-foreground w-full text-left">Legal</button>
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" className="flex-1" onClick={() => { setCurrentView("login"); setIsOpen(false); }}>Iniciar Sesión</Button>
                <Button className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600" onClick={() => { setCurrentView("configuracion"); setIsOpen(false); }}>Demo Gratis</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// Hero Section
function HeroSection({ setCurrentView }: { setCurrentView: (v: ViewType) => void }) {
  return (
    <section className="pt-32 pb-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
              <Sparkles className="w-3 h-3 mr-1" />Impulsado por IA Avanzada
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Transforma tu Empresa Financiera con{" "}
              <span className="bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">Inteligencia Artificial</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Automatiza procesos, optimiza carteras y multiplica la productividad de tu equipo con agentes digitales que aprenden y replican el comportamiento de tus mejores empleados.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 gap-2" onClick={() => setCurrentView("configuracion")}>
                Solicitar Demo <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Play className="w-4 h-4" /> Ver Video
              </Button>
            </div>

            <div className="flex items-center gap-8 mt-10">
              <div><div className="text-3xl font-bold">500+</div><div className="text-sm text-muted-foreground">Empresas Activas</div></div>
              <div className="w-px h-12 bg-border" />
              <div><div className="text-3xl font-bold">98%</div><div className="text-sm text-muted-foreground">Satisfacción</div></div>
              <div className="w-px h-12 bg-border" />
              <div><div className="text-3xl font-bold">3x</div><div className="text-sm text-muted-foreground">ROI Promedio</div></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative">
            <div className="bg-card rounded-2xl border border-border shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-xs text-muted-foreground">Dashboard en vivo</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <Bot className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div>
                      <div className="font-medium">Agente Digital #47</div>
                      <div className="text-sm text-muted-foreground">Gestión de cobros</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-sm text-emerald-500">Activo</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-xl">
                    <div className="text-2xl font-bold text-emerald-500">847</div>
                    <div className="text-xs text-muted-foreground">Emails enviados</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-xl">
                    <div className="text-2xl font-bold text-teal-500">156</div>
                    <div className="text-xs text-muted-foreground">Llamadas hoy</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded-xl">
                    <div className="text-2xl font-bold text-cyan-500">94%</div>
                    <div className="text-xs text-muted-foreground">Éxito</div>
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-xl border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium">Aprendizaje en progreso</span>
                  </div>
                  <Progress value={78} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">Analizando patrones de comunicación del equipo...</p>
                </div>
              </div>
            </div>

            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-3 shadow-lg">
              <div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-emerald-500" /><span className="text-sm font-medium">+23% ROI</span></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Services Section
function ServicesSection() {
  const services = [
    { icon: BarChart3, title: "Data Analytics", description: "Análisis avanzado de datos financieros.", features: ["KPIs en tiempo real", "Reportes automáticos", "Predicciones ML"] },
    { icon: Database, title: "ETL & Data Pipeline", description: "Integración multi-fuente automatizada.", features: ["Multi-source", "Tiempo real", "Validación"] },
    { icon: Brain, title: "Agentes de IA", description: "Agentes que aprenden y replican comportamientos.", features: ["Aprendizaje continuo", "Personalización", "Auto-mejora"] },
    { icon: Cpu, title: "Machine Learning", description: "Modelos predictivos para scoring y riesgo.", features: ["Modelos custom", "MLOps", "AutoML"] },
    { icon: Target, title: "RAG Systems", description: "Consultas inteligentes sobre tu conocimiento.", features: ["Búsqueda semántica", "Contexto", "Multi-doc"] },
    { icon: Users, title: "CRM Automation", description: "Automatización completa del CRM.", features: ["Sync automático", "Enriquecimiento", "Alertas"] },
    { icon: Phone, title: "Call Center AI", description: "Agentes virtuales con voz natural.", features: ["Voz natural", "Multi-idioma", "Transcripción"] },
    { icon: Bot, title: "Trabajadores Digitales", description: "Agentes que trabajan 24/7.", features: ["24/7 operativo", "Sin errores", "Escalables"] },
    { icon: Wallet, title: "Portfolio Inteligente", description: "Gestión de inversiones con IA.", features: ["Diversificación", "Rebalanceo auto", "Alertas riesgo"] },
  ];

  return (
    <section id="servicios" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <Badge className="mb-4 bg-teal-500/10 text-teal-600 border-teal-500/20">Servicios Completos</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Soluciones de IA para Empresas Financieras</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Desde gestión de cobros hasta fondos de inversión, automatizamos cada proceso.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:border-emerald-500/50 group cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-6 h-6 text-emerald-500" />
                  </div>
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {service.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">{feature}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Models & Technologies Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          {/* AI Models */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="h-full bg-gradient-to-br from-purple-500/5 to-violet-500/5 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle>Modelos de IA Disponibles</CardTitle>
                    <CardDescription>Selecciona los mejores modelos para cada tarea</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Claude Opus 4.6", tier: "Premium", provider: "Anthropic" },
                    { name: "Claude Sonnet 4.6", tier: "Standard", provider: "Anthropic" },
                    { name: "Claude Haiku 4.5", tier: "Economy", provider: "Anthropic" },
                    { name: "GPT 5.2", tier: "Premium", provider: "OpenAI" },
                    { name: "Gemini 3 Flash", tier: "Standard", provider: "Google" },
                    { name: "Gemini 2.5 Flash Lite", tier: "Economy", provider: "Google" },
                    { name: "Gemini 3.1 Pro Preview", tier: "Premium", provider: "Google" },
                    { name: "KAT-Coder-Pro V1", tier: "Specialized", provider: "KimiLabs" },
                    { name: "Kimi K2.5", tier: "Standard", provider: "Moonshot" },
                    { name: "MiniMax M2.5", tier: "Standard", provider: "MiniMax" },
                  ].map((model, i) => (
                    <div key={i} className="p-3 bg-muted/50 rounded-lg border hover:border-purple-500/50 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm truncate">{model.name}</span>
                        <Badge variant="outline" className={`text-xs ml-1 shrink-0 ${model.tier === "Premium" ? "border-purple-500/50 text-purple-500" :
                          model.tier === "Economy" ? "border-cyan-500/50 text-cyan-500" :
                            model.tier === "Specialized" ? "border-yellow-500/50 text-yellow-600" :
                              "border-teal-500/50 text-teal-500"
                          }`}>
                          {model.tier}
                        </Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">{model.provider}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* MCP Integrations */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="h-full bg-gradient-to-br from-teal-500/5 to-cyan-500/5 border-teal-500/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 flex items-center justify-center">
                    <Puzzle className="w-6 h-6 text-teal-500" />
                  </div>
                  <div>
                    <CardTitle>Integraciones MCP</CardTitle>
                    <CardDescription>Conecta con tus herramientas favoritas</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { name: "Slack", icon: MessageSquare, category: "Comunicación" },
                    { name: "Notion", icon: Layers, category: "Productividad" },
                    { name: "GitHub", icon: Code, category: "Desarrollo" },
                    { name: "Jira", icon: Briefcase, category: "Gestión" },
                    { name: "Linear", icon: Zap, category: "Gestión" },
                    { name: "Asana", icon: Check, category: "Gestión" },
                    { name: "Trello", icon: Layers, category: "Gestión" },
                    { name: "Salesforce", icon: Users, category: "CRM" },
                    { name: "HubSpot", icon: Target, category: "CRM" },
                    { name: "Intercom", icon: MessageCircle, category: "Soporte" },
                    { name: "Zendesk", icon: HeadphonesIcon, category: "Soporte" },
                    { name: "Figma", icon: Palette, category: "Diseño" },
                    { name: "Miro", icon: PieChart, category: "Colaboración" },
                    { name: "Vercel", icon: Globe, category: "Infraestructura" },
                    { name: "AWS", icon: Database, category: "Infraestructura" },
                  ].map((tool, i) => (
                    <div key={i} className="p-2 bg-muted/50 rounded-lg border hover:border-teal-500/50 transition-colors text-center group cursor-pointer">
                      <tool.icon className="w-5 h-5 mx-auto text-teal-500 mb-1 group-hover:scale-110 transition-transform" />
                      <span className="text-xs font-medium block truncate">{tool.name}</span>
                      <span className="text-[10px] text-muted-foreground">{tool.category}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Investor Portfolio Section - NEW
function InvestorSection() {
  return (
    <section id="inversores" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <Badge className="mb-4 bg-purple-500/10 text-purple-600 border-purple-500/20">
            <Wallet className="w-3 h-3 mr-1" />Para Inversores y Directivos
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Gestiona tu Portfolio de Empresas con IA
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            ¿Eres directivo o inversor con participación en múltiples empresas? Nuestro sistema te permite gestionar tu portfolio de agentes,
            asignar recursos donde más valor generan, y mantener seguimiento automático de la competencia.
          </p>
        </motion.div>

        {/* Main Value Proposition */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="h-full bg-gradient-to-br from-purple-500/5 to-emerald-500/5 border-purple-500/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                    <Landmark className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <CardTitle>Portfolio Multi-Empresa</CardTitle>
                    <CardDescription>Gestiona varias empresas desde un único dashboard</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Imagina que eres directivo con participación en varias empresas del sector financiero.
                  Nuestro sistema te permite:
                </p>
                <ul className="space-y-2">
                  {[
                    "Asignar más 'capital de agentes' a empresas con mayor potencial",
                    "Redistribuir recursos automáticamente según ROI",
                    "Ver métricas consolidadas de todo tu portfolio",
                    "Comparar rendimiento entre empresas",
                    "Detectar sinergias y oportunidades de colaboración"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card className="h-full bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 border-emerald-500/20">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Radar className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <CardTitle>Seguimiento de Competencia</CardTitle>
                    <CardDescription>Conoce a tu competencia y encuentra aliados</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  El sistema identifica automáticamente empresas competidoras y propone:
                </p>
                <ul className="space-y-2">
                  {[
                    "Análisis comparativo de productos y servicios",
                    "Detección de movimientos del mercado",
                    "Identificación de partnerships estratégicos",
                    "Alertas de nuevas entradas o productos",
                    "Sugerencias de acuerdos comerciales adyacentes"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Eye className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* News & Market Data */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 border-yellow-500/20">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-yellow-500/20 flex items-center justify-center mb-4">
                    <Newspaper className="w-8 h-8 text-yellow-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Fuentes de Noticias</h4>
                  <p className="text-sm text-muted-foreground">
                    Conecta con Bloomberg, Reuters, WSJ y más. Filtra noticias relevantes para tu portfolio automáticamente.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/20 flex items-center justify-center mb-4">
                    <LineChart className="w-8 h-8 text-orange-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Datos de Mercado</h4>
                  <p className="text-sm text-muted-foreground">
                    Integración con APIs de mercado en tiempo real. Pronósticos personalizados basados en tus inversiones.
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-red-500/20 flex items-center justify-center mb-4">
                    <RefreshCw className="w-8 h-8 text-red-500" />
                  </div>
                  <h4 className="font-semibold mb-2">Pronósticos IA</h4>
                  <p className="text-sm text-muted-foreground">
                    Modelos ML que aprenden de tu negocio y generan predicciones alineadas con tus objetivos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Example Scenario */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12">
          <Card className="border-2 border-emerald-500/30">
            <CardHeader className="bg-emerald-500/5">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-emerald-500" />
                Ejemplo: Directivo con 3 Empresas
              </CardTitle>
              <CardDescription>Cómo funciona el sistema en la práctica</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-emerald-500" />
                    <span className="font-medium">FinTech Cobros</span>
                  </div>
                  <div className="text-2xl font-bold text-emerald-500">45%</div>
                  <div className="text-xs text-muted-foreground">Asignación de agentes</div>
                  <Progress value={45} className="h-2 mt-2" />
                </div>
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-teal-500" />
                    <span className="font-medium">CreditCards Pro</span>
                  </div>
                  <div className="text-2xl font-bold text-teal-500">35%</div>
                  <div className="text-xs text-muted-foreground">Asignación de agentes</div>
                  <Progress value={35} className="h-2 mt-2" />
                </div>
                <div className="p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Building className="w-5 h-5 text-cyan-500" />
                    <span className="font-medium">InvestFund</span>
                  </div>
                  <div className="text-2xl font-bold text-cyan-500">20%</div>
                  <div className="text-xs text-muted-foreground">Asignación de agentes</div>
                  <Progress value={20} className="h-2 mt-2" />
                </div>
                <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                  <div className="text-sm font-medium mb-2">Acción Sugerida</div>
                  <p className="text-xs text-muted-foreground mb-3">
                    El sistema detecta que InvestFund tiene mejor ROI marginal. ¿Aumentar asignación?
                  </p>
                  <Button size="sm" className="w-full bg-emerald-500">
                    <ArrowUpRight className="w-3 h-3 mr-1" /> Optimizar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Wrapper for Dashboard Section
function DashboardDemoSection() {
  const [dashboardType, setDashboardType] = useState<"enterprise" | "sme">("sme");

  return (
    <div id="dashboard" className="pt-20 -mt-20 flex flex-col items-center">
      <div className="mb-8 z-10 relative">
        <div className="p-1.5 bg-muted rounded-xl inline-flex shadow-sm items-center border border-border">
          <button
            onClick={() => setDashboardType("enterprise")}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${dashboardType === "enterprise" ? "bg-background shadow-sm text-emerald-600 dark:text-emerald-400" : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/5"}`}
          >
            Gran Empresa (IA Avanzada)
          </button>
          <button
            onClick={() => setDashboardType("sme")}
            className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${dashboardType === "sme" ? "bg-background shadow-sm text-blue-600 dark:text-blue-400" : "text-muted-foreground hover:text-foreground hover:bg-muted-foreground/5"}`}
          >
            PYMEs y Agencias
          </button>
        </div>
      </div>
      <div className="w-full">
        {dashboardType === "enterprise" ? <EnterpriseDashboardDemo /> : <SmeDashboardDemo />}
      </div>
    </div>
  );
}

// Enterprise Dashboard Section with Competition Tracking
function EnterpriseDashboardDemo() {
  const [activeTab, setActiveTab] = useState("portfolio");

  const portfolioData = [
    { name: "Ene", valor: 100, roi: 0 },
    { name: "Feb", valor: 105, roi: 5 },
    { name: "Mar", valor: 112, roi: 12 },
    { name: "Abr", valor: 118, roi: 18 },
    { name: "May", valor: 125, roi: 25 },
    { name: "Jun", valor: 134, roi: 34 },
  ];

  const empresasPortfolio = [
    { name: "FinTech Cobros S.L.", participacion: 25, agentes: 12, roi: "+34%", tendencia: "up", color: "#10b981" },
    { name: "CreditCards Pro", participacion: 18, agentes: 8, roi: "+22%", tendencia: "up", color: "#14b8a6" },
    { name: "InvestFund Management", participacion: 15, agentes: 5, roi: "+41%", tendencia: "up", color: "#06b6d4" },
    { name: "DebtRecovery AI", participacion: 10, agentes: 3, roi: "-5%", tendencia: "down", color: "#f59e0b" },
  ];

  const competenciaData = [
    { metric: "Producto", nosotros: 95, competencia: 82 },
    { metric: "Precio", nosotros: 78, competencia: 85 },
    { metric: "Soporte", nosotros: 92, competencia: 75 },
    { metric: "Innovación", nosotros: 88, competencia: 90 },
    { metric: "Market Share", nosotros: 70, competencia: 85 },
  ];

  const alertasCompetencia = [
    { tipo: "producto", empresa: "CompetidorX", mensaje: "Lanzó nuevo producto de gestión de cobros", prioridad: "alta", tiempo: "Hace 2h" },
    { tipo: "partnership", empresa: "AlliedFin", mensaje: "Posible partner para expansión LATAM", prioridad: "media", tiempo: "Hace 1d" },
    { tipo: "mercado", empresa: "MarketWatch", mensaje: "Nueva regulación favorece tu modelo de negocio", prioridad: "alta", tiempo: "Hace 3d" },
  ];

  const chartConfig = { valor: { label: "Valor" }, roi: { label: "ROI %" } } satisfies ChartConfig;

  return (
    <section id="dashboard" className="py-20 px-4 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <Badge className="mb-4 bg-teal-500/10 text-teal-600 border-teal-500/20">Dashboard Inteligente</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Centro de Control Multi-Empresa</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Gestiona tu portfolio de empresas, asigna recursos, monitoriza la competencia y detecta oportunidades de negocio.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Card className="overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 p-6 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Centro de Control Financiero</h3>
                  <p className="text-sm text-muted-foreground">Datos actualizados en tiempo real</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1 animate-pulse" />Live
                  </Badge>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="portfolio">Mi Portfolio</TabsTrigger>
                  <TabsTrigger value="competencia">Competencia</TabsTrigger>
                  <TabsTrigger value="agentes">Agentes</TabsTrigger>
                  <TabsTrigger value="noticias">Noticias</TabsTrigger>
                </TabsList>

                {/* Portfolio Tab */}
                <TabsContent value="portfolio" className="space-y-6">
                  <div className="grid sm:grid-cols-4 gap-4">
                    <Card><CardContent className="p-4"><div className="text-2xl font-bold text-emerald-500">€2.4M</div><div className="text-sm text-muted-foreground">Valor Portfolio</div></CardContent></Card>
                    <Card><CardContent className="p-4"><div className="text-2xl font-bold">4</div><div className="text-sm text-muted-foreground">Empresas Activas</div></CardContent></Card>
                    <Card><CardContent className="p-4"><div className="text-2xl font-bold text-teal-500">28</div><div className="text-sm text-muted-foreground">Agentes Totales</div></CardContent></Card>
                    <Card><CardContent className="p-4"><div className="text-2xl font-bold text-cyan-500">+23%</div><div className="text-sm text-muted-foreground">ROI Promedio</div></CardContent></Card>
                  </div>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader><CardTitle className="text-base">Evolución del Portfolio</CardTitle></CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-64">
                          <AreaChart data={portfolioData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Area type="monotone" dataKey="valor" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                          </AreaChart>
                        </ChartContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader><CardTitle className="text-base">Distribución por Empresa</CardTitle></CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {empresasPortfolio.map((empresa, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                              <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: empresa.color }} />
                                <div>
                                  <div className="font-medium text-sm">{empresa.name}</div>
                                  <div className="text-xs text-muted-foreground">{empresa.agentes} agentes</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="text-right">
                                  <div className="text-sm font-medium">{empresa.participacion}%</div>
                                  <div className="text-xs text-muted-foreground">participación</div>
                                </div>
                                <div className={`flex items-center gap-1 ${empresa.tendencia === "up" ? "text-emerald-500" : "text-red-500"}`}>
                                  {empresa.tendencia === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                  <span className="text-sm font-medium">{empresa.roi}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Competition Tab */}
                <TabsContent value="competencia" className="space-y-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Radar className="w-5 h-5 text-emerald-500" />
                          Análisis Competitivo
                        </CardTitle>
                        <CardDescription>Comparativa con principales competidores</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ChartContainer config={chartConfig} className="h-64">
                          <RadarChart data={competenciaData}>
                            <PolarGrid />
                            <PolarAngleAxis dataKey="metric" className="text-xs" />
                            <PolarRadiusAxis angle={30} domain={[0, 100]} />
                            <RechartsRadar name="Nosotros" dataKey="nosotros" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                            <RechartsRadar name="Competencia" dataKey="competencia" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                          </RadarChart>
                        </ChartContainer>
                        <div className="flex justify-center gap-6 mt-4">
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-sm">Tu empresa</span></div>
                          <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /><span className="text-sm">Competencia</span></div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Eye className="w-5 h-5 text-purple-500" />
                          Alertas de Competencia
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {alertasCompetencia.map((alerta, i) => (
                            <div key={i} className={`p-3 rounded-xl border ${alerta.prioridad === "alta" ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}>
                              <div className="flex items-center justify-between mb-1">
                                <Badge variant="secondary" className="text-xs">{alerta.empresa}</Badge>
                                <span className="text-xs text-muted-foreground">{alerta.tiempo}</span>
                              </div>
                              <p className="text-sm">{alerta.mensaje}</p>
                              {alerta.tipo === "partnership" && (
                                <Button size="sm" variant="outline" className="mt-2 w-full">
                                  <Handshake className="w-3 h-3 mr-1" />Contactar
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Potential Partners */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Handshake className="w-5 h-5 text-teal-500" />
                        Oportunidades de Colaboración Detectadas
                      </CardTitle>
                      <CardDescription>Empresas con sinergias potenciales</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { name: "PayFlow Solutions", sinergia: "Integración de pagos", match: 92 },
                          { name: "RiskAnalytics Pro", sinergia: "Scoring de riesgo", match: 88 },
                          { name: "ComplianceBot", sinergia: "Cumplimiento normativo", match: 85 },
                        ].map((partner, i) => (
                          <div key={i} className="p-4 bg-muted/50 rounded-xl">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{partner.name}</span>
                              <Badge className="bg-emerald-500/10 text-emerald-600">{partner.match}% match</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{partner.sinergia}</p>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="flex-1">Ver perfil</Button>
                              <Button size="sm" className="flex-1 bg-emerald-500">Contactar</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Agents Tab */}
                <TabsContent value="agentes" className="space-y-6">
                  {/* Agent Status Cards */}
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[
                      { id: "AG-47", name: "Agente Cobros", empresa: "FinTech Cobros", clonacion: 94, status: "activo", tareas: 847 },
                      { id: "AG-12", name: "Agente Soporte", empresa: "CreditCards Pro", clonacion: 87, status: "activo", tareas: 523 },
                      { id: "AG-89", name: "Agente Inversiones", empresa: "InvestFund", clonacion: 91, status: "aprendiendo", tareas: 234 },
                      { id: "AG-33", name: "Agente Recuperación", empresa: "DebtRecovery", clonacion: 78, status: "activo", tareas: 156 },
                    ].map((agente, i) => (
                      <Card key={i} className="relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-bl-full" />
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                              <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="font-medium text-sm">{agente.id}</div>
                              <div className="text-xs text-muted-foreground">{agente.name}</div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">Clonación</span>
                              <span className="font-medium text-emerald-500">{agente.clonacion}%</span>
                            </div>
                            <Progress value={agente.clonacion} className="h-2" />
                            <div className="flex items-center justify-between text-xs pt-1">
                              <Badge variant="secondary" className={`text-xs ${agente.status === "activo" ? "bg-emerald-500/10 text-emerald-600" : "bg-yellow-500/10 text-yellow-600"}`}>
                                <div className={`w-1.5 h-1.5 rounded-full mr-1 ${agente.status === "activo" ? "bg-emerald-500" : "bg-yellow-500 animate-pulse"}`} />
                                {agente.status === "activo" ? "Activo" : "Aprendiendo"}
                              </Badge>
                              <span className="text-muted-foreground">{agente.tareas} tareas</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center gap-2">
                        <Bot className="w-5 h-5 text-emerald-500" />
                        Distribución de Agentes por Área
                      </CardTitle>
                      <CardDescription>Ajusta la asignación de tus agentes digitales</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {[
                          { area: "Gestión de Cobros", agentes: 10, color: "#10b981", empresa: "FinTech Cobros", clonacionAvg: 92 },
                          { area: "Atención al Cliente", agentes: 8, color: "#14b8a6", empresa: "CreditCards Pro", clonacionAvg: 87 },
                          { area: "Análisis de Inversiones", agentes: 5, color: "#06b6d4", empresa: "InvestFund", clonacionAvg: 91 },
                          { area: "Recuperación de Deuda", agentes: 3, color: "#f59e0b", empresa: "DebtRecovery", clonacionAvg: 78 },
                          { area: "Marketing Digital", agentes: 2, color: "#8b5cf6", empresa: "Todas", clonacionAvg: 85 },
                        ].map((area, i) => (
                          <div key={i} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Bot className="w-4 h-4" style={{ color: area.color }} />
                                <span className="font-medium">{area.area}</span>
                                <Badge variant="secondary" className="text-xs">{area.empresa}</Badge>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="text-xs text-muted-foreground">Clonación: {area.clonacionAvg}%</span>
                                <span className="text-sm text-muted-foreground">{area.agentes} agentes</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Progress value={(area.agentes / 28) * 100} className="h-2 flex-1" />
                              <Progress value={area.clonacionAvg} className="h-2 w-20 bg-muted" />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">Sugerencia IA</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Basado en el análisis de ROI, se recomienda aumentar los agentes en "Análisis de Inversiones"
                          en InvestFund. ROI potencial estimado: +15% adicional.
                        </p>
                        <Button size="sm" className="mt-3 bg-emerald-500">
                          Aplicar recomendación
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* News Tab */}
                <TabsContent value="noticias" className="space-y-6">
                  <div className="grid lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Newspaper className="w-5 h-5 text-yellow-500" />
                          Noticias Relevantes para tu Portfolio
                        </CardTitle>
                        <CardDescription>Filtradas por tu configuración</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { titulo: "Banco Central sube tipos 0.25%", fuente: "Bloomberg", impacto: "positivo", tiempo: "Hace 1h", empresas: ["FinTech Cobros", "DebtRecovery"] },
                            { titulo: "Nueva regulación Fintech en LATAM", fuente: "Reuters", impacto: "neutro", tiempo: "Hace 3h", empresas: ["CreditCards Pro"] },
                            { titulo: "AI en gestión financiera: tendencia al alza", fuente: "TechCrunch", impacto: "positivo", tiempo: "Hace 5h", empresas: ["Todas"] },
                            { titulo: "CompetidorX cierra ronda de €50M", fuente: "WSJ", impacto: "negativo", tiempo: "Hace 1d", empresas: ["FinTech Cobros"] },
                          ].map((noticia, i) => (
                            <div key={i} className="p-4 bg-muted/50 rounded-xl">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium">{noticia.titulo}</span>
                                <Badge variant={noticia.impacto === "positivo" ? "default" : noticia.impacto === "negativo" ? "destructive" : "secondary"} className="text-xs">
                                  {noticia.impacto}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm text-muted-foreground">
                                <span>{noticia.fuente} • {noticia.tiempo}</span>
                                <span>Afecta: {noticia.empresas.join(", ")}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Fuentes Configuradas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {NEWS_SOURCES.slice(0, 6).map((fuente) => (
                            <div key={fuente.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                              <div className="flex items-center gap-2">
                                <span className="text-sm">{fuente.name}</span>
                                {fuente.flag === "ES" && <Badge variant="outline" className="text-[10px] py-0 px-1 border-red-500/50 text-red-500">ES</Badge>}
                              </div>
                              <Check className="w-4 h-4 text-emerald-500" />
                            </div>
                          ))}
                        </div>
                        <Button variant="outline" className="w-full mt-4">
                          Configurar fuentes
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

// Pricing Section
function PricingSection({ setCurrentView }: { setCurrentView: (v: ViewType) => void }) {
  const [pricingMode, setPricingMode] = useState<"empresa" | "pyme">("pyme");

  const enterprisePlans = [
    { name: "Startup", employees: "10", price: "250", description: "Equipos pequeños", features: ["2 Agentes IA", "Analytics básico", "CRM Automation", "Soporte email"], popular: false },
    { name: "Business", employees: "25", price: "625", description: "Empresas en crecimiento", features: ["5 Agentes IA", "Analytics avanzado", "Call Center básico", "RAG básico"], popular: false },
    { name: "Professional", employees: "50", price: "1,250", description: "Operaciones complejas", features: ["12 Agentes IA", "Full Analytics", "RAG + ML", "Multi-empresa", "API completa"], popular: true },
    { name: "Enterprise", employees: "100", price: "2,500", description: "Grandes organizaciones", features: ["25 Agentes IA", "Suite completa", "Competencia", "SLA 99.9%", "Account Manager"], popular: false },
    { name: "Enterprise Plus", employees: "250+", price: "Custom", description: "Corporaciones globales", features: ["Agentes ilimitados", "Infraestructura dedicada", "Fine-tuning propio", "Consultoría estratégica"], popular: false },
  ];

  const pymePlans = [
    {
      name: "Free", price: "0", badge: "Siempre gratis", description: "Prueba sin compromiso", Icon: Rocket, color: "slate",
      features: ["1 Agente de chat web", "Hasta 100 conversaciones/mes", "Analytics básico (CSV)", "Calendario de citas", "Soporte comunidad"], cta: "Empezar gratis", popular: false
    },
    {
      name: "Chat Web", price: "25", badge: "Más vendido", description: "Chat inteligente en tu web", Icon: MessageCircle, color: "blue",
      features: ["Chat web con IA en tu sitio", "Conversaciones ilimitadas", "Respuestas automáticas 24/7", "Captura de leads integrada", "Integración WhatsApp Business", "Soporte por email"], cta: "Activar Chat", popular: true
    },
    {
      name: "Marketing", price: "79", badge: "Recomendado pymes", description: "Leads y presencia digital", Icon: Megaphone, color: "violet",
      features: ["Chat web IA incluido", "Analítica SEO + SEM (CSV)", "Gestión de leads y llamadas", "Informes mensuales de tráfico", "Seguimiento de conversiones", "Soporte prioritario"], cta: "Empezar", popular: false
    },
    {
      name: "Agencia", price: "149", badge: "Para agencias", description: "Gestiona múltiples clientes", Icon: Briefcase, color: "indigo",
      features: ["Hasta 5 cuentas de cliente", "Chat web IA por cliente", "Dashboard multi-cliente", "Informes de rendimiento", "Calendario de citas avanzado", "Soporte telefónico"], cta: "Contactar", popular: false
    },
    {
      name: "Pyme Pro", price: "249", badge: "Todo incluido", description: "Suite completa para pymes", Icon: Star, color: "amber",
      features: ["Agentes ilimitados", "Chat web + WhatsApp + Email IA", "CRM de clientes integrado", "Analytics avanzado CSV/API", "Publicidad en redes sociales", "Landings generadas por IA", "Soporte dedicado + onboarding"], cta: "Empezar", popular: false
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string; badgeCls: string; btn: string }> = {
    slate: { bg: "bg-slate-500/10", text: "text-slate-600 dark:text-slate-400", border: "border-slate-200 dark:border-slate-700", badgeCls: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300", btn: "bg-slate-700 hover:bg-slate-800 text-white" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-400 shadow-lg shadow-blue-500/20", badgeCls: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200", btn: "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white" },
    violet: { bg: "bg-violet-500/10", text: "text-violet-600", border: "border-violet-200 dark:border-violet-800", badgeCls: "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200", btn: "bg-violet-600 hover:bg-violet-700 text-white" },
    indigo: { bg: "bg-indigo-500/10", text: "text-indigo-600", border: "border-indigo-200 dark:border-indigo-800", badgeCls: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200", btn: "bg-indigo-600 hover:bg-indigo-700 text-white" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-300 dark:border-amber-700", badgeCls: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200", btn: "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white" },
  };

  return (
    <section id="precios" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Precios Transparentes</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Planes Adaptados a tu Tamaño</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Desde gratis hasta soluciones enterprise. Sin sorpresas, sin permanencia.</p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 bg-muted rounded-xl inline-flex shadow-sm items-center border border-border">
            <button onClick={() => setPricingMode("pyme")} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${pricingMode === "pyme" ? "bg-background shadow-sm text-blue-600" : "text-muted-foreground hover:text-foreground"}`}>
              🏪 PYMEs y Agencias
            </button>
            <button onClick={() => setPricingMode("empresa")} className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${pricingMode === "empresa" ? "bg-background shadow-sm text-emerald-600" : "text-muted-foreground hover:text-foreground"}`}>
              🏢 Gran Empresa (IA)
            </button>
          </div>
        </div>

        {/* PYME Plans */}
        {pricingMode === "pyme" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {pymePlans.map((plan, index) => {
              const c = colorMap[plan.color];
              return (
                <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.07 }} className="relative">
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                      <Badge className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"><Star className="w-3 h-3 mr-1" />Más Popular</Badge>
                    </div>
                  )}
                  <Card className={`h-full border-2 transition-all hover:scale-[1.02] ${plan.popular ? c.border : "border-border"}`}>
                    <CardHeader className="pb-3 text-center">
                      <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center mx-auto mb-3`}>
                        <plan.Icon className={`w-6 h-6 ${c.text}`} />
                      </div>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.badgeCls} inline-block mb-2`}>{plan.badge}</span>
                      <CardTitle className="text-lg">{plan.name}</CardTitle>
                      <CardDescription className="text-xs">{plan.description}</CardDescription>
                      <div className="mt-3">
                        {plan.price === "0" ? (
                          <span className="text-4xl font-bold">Gratis</span>
                        ) : (
                          <><span className="text-4xl font-bold">€{plan.price}</span><span className="text-muted-foreground text-sm">/mes</span></>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-sm">
                            <Check className={`w-4 h-4 shrink-0 mt-0.5 ${c.text}`} />
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                      <button onClick={() => setCurrentView("configuracion")} className={`w-full py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${c.btn}`}>
                        {plan.cta} <ArrowRight className="w-4 h-4 inline ml-1" />
                      </button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Enterprise Plans */}
        {pricingMode === "empresa" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {enterprisePlans.map((plan, index) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="relative">
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"><Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white"><Star className="w-3 h-3 mr-1" />Más Popular</Badge></div>}
                <Card className={`h-full ${plan.popular ? "border-emerald-500 shadow-lg shadow-emerald-500/10" : ""}`}>
                  <CardHeader className="text-center pb-2">
                    <div className="text-sm text-muted-foreground mb-1">{plan.employees} empleados</div>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="mt-4">
                      {plan.price === "Custom" ? <div className="text-3xl font-bold">Custom</div> : <><span className="text-4xl font-bold">€{plan.price}</span><span className="text-muted-foreground">/mes</span></>}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-2">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>{feature}</span></li>
                      ))}
                    </ul>
                    <Button className={`w-full ${plan.popular ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700" : ""}`} variant={plan.popular ? "default" : "outline"} onClick={() => setCurrentView("configuracion")}>
                      {plan.price === "Custom" ? "Contactar" : "Empezar"}<ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-10">
          Sin permanencia · Cancela cuando quieras · Soporte en español · IVA no incluido
        </p>
      </div>
    </section>
  );
}

// Support Chat Component
function SupportChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [messages, setMessages] = useState([{ role: "assistant", content: "¡Hola! 👋 Soy el asistente de FinAI Pro. ¿En qué puedo ayudarte hoy?" }]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const currentMessages = [...messages, { role: "user", content: inputValue }];
    setMessages(currentMessages);
    setInputValue("");

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: currentMessages.map(m => ({ role: m.role, content: m.content })),
        system_prompt: "Eres el asistente de soporte experto de FinAI Pro. Responde preguntas breves (1-3 frases) sobre IA, datos, software para empresas financieras y agencias locales. Eres muy amable y profesional."
      })
    })
      .then(res => res.json())
      .then(data => {
        setMessages(prev => [...prev, { role: "assistant", content: data.reply || "Lo siento, hubo un error de conexión." }]);
      })
      .catch(() => {
        setMessages(prev => [...prev, { role: "assistant", content: "Lo siento, ha ocurrido un error al contactarme." }]);
      });
  };

  return (
    <>
      <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-48px)] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"><Bot className="w-5 h-5" /></div>
                <div><h4 className="font-semibold">Asistente FinAI</h4><div className="flex items-center gap-1 text-sm opacity-90"><div className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />En línea</div></div>
              </div>
            </div>
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === "user" ? "bg-emerald-500 text-white rounded-br-sm" : "bg-muted rounded-bl-sm"}`}><p className="text-sm">{msg.content}</p></div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="border-t p-3 space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2" onClick={() => setShowMeetingDialog(true)}><Calendar className="w-4 h-4" />Agendar una reunión</Button>
              <div className="flex gap-2">
                <Input placeholder="Escribe tu mensaje..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSend()} className="flex-1" />
                <Button onClick={handleSend} size="icon" className="bg-emerald-500 hover:bg-emerald-600"><Send className="w-4 h-4" /></Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showMeetingDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setShowMeetingDialog(false)} />
          <div className="relative bg-card rounded-xl shadow-2xl p-6 w-full max-w-md mx-4 z-10">
            <button onClick={() => setShowMeetingDialog(false)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
            <h3 className="text-lg font-semibold mb-4">Agendar una Reunión</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-24 flex-col gap-2 hover:border-emerald-500"><Video className="w-6 h-6 text-emerald-500" /><span>Google Meet</span></Button>
                <Button variant="outline" className="h-24 flex-col gap-2 hover:border-blue-500"><Video className="w-6 h-6 text-blue-500" /><span>Microsoft Teams</span></Button>
              </div>
              <Input placeholder="Tu email" type="email" />
              <Input placeholder="Fecha preferida" type="date" />
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600">Solicitar Reunión</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Configuration Wizard Page
function ConfigWizardPage({ setCurrentView, formData: externalFormData, setFormData: setExternalFormData }: { setCurrentView: (v: ViewType) => void; formData: FormData; setFormData: (data: FormData) => void }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(externalFormData || initialFormData);
  const [recommendedPlan, setRecommendedPlan] = useState<string>("");

  const updateFormData = (updates: Partial<FormData>) => {
    const newData = { ...formData, ...updates };
    setFormData(newData);
    setExternalFormData(newData);
  };

  const nextStep = () => {
    if (currentStep < 8) {
      setCurrentStep(currentStep + 1);
      if (currentStep === 7) calculateRecommendedPlan();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const calculateRecommendedPlan = () => {
    const empleados = parseInt(formData.empleados) || 0;
    if (empleados <= 10) setRecommendedPlan("Startup");
    else if (empleados <= 25) setRecommendedPlan("Business");
    else if (empleados <= 50) setRecommendedPlan("Professional");
    else if (empleados <= 100) setRecommendedPlan("Enterprise");
    else setRecommendedPlan("Enterprise Plus");
  };

  const handleComplete = () => {
    setExternalFormData(formData);
    setCurrentView("panel");
  };

  const funciones = [
    { id: "analytics", label: "Data Analytics", icon: BarChart3 },
    { id: "etl", label: "ETL & Data Pipeline", icon: Database },
    { id: "agentes", label: "Agentes de IA", icon: Brain },
    { id: "ml", label: "Machine Learning", icon: Cpu },
    { id: "rag", label: "RAG Systems", icon: Target },
    { id: "crm", label: "CRM Automation", icon: Users },
    { id: "callcenter", label: "Call Center AI", icon: Phone },
    { id: "workers", label: "Trabajadores Digitales", icon: Bot },
    { id: "portfolio", label: "Portfolio Inteligente", icon: Wallet },
  ];

  const sectores = ["Gestión de Cobros", "Tarjetas de Crédito", "Activos y Pasivos", "Fondos de Inversión", "Banca Minorista", "Banca Corporativa", "Fintech", "Seguros", "Inversiones", "Otros"];

  const progress = (currentStep / 8) * 100;

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-gradient-to-br from-emerald-500/5 via-background to-teal-500/5">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Configuración Personalizada</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Configuremos tu Solución Ideal</h1>
          <p className="text-muted-foreground">Responde estas preguntas para ofrecerte el producto perfecto</p>
        </motion.div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Paso {currentStep} de 8</span>
            <span className="text-sm font-medium text-emerald-500">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex justify-between mb-8 overflow-x-auto pb-2">
          {WIZARD_STEPS.map((step) => (
            <button key={step.id} onClick={() => step.id < currentStep && setCurrentStep(step.id)} disabled={step.id > currentStep} className={`flex flex-col items-center min-w-[70px] ${step.id === currentStep ? "text-emerald-500" : step.id < currentStep ? "text-emerald-600 cursor-pointer" : "text-muted-foreground opacity-50"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${step.id <= currentStep ? "bg-emerald-500 text-white" : "bg-muted"}`}>
                {step.id < currentStep ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className="text-xs hidden sm:block">{step.title}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <Card className="shadow-xl">
              <CardContent className="p-6 sm:p-8">
                {/* Step 1: Contacto */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"><User className="w-6 h-6 text-emerald-500" /></div>
                      <div><h2 className="text-xl font-semibold">Datos de Contacto</h2><p className="text-sm text-muted-foreground">Para poder contactarte</p></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Nombre completo *</Label><Input placeholder="Juan García López" value={formData.nombre} onChange={(e) => updateFormData({ nombre: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Empresa *</Label><Input placeholder="Tu Empresa S.L." value={formData.empresa} onChange={(e) => updateFormData({ empresa: e.target.value })} /></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Email profesional *</Label><Input type="email" placeholder="juan@empresa.com" value={formData.email} onChange={(e) => updateFormData({ email: e.target.value })} /></div>
                      <div className="space-y-2"><Label>Teléfono *</Label><Input type="tel" placeholder="+34 612 345 678" value={formData.telefono} onChange={(e) => updateFormData({ telefono: e.target.value })} /></div>
                    </div>
                  </div>
                )}

                {/* Step 2: Empresa */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Building2 className="w-6 h-6 text-emerald-500" /></div>
                      <div><h2 className="text-xl font-semibold">Información de tu Empresa</h2><p className="text-sm text-muted-foreground">Adapta la solución a vuestras necesidades</p></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Número de empleados *</Label>
                        <Select value={formData.empleados} onValueChange={(v) => updateFormData({ empleados: v })}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">1 - 10 empleados</SelectItem>
                            <SelectItem value="25">11 - 25 empleados</SelectItem>
                            <SelectItem value="50">26 - 50 empleados</SelectItem>
                            <SelectItem value="100">51 - 100 empleados</SelectItem>
                            <SelectItem value="250">101 - 250 empleados</SelectItem>
                            <SelectItem value="500">Más de 250 empleados</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label>Sector financiero *</Label>
                        <Select value={formData.sector} onValueChange={(v) => updateFormData({ sector: v })}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>{sectores.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox checked={formData.esInversor} onCheckedChange={(checked) => updateFormData({ esInversor: checked as boolean })} />
                        <div>
                          <span className="font-medium">Soy inversor o directivo con portfolio multi-empresa</span>
                          <p className="text-sm text-muted-foreground">Activa funciones de gestión de portfolio y seguimiento de competencia</p>
                        </div>
                      </label>
                    </div>

                    {formData.esInversor && (
                      <div className="space-y-2">
                        <Label>¿En cuántas empresas tienes participación?</Label>
                        <Select value={formData.portfolioEmpresas} onValueChange={(v) => updateFormData({ portfolioEmpresas: v })}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 empresa</SelectItem>
                            <SelectItem value="2-3">2-3 empresas</SelectItem>
                            <SelectItem value="4-5">4-5 empresas</SelectItem>
                            <SelectItem value="6-10">6-10 empresas</SelectItem>
                            <SelectItem value="10+">Más de 10 empresas</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2"><Label>Presupuesto por agente/mes</Label>
                      <Select value={formData.presupuestoAgente} onValueChange={(v) => updateFormData({ presupuestoAgente: v })}>
                        <SelectTrigger><SelectValue placeholder="Selecciona un rango" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="25-50">€25 - €50</SelectItem>
                          <SelectItem value="50-100">€50 - €100</SelectItem>
                          <SelectItem value="100-200">€100 - €200</SelectItem>
                          <SelectItem value="200+">Más de €200</SelectItem>
                          <SelectItem value="no-definido">Aún no lo sé</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                {/* Step 3: Funciones */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Settings className="w-6 h-6 text-emerald-500" /></div>
                      <div><h2 className="text-xl font-semibold">Funciones de Interés</h2><p className="text-sm text-muted-foreground">Selecciona las que más te interesan</p></div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {funciones.map((func) => (
                        <label key={func.id} className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.funciones.includes(func.id) ? "border-emerald-500 bg-emerald-500/5" : "hover:border-emerald-500/50"}`}>
                          <Checkbox checked={formData.funciones.includes(func.id)} onCheckedChange={(checked) => { if (checked) { updateFormData({ funciones: [...formData.funciones, func.id] }); } else { updateFormData({ funciones: formData.funciones.filter(f => f !== func.id) }); } }} />
                          <func.icon className="w-5 h-5 text-emerald-500" />
                          <span className="font-medium">{func.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Agentes */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Bot className="w-6 h-6 text-emerald-500" /></div>
                      <div><h2 className="text-xl font-semibold">Configuración de Agentes</h2><p className="text-sm text-muted-foreground">Selecciona los roles de agentes que necesitas</p></div>
                    </div>

                    <div className="space-y-2">
                      <Label>Número de agentes digitales</Label>
                      <Select value={formData.numAgentes} onValueChange={(v) => updateFormData({ numAgentes: v })}>
                        <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2">1 - 2 agentes</SelectItem>
                          <SelectItem value="3-5">3 - 5 agentes</SelectItem>
                          <SelectItem value="6-10">6 - 10 agentes</SelectItem>
                          <SelectItem value="11-25">11 - 25 agentes</SelectItem>
                          <SelectItem value="25+">Más de 25 agentes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Roles de Agentes</Label>
                      <p className="text-xs text-muted-foreground">Selecciona los roles que necesitas para tu empresa</p>
                      <div className="grid sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto p-1">
                        {AGENT_ROLES.map((role) => {
                          const RoleIcon = role.icon;
                          return (
                            <label
                              key={role.id}
                              className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${formData.funciones?.includes(role.id)
                                ? "border-emerald-500 bg-emerald-500/5"
                                : "hover:border-emerald-500/50"
                                }`}
                            >
                              <Checkbox
                                checked={formData.funciones?.includes(role.id) || false}
                                onCheckedChange={(checked) => {
                                  const currentFunciones = formData.funciones || [];
                                  if (checked) {
                                    updateFormData({ funciones: [...currentFunciones, role.id] });
                                  } else {
                                    updateFormData({ funciones: currentFunciones.filter((f: string) => f !== role.id) });
                                  }
                                }}
                                className="mt-1"
                              />
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                                  <RoleIcon className="w-5 h-5 text-emerald-500" />
                                </div>
                                <div>
                                  <div className="font-medium">{role.name}</div>
                                  <div className="text-sm text-muted-foreground">{role.description}</div>
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {formData.esInversor && (
                      <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Landmark className="w-4 h-4 text-purple-500" />
                          Distribución por empresa (si tienes portfolio)
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">Podrás configurar esto más adelante desde el dashboard para redistribuir agentes entre tus empresas.</p>
                        <div className="flex items-center gap-2 text-sm text-purple-600">
                          <Sparkles className="w-4 h-4" />
                          <span>El sistema optimizará automáticamente la asignación según ROI</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 5: Modelos IA - NEW */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center"><Brain className="w-6 h-6 text-purple-500" /></div>
                      <div><h2 className="text-xl font-semibold">Modelos de IA</h2><p className="text-sm text-muted-foreground">Selecciona los modelos para tus agentes</p></div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <Label>Modelo principal</Label>
                      <Select value={formData.modeloPrincipal} onValueChange={(v) => updateFormData({ modeloPrincipal: v })}>
                        <SelectTrigger><SelectValue placeholder="Selecciona el modelo principal" /></SelectTrigger>
                        <SelectContent>
                          {AI_MODELS.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name} - {model.provider}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Modelos adicionales (opcional)</Label>
                      <p className="text-xs text-muted-foreground">Puedes usar múltiples modelos para diferentes tareas</p>
                      <div className="grid sm:grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                        {AI_MODELS.map((model) => (
                          <label key={model.id} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all text-sm ${formData.modelos.includes(model.id) ? "border-purple-500 bg-purple-500/5" : "hover:border-purple-500/50"}`}>
                            <Checkbox checked={formData.modelos.includes(model.id)} onCheckedChange={(checked) => { if (checked) { updateFormData({ modelos: [...formData.modelos, model.id] }); } else { updateFormData({ modelos: formData.modelos.filter(m => m !== model.id) }); } }} />
                            <div className="flex-1">
                              <div className="font-medium">{model.name}</div>
                              <div className="text-xs text-muted-foreground">{model.speed} • {model.cost}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 bg-muted/50 rounded-xl">
                      <h4 className="font-medium mb-2">Comparativa rápida</h4>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-emerald-500 font-medium">Premium:</span> Opus, GPT-5.2, Gemini Pro</div>
                        <div><span className="text-teal-500 font-medium">Standard:</span> Sonnet, Flash, Kimi</div>
                        <div><span className="text-cyan-500 font-medium">Economy:</span> Haiku, Flash Lite</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: MCP Integrations - NEW */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center"><Puzzle className="w-6 h-6 text-teal-500" /></div>
                      <div><h2 className="text-xl font-semibold">Integraciones MCP</h2><p className="text-sm text-muted-foreground">Conecta con tus herramientas favoritas</p></div>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {MCP_INTEGRATIONS.map((int) => (
                        <label key={int.id} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${formData.integracionesMCP.includes(int.id) ? "border-teal-500 bg-teal-500/5" : "hover:border-teal-500/50"}`}>
                          <Checkbox checked={formData.integracionesMCP.includes(int.id)} onCheckedChange={(checked) => { if (checked) { updateFormData({ integracionesMCP: [...formData.integracionesMCP, int.id] }); } else { updateFormData({ integracionesMCP: formData.integracionesMCP.filter(i => i !== int.id) }); } }} />
                          <int.icon className="w-5 h-5 text-teal-500" />
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{int.name}</div>
                            <div className="text-xs text-muted-foreground truncate">{int.category}</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <div className="p-4 bg-teal-500/10 border border-teal-500/20 rounded-xl">
                      <div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-teal-500" /><span className="font-medium">MCP (Model Context Protocol)</span></div>
                      <p className="text-sm text-muted-foreground">
                        Nuestros agentes pueden conectarse directamente a estas herramientas para ejecutar acciones,
                        leer datos y automatizar flujos de trabajo completos.
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 7: Objetivos */}
                {currentStep === 7 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"><Target className="w-6 h-6 text-emerald-500" /></div>
                      <div><h2 className="text-xl font-semibold">Objetivos y Noticias</h2><p className="text-sm text-muted-foreground">Configura pronósticos y fuentes de datos</p></div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>Objetivo de ROI esperado</Label>
                        <Select value={formData.objetivoROI} onValueChange={(v) => updateFormData({ objetivoROI: v })}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="10">Al menos 10%</SelectItem>
                            <SelectItem value="25">Al menos 25%</SelectItem>
                            <SelectItem value="50">Al menos 50%</SelectItem>
                            <SelectItem value="100">Al menos 100%</SelectItem>
                            <SelectItem value="no-definido">Aún no lo sé</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2"><Label>Plazo para alcanzar el objetivo</Label>
                        <Select value={formData.plazoObjetivo} onValueChange={(v) => updateFormData({ plazoObjetivo: v })}>
                          <SelectTrigger><SelectValue placeholder="Selecciona" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 mes</SelectItem>
                            <SelectItem value="3">3 meses</SelectItem>
                            <SelectItem value="6">6 meses</SelectItem>
                            <SelectItem value="12">12 meses</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Fuentes de noticias preferidas</Label>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {NEWS_SOURCES.map((fuente) => (
                          <label key={fuente.id} className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-all ${formData.noticiasPreferidas.includes(fuente.id) ? "border-yellow-500 bg-yellow-500/5" : "hover:border-yellow-500/50"}`}>
                            <Checkbox checked={formData.noticiasPreferidas.includes(fuente.id)} onCheckedChange={(checked) => { if (checked) { updateFormData({ noticiasPreferidas: [...formData.noticiasPreferidas, fuente.id] }); } else { updateFormData({ noticiasPreferidas: formData.noticiasPreferidas.filter(n => n !== fuente.id) }); } }} />
                            <Newspaper className="w-4 h-4 text-yellow-500" />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{fuente.name}</span>
                                {fuente.flag === "ES" && <Badge variant="outline" className="text-[10px] py-0 px-1 border-red-500/50 text-red-500">ES</Badge>}
                                {fuente.flag === "INT" && <Badge variant="outline" className="text-[10px] py-0 px-1 border-blue-500/50 text-blue-500">INT</Badge>}
                              </div>
                              <span className="text-xs text-muted-foreground">{fuente.category}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {formData.esInversor && (
                      <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <Checkbox checked={formData.seguimientoCompetencia} onCheckedChange={(checked) => updateFormData({ seguimientoCompetencia: checked as boolean })} />
                          <div>
                            <span className="font-medium">Activar seguimiento de competencia</span>
                            <p className="text-sm text-muted-foreground">El sistema identificará competidores y propondrá oportunidades de colaboración</p>
                          </div>
                        </label>
                      </div>
                    )}

                    <div className="space-y-2"><Label>Comentarios adicionales</Label>
                      <Textarea placeholder="Cuéntanos más sobre tus necesidades..." value={formData.comentarios} onChange={(e) => updateFormData({ comentarios: e.target.value })} rows={3} /></div>
                  </div>
                )}

                {/* Step 8: Contrato */}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center"><FileSignature className="w-6 h-6 text-emerald-500" /></div>
                      <div><h2 className="text-xl font-semibold">Tu Plan Recomendado</h2><p className="text-sm text-muted-foreground">Basado en tus respuestas</p></div>
                    </div>

                    <Card className="border-2 border-emerald-500 bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <Badge className="bg-emerald-500 text-white mb-2">Plan Recomendado</Badge>
                            <h3 className="text-2xl font-bold">{recommendedPlan}</h3>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold text-emerald-500">
                              {PRODUCT_CONTRACTS[recommendedPlan as keyof typeof PRODUCT_CONTRACTS]?.precio || "Custom"}
                            </div>
                          </div>
                        </div>
                        <Separator className="my-4" />
                        <div className="grid sm:grid-cols-3 gap-2 text-sm">
                          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span>{formData.empleados} empleados</span></div>
                          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span>{formData.funciones.length} funciones</span></div>
                          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span>{formData.numAgentes} agentes</span></div>
                          {formData.modeloPrincipal && <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span>{AI_MODELS.find(m => m.id === formData.modeloPrincipal)?.name}</span></div>}
                          <div className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-500" /><span>{formData.integracionesMCP.length} integraciones</span></div>
                          {formData.esInversor && <div className="flex items-center gap-2"><Check className="w-4 h-4 text-purple-500" /><span>Portfolio multi-empresa</span></div>}
                        </div>
                      </CardContent>
                    </Card>

                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Zap className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-600">Periodo de Prueba Sin Compromiso</h4>
                          <p className="text-sm text-muted-foreground">Sin tarjeta de crédito. Cancela en cualquier momento sin coste.</p>
                        </div>
                      </div>
                    </div>

                    {/* Contract with Scroll Bar */}
                    <Card className="border-2 border-emerald-500/30">
                      <CardHeader className="bg-emerald-500/5 pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-500" />
                          Contrato del Plan {recommendedPlan}
                        </CardTitle>
                        <CardDescription>Términos y Condiciones • Política de Privacidad</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="h-[350px] overflow-y-auto p-4 space-y-4 text-sm">
                          {/* Características */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wider">Características Incluidas</h4>
                            <div className="flex flex-wrap gap-2">
                              {PRODUCT_CONTRACTS[recommendedPlan as keyof typeof PRODUCT_CONTRACTS]?.caracteristicas.map((c, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">{c}</Badge>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Condiciones */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wider">Términos del Plan</h4>
                            <div className="space-y-1">
                              {PRODUCT_CONTRACTS[recommendedPlan as keyof typeof PRODUCT_CONTRACTS]?.condiciones.map((c, i) => (
                                <div key={i} className="flex items-start gap-2 py-1">
                                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 text-[10px] text-emerald-500 font-medium">{i + 1}</div>
                                  <span className="text-muted-foreground text-xs">{c}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Cláusulas */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-3 text-xs uppercase tracking-wider">Cláusulas Contractuales</h4>
                            <div className="space-y-3 text-xs text-muted-foreground">
                              <div>
                                <h5 className="font-medium text-foreground">1. Objeto del Contrato</h5>
                                <p className="mt-1">El presente contrato tiene por objeto la prestación de servicios de inteligencia artificial, automatización de procesos y análisis de datos por parte de FinAI Pro, S.L. según las características del plan {recommendedPlan}.</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">2. Duración y Renovación</h5>
                                <p className="mt-1">El contrato tendrá la duración mínima establecida. Se renovará automáticamente por periodos mensuales salvo denuncia con la antelación establecida.</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">3. Obligaciones del Cliente</h5>
                                <p className="mt-1">El cliente se compromete a: (a) Proporcionar datos veraces; (b) No utilizar los servicios para fines ilícitos; (c) Respetar los límites del plan; (d) Mantener confidencialidad de credenciales.</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">4. Propiedad Intelectual</h5>
                                <p className="mt-1">Los modelos de IA entrenados específicamente para el cliente son propiedad del cliente. FinAI Pro retiene la propiedad de la plataforma base y algoritmos genéricos.</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">5. Confidencialidad</h5>
                                <p className="mt-1">Ambas partes se comprometen a mantener confidencial toda información clasificada como tal o que por su naturaleza deba ser tratada confidencialmente.</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">6. Protección de Datos (RGPD/LOPD)</h5>
                                <p className="mt-1">Cumplimiento íntegro con RGPD y LOPD. Datos propiedad del cliente. Derechos de acceso, rectificación, supresión, limitación, portabilidad y oposición. Contacto DPO: dpo@finaipro.com</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">7. Limitación de Responsabilidad</h5>
                                <p className="mt-1">FinAI Pro no será responsable de: (a) Daños indirectos; (b) Pérdida de datos por causas ajenas; (c) Uso indebido por el cliente; (d) Incidencias de terceros proveedores.</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">8. Resolución</h5>
                                <p className="mt-1">El contrato podrá resolverse por: (a) Mutuo acuerdo; (b) Incumplimiento grave; (c) Quiebra o concurso; (d) Fuerza mayor superior a 30 días.</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-foreground">9. Legislación Aplicable</h5>
                                <p className="mt-1">El contrato se rige por la legislación española. Para controversias, las partes se someten a los Juzgados de Madrid.</p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Privacy Summary */}
                          <div>
                            <h4 className="font-semibold text-foreground mb-2 text-xs uppercase tracking-wider">Resumen Privacidad</h4>
                            <div className="p-3 bg-muted/50 rounded-lg space-y-2 text-xs">
                              <p><strong>Responsable:</strong> FinAI Pro, S.L. (B-12345678)</p>
                              <p><strong>Finalidades:</strong> Prestación de servicios, mejora de servicios, cumplimiento legal</p>
                              <p><strong>Derechos:</strong> Acceso, rectificación, supresión, portabilidad, oposición</p>
                              <p><strong>Conservación:</strong> Durante la relación comercial + plazos legales</p>
                              <p><strong>Contacto DPO:</strong> dpo@finaipro.com</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex items-start gap-3 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                      <Checkbox id="acceptTerms" />
                      <label htmlFor="acceptTerms" className="text-sm cursor-pointer">
                        He leído y acepto los <button onClick={() => setCurrentView("legal")} className="text-emerald-500 underline">Términos y Condiciones</button> y la <button onClick={() => setCurrentView("legal")} className="text-emerald-500 underline">Política de Privacidad</button>.
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between p-6 border-t">
                <Button variant="outline" onClick={currentStep === 1 ? () => setCurrentView("landing") : prevStep} className="gap-2">
                  <ArrowLeft className="w-4 h-4" />{currentStep === 1 ? "Volver" : "Anterior"}
                </Button>
                {currentStep < 8 ? (
                  <Button onClick={nextStep} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 gap-2">
                    Siguiente<ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button onClick={handleComplete} className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 gap-2">
                    <CheckCircle2 className="w-4 h-4" />Acceder al Panel
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">¿Dudas? Usa el chat de soporte o llámanos al <span className="font-medium">+34 900 123 456</span></p>
        </motion.div>
      </div>
    </div>
  );
}

// Team Page
function TeamPage({ setCurrentView }: { setCurrentView: (v: ViewType) => void }) {
  const team = [
    { name: "Elena Martínez", role: "CEO", bio: "20+ años transformación digital financiera.", email: "elena@finaipro.com", phone: "+34 612 345 678", type: "human", avatar: "EM" },
    { name: "Carlos Ruiz", role: "CMO", bio: "15 años marketing B2B financiero.", email: "carlos@finaipro.com", phone: "+34 623 456 789", type: "human", avatar: "CR" },
    { name: "Ana Gutiérrez", role: "CFO", bio: "18 años finanzas corporativas.", email: "ana@finaipro.com", phone: "+34 634 567 890", type: "human", avatar: "AG" },
    { name: "Miguel Torres", role: "CTO", bio: "PhD ML por MIT. Ex-Google AI.", email: "miguel@finaipro.com", phone: "+34 645 678 901", type: "human", avatar: "MT" },
    { name: "Aria-7", role: "Digital Agent Lead", bio: "500+ conversaciones/día, 98% satisfacción.", email: "aria@finaipro.com", phone: "Auto", type: "bot", avatar: "A7" },
    { name: "Nexus-3", role: "Sales Bot", bio: "Cualificación leads 94% precisión.", email: "nexus@finaipro.com", phone: "Auto", type: "bot", avatar: "N3" },
  ];

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Equipo Híbrido</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Humanos + Agentes Digitales</h1>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card className={`h-full hover:shadow-lg transition-all ${member.type === "bot" ? "border-purple-500/50" : "hover:border-emerald-500/50"}`}>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold ${member.type === "bot" ? "bg-gradient-to-br from-purple-500 to-violet-600" : "bg-gradient-to-br from-emerald-500 to-teal-600"}`}>{member.avatar}</div>
                    <div><h3 className="font-semibold">{member.name}</h3><span className="text-sm text-muted-foreground">{member.role}</span></div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1"><Mail className="w-3 h-3 mr-1" />Email</Button>
                    {member.type === "human" ? <Button variant="outline" size="sm" className="flex-1"><Phone className="w-3 h-3 mr-1" />Llamar</Button> : <Button variant="outline" size="sm" className="flex-1 border-purple-500/50"><Bot className="w-3 h-3 mr-1" />Chatear</Button>}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center"><Button variant="outline" onClick={() => setCurrentView("landing")} className="gap-2"><ArrowLeft className="w-4 h-4" />Volver a Inicio</Button></div>
      </div>
    </div>
  );
}

// Product Contracts Data
const PRODUCT_CONTRACTS = {
  "Startup": {
    precio: "€250/mes",
    empleados: "1-10",
    agentes: "2 agentes digitales",
    caracteristicas: ["Data Analytics básico", "CRM Automation", "Soporte por email", "Dashboard básico"],
    condiciones: [
      "Periodo de prueba: 14 días gratuitos",
      "Facturación mensual anticipada",
      "Compromiso mínimo: 1 mes",
      "Cancelación con 7 días de antelación",
      "SLA: 95% disponibilidad",
      "Soporte: Email (48h respuesta)",
      "Almacenamiento: 5GB",
      "Usuarios: hasta 10",
    ],
  },
  "Business": {
    precio: "€625/mes",
    empleados: "11-25",
    agentes: "5 agentes digitales",
    caracteristicas: ["Data Analytics avanzado", "CRM + Call Center básico", "Modelos ML estándar", "Soporte prioritario"],
    condiciones: [
      "Periodo de prueba: 14 días gratuitos",
      "Facturación mensual o anual (10% descuento)",
      "Compromiso mínimo: 1 mes",
      "Cancelación con 7 días de antelación",
      "SLA: 97% disponibilidad",
      "Soporte: Email + Chat (24h respuesta)",
      "Almacenamiento: 25GB",
      "Usuarios: hasta 25",
      "Integraciones: 5 máximo",
    ],
  },
  "Professional": {
    precio: "€1,250/mes",
    empleados: "26-50",
    agentes: "12 agentes digitales",
    caracteristicas: ["Full Analytics suite", "CRM + Call Center completo", "RAG + ML personalizado", "API access", "Soporte 24/7"],
    condiciones: [
      "Periodo de prueba: 14 días gratuitos",
      "Facturación mensual o anual (15% descuento)",
      "Compromiso mínimo: 1 mes",
      "Cancelación con 7 días de antelación",
      "SLA: 99% disponibilidad",
      "Soporte: Email + Chat + Teléfono (4h respuesta)",
      "Almacenamiento: 100GB",
      "Usuarios: hasta 50",
      "Integraciones: ilimitadas",
      "Agentes de IA: hasta 12",
      "Modelos IA: todos disponibles",
    ],
  },
  "Enterprise": {
    precio: "€2,500/mes",
    empleados: "51-100",
    agentes: "25 agentes digitales",
    caracteristicas: ["Suite completa de servicios", "ML + RAG enterprise", "Integraciones custom", "Dedicado Account Manager", "SLA 99.9%"],
    condiciones: [
      "Periodo de prueba: 30 días gratuitos",
      "Facturación mensual o anual (20% descuento)",
      "Compromiso mínimo: 12 meses",
      "Cancelación con 30 días de antelación",
      "SLA: 99.9% disponibilidad",
      "Soporte: Dedicado 24/7 + Account Manager",
      "Almacenamiento: 500GB",
      "Usuarios: hasta 100",
      "Integraciones: ilimitadas + custom",
      "Agentes de IA: hasta 25",
      "Modelos IA: todos + fine-tuning",
      "On-premise disponible (coste adicional)",
      "Consultoría estratégica: 4h/mes incluidas",
    ],
  },
  "Enterprise Plus": {
    precio: "Precio personalizado",
    empleados: "250+",
    agentes: "Ilimitados",
    caracteristicas: ["Infraestructura dedicada", "ML/RAG custom completo", "Integración on-premise", "Consultoría estratégica", "Equipo dedicado"],
    condiciones: [
      "Periodo de prueba: 30-60 días (negociable)",
      "Facturación personalizada",
      "Compromiso: contrato a medida",
      "SLA: personalizado (hasta 99.99%)",
      "Soporte: Equipo dedicado + CSM",
      "Almacenamiento: ilimitado",
      "Usuarios: ilimitados",
      "Integraciones: todas + desarrollo custom",
      "Agentes de IA: ilimitados",
      "Modelos IA: todos + entrenamiento propio",
      "On-premise/híbrido incluido",
      "Consultoría estratégica: ilimitada",
      "Training & certificación: incluido",
      "Auditorías de seguridad: trimestrales",
    ],
  },
};

// Legal Page
function LegalPage({ setCurrentView }: { setCurrentView: (v: ViewType) => void }) {
  const [selectedProduct, setSelectedProduct] = useState<string>("Startup");

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Badge className="mb-4 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">Aviso Legal</Badge>
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Aviso Legal, Términos y Condiciones</h1>
          <p className="text-muted-foreground">Última actualización: Enero 2024</p>
        </motion.div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="identificacion" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="identificacion">Identificación</TabsTrigger>
            <TabsTrigger value="productos">Productos</TabsTrigger>
            <TabsTrigger value="privacidad">Privacidad</TabsTrigger>
            <TabsTrigger value="condiciones">Condiciones</TabsTrigger>
          </TabsList>

          {/* Tab 1: Identificación */}
          <TabsContent value="identificacion">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-500" />
                  1. Datos Identificativos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <p>En cumplimiento con el deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Denominación social:</strong> FinAI Pro, S.L.</li>
                  <li><strong>NIF:</strong> B-12345678</li>
                  <li><strong>Domicilio social:</strong> Calle Gran Vía 42, Planta 5, 28013 Madrid, España</li>
                  <li><strong>Email:</strong> legal@finaipro.com</li>
                  <li><strong>Teléfono:</strong> +34 900 123 456</li>
                  <li><strong>Inscrita en el Registro Mercantil:</strong> Tomo 12345, Folio 67, Sección 8, Hoja M-123456</li>
                  <li><strong>Actividad:</strong> Servicios de inteligencia artificial y automatización para el sector financiero</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 2: Productos */}
          <TabsContent value="productos">
            <div className="space-y-6">
              {/* Product Selector */}
              <div className="flex flex-wrap gap-2">
                {Object.keys(PRODUCT_CONTRACTS).map((product) => (
                  <Button
                    key={product}
                    variant={selectedProduct === product ? "default" : "outline"}
                    onClick={() => setSelectedProduct(product)}
                    className={selectedProduct === product ? "bg-emerald-500 hover:bg-emerald-600" : ""}
                  >
                    {product}
                  </Button>
                ))}
              </div>

              {/* Contract Details with Scroll */}
              <Card className="border-2 border-emerald-500/30">
                <CardHeader className="bg-emerald-500/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Contrato Plan {selectedProduct}</CardTitle>
                      <CardDescription>{PRODUCT_CONTRACTS[selectedProduct as keyof typeof PRODUCT_CONTRACTS].empleados} empleados • {PRODUCT_CONTRACTS[selectedProduct as keyof typeof PRODUCT_CONTRACTS].agentes}</CardDescription>
                    </div>
                    <Badge className="bg-emerald-500 text-white text-lg px-4 py-1">
                      {PRODUCT_CONTRACTS[selectedProduct as keyof typeof PRODUCT_CONTRACTS].precio}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="h-[400px] overflow-y-auto p-6 space-y-6">
                    {/* Características */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-500" />
                        Características Incluidas
                      </h4>
                      <div className="grid sm:grid-cols-2 gap-2">
                        {PRODUCT_CONTRACTS[selectedProduct as keyof typeof PRODUCT_CONTRACTS].caracteristicas.map((c, i) => (
                          <div key={i} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg text-sm">
                            <Check className="w-3 h-3 text-emerald-500" />
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Condiciones */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-500" />
                        Términos y Condiciones del Plan
                      </h4>
                      <div className="space-y-2">
                        {PRODUCT_CONTRACTS[selectedProduct as keyof typeof PRODUCT_CONTRACTS].condiciones.map((c, i) => (
                          <div key={i} className="flex items-start gap-2 p-2 border-b border-border last:border-0 text-sm">
                            <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 text-xs text-emerald-500 font-medium">{i + 1}</div>
                            <span className="text-muted-foreground">{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cláusulas */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                        <Scale className="w-4 h-4 text-emerald-500" />
                        Cláusulas Contractuales
                      </h4>
                      <div className="space-y-4 text-sm text-muted-foreground">
                        <div>
                          <h5 className="font-medium text-foreground">Cláusula 1: Objeto del Contrato</h5>
                          <p className="mt-1">El presente contrato tiene por objeto la prestación de servicios de inteligencia artificial, automatización de procesos y análisis de datos por parte de FinAI Pro, S.L. al cliente contratante, según las características específicas del plan {selectedProduct}.</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">Cláusula 2: Duración y Renovación</h5>
                          <p className="mt-1">El contrato tendrá la duración mínima establecida en las condiciones del plan. Transcurrido dicho período, se renovará automáticamente por periodos mensuales salvo denuncia por cualquiera de las partes con la antelación establecida.</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">Cláusula 3: Obligaciones del Cliente</h5>
                          <p className="mt-1">El cliente se compromete a: (a) Proporcionar datos veraces y actualizados; (b) No utilizar los servicios para fines ilícitos; (c) Respetar los límites de uso establecidos en su plan; (d) Mantener la confidencialidad de sus credenciales de acceso.</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">Cláusula 4: Propiedad Intelectual</h5>
                          <p className="mt-1">Los modelos de IA entrenados específicamente para el cliente son propiedad del cliente. FinAI Pro retiene la propiedad de la plataforma base, algoritmos genéricos y metodologías de desarrollo. Los agentes digitales creados son licenciados al cliente durante la vigencia del contrato.</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">Cláusula 5: Confidencialidad</h5>
                          <p className="mt-1">Ambas partes se comprometen a mantener confidencial toda información que reciban de la otra parte que haya sido clasificada como confidencial o que por su naturaleza deba ser tratada como tal.</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">Cláusula 6: Limitación de Responsabilidad</h5>
                          <p className="mt-1">FinAI Pro no será responsable de: (a) Daños indirectos o consecuentes; (b) Pérdida de datos por causas ajenas a la plataforma; (c) Uso indebido de los servicios por parte del cliente; (d) Incidencias causadas por terceros proveedores de servicios externos.</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">Cláusula 7: Resolución</h5>
                          <p className="mt-1">El presente contrato podrá resolverse por: (a) Mutuo acuerdo; (b) Incumplimiento grave de cualquiera de las partes; (c) Quiebra o concurso de acreedores; (d) Fuerza mayor prolongada superior a 30 días.</p>
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">Cláusula 8: Legislación Aplicable</h5>
                          <p className="mt-1">El presente contrato se rige por la legislación española. Para la resolución de controversias, las partes se someten a los Juzgados y Tribunales de Madrid, con renuncia expresa a cualquier otro fuero.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab 3: Privacidad */}
          <TabsContent value="privacidad">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-emerald-500" />
                  Política de Privacidad (RGPD / LOPD)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-sm text-muted-foreground">
                <div className="h-[400px] overflow-y-auto pr-4 space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">1. Responsable del Tratamiento</h4>
                    <p>FinAI Pro, S.L., con NIF B-12345678, es responsable del tratamiento de los datos personales recogidos. Puede contactar con nuestro Delegado de Protección de Datos (DPO) en: dpo@finaipro.com</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">2. Finalidades del Tratamiento</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Gestión de la relación comercial y prestación de servicios contratados</li>
                      <li>Envío de comunicaciones comerciales (previo consentimiento)</li>
                      <li>Mejora de servicios y desarrollo de nuevos productos</li>
                      <li>Entrenamiento de modelos de IA (únicamente datos anonimizados)</li>
                      <li>Cumplimiento de obligaciones legales y reglamentarias</li>
                      <li>Gestión de incidencias y soporte técnico</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">3. Base Legal del Tratamiento</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Ejecución del contrato de servicios (Art. 6.1.b RGPD)</li>
                      <li>Consentimiento del interesado para finalidades específicas (Art. 6.1.a RGPD)</li>
                      <li>Interés legítimo para mejorar servicios (Art. 6.1.f RGPD)</li>
                      <li>Cumplimiento de obligaciones legales (Art. 6.1.c RGPD)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">4. Destinatarios de los Datos</h4>
                    <p>Los datos personales pueden ser comunicados a:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Proveedores de servicios de hosting (AWS, Google Cloud) bajo contrato de encargado del tratamiento</li>
                      <li>Procesadores de pagos (Stripe) para gestión de cobros</li>
                      <li>Herramientas de análisis (solo datos agregados y anonimizados)</li>
                      <li>Autoridades competentes cuando legalmente sea requerido</li>
                    </ul>
                    <p className="mt-2">No se realizan transferencias internacionales de datos fuera del Espacio Económico Europeo sin garantías adecuadas.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">5. Período de Conservación</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Datos de facturación: 6 años según normativa fiscal</li>
                      <li>Datos de clientes activos: durante la relación comercial + 3 años</li>
                      <li>Datos de candidatos: 2 años</li>
                      <li>Logs de actividad: 12 meses según normativa de seguridad</li>
                      <li>Datos para IA: solo datos anonimizados de forma permanente</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">6. Derechos del Interesado</h4>
                    <p>El usuario tiene derecho a:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li><strong>Acceso:</strong> Conocer qué datos personales estamos tratando</li>
                      <li><strong>Rectificación:</strong> Corregir datos inexactos o incompletos</li>
                      <li><strong>Supresión:</strong> Solicitar la eliminación de sus datos ("derecho al olvido")</li>
                      <li><strong>Limitación:</strong> Restringir el tratamiento en determinadas circunstancias</li>
                      <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
                      <li><strong>Oposición:</strong> Oponerse al tratamiento en determinados casos</li>
                      <li><strong>Retirada del consentimiento:</strong> En cualquier momento, sin afectar a la licitud del tratamiento previo</li>
                    </ul>
                    <p className="mt-2">Para ejercer estos derechos, envíe un email a dpo@finaipro.com con copia de su DNI.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">7. Agencia Española de Protección de Datos</h4>
                    <p>Si considera que el tratamiento de sus datos personales infringe la normativa, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">8. Cookies</h4>
                    <p>Utilizamos cookies propias y de terceros para: garantizar el funcionamiento de la web, recordar preferencias, analizar el tráfico, y personalizar contenidos. Puede configurar su navegador para rechazar cookies.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab 4: Condiciones Generales */}
          <TabsContent value="condiciones">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-500" />
                  Condiciones Generales de los Servicios
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 text-sm text-muted-foreground">
                <div className="h-[400px] overflow-y-auto pr-4 space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">1. Objeto de los Servicios</h4>
                    <p>FinAI Pro proporciona servicios de inteligencia artificial, automatización de procesos, análisis de datos y desarrollo de agentes digitales para empresas del sector financiero. Los servicios incluyen, sin limitarse a: Data Analytics, ETL/OLAP, Agentes de IA, Machine Learning, RAG Systems, CRM Automation, Call Center AI y Trabajadores Digitales.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">2. Proceso de Contratación</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>El cliente completa el formulario de configuración</li>
                      <li>FinAI Pro envía propuesta personalizada en 24-48h</li>
                      <li>El cliente acepta términos y activa periodo de prueba</li>
                      <li>Transcurrido el periodo de prueba, se formaliza el contrato</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">3. Periodo de Prueba</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Duración según plan (14-30 días)</li>
                      <li>Sin obligación de permanencia</li>
                      <li>Sin tarjeta de crédito requerida</li>
                      <li>Cancelación en cualquier momento sin coste</li>
                      <li>Acceso completo a funcionalidades del plan</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">4. Facturación y Pagos</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Facturación mensual o anual (según plan)</li>
                      <li>Pago anticipado por transferencia o tarjeta</li>
                      <li>Descuentos por pago anual según plan</li>
                      <li>Impuestos (IVA) no incluidos en precios publicados</li>
                      <li>Recargo de 5% por pagos fuera de plazo</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">5. Política de Cancelación</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Notificación con antelación según plan (7-30 días)</li>
                      <li>Cancelación efectiva al final del período facturado</li>
                      <li>No se realizan devoluciones proporcionales</li>
                      <li>En planes con compromiso anual, posible penalización por cancelación anticipada</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">6. Nivel de Servicio (SLA)</h4>
                    <p>Garantizamos los siguientes niveles de disponibilidad según el plan contratado. En caso de incumplimiento:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>95-97% SLA: Crédito del 5% de la factura mensual</li>
                      <li>90-95% SLA: Crédito del 15% de la factura mensual</li>
                      <li>&lt;90% SLA: Crédito del 30% de la factura mensual</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">7. Soporte Técnico</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Canales según plan (email, chat, teléfono)</li>
                      <li>Tiempos de respuesta garantizados según plan</li>
                      <li>Soporte 24/7 para planes Enterprise</li>
                      <li>Documentación y base de conocimiento disponible para todos los planes</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">8. Actualización de Planes</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Upgrade: Inmediato, con prorrateo del periodo restante</li>
                      <li>Downgrade: Efectivo al siguiente período de facturación</li>
                      <li>Cambio de plan sin penalización (excepto compromiso anual)</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">9. Legislación Aplicable y Jurisdicción</h4>
                    <p>Las presentes condiciones se rigen por la legislación española. Para la resolución de controversias, las partes se someten a los Juzgados y Tribunales de Madrid, con renuncia expresa a cualquier otro fuero que pudiera corresponderles.</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2">10. Contacto</h4>
                    <p>Para cualquier consulta sobre estas condiciones:</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>Email: legal@finaipro.com</li>
                      <li>Teléfono: +34 900 123 456</li>
                      <li>Dirección: Calle Gran Vía 42, Planta 5, 28013 Madrid</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-12 text-center"><Button variant="outline" onClick={() => setCurrentView("landing")} className="gap-2"><ArrowLeft className="w-4 h-4" />Volver a Inicio</Button></div>
      </div>
    </div>
  );
}

// Agent Roles Configuration
const AGENT_ROLES = [
  { id: "inversor", name: "Agente Inversor", icon: TrendingUp, description: "Análisis de inversiones y portfolio" },
  { id: "marketing", name: "Agente de Marketing", icon: Megaphone, description: "Campañas y estrategias de marketing" },
  { id: "finanzas", name: "Agente de Finanzas", icon: DollarSign, description: "Gestión financiera y presupuestos" },
  { id: "rrhh", name: "Agente de RRHH", icon: Users, description: "Recursos humanos y talento" },
  { id: "it", name: "Agente de IT", icon: Cpu, description: "Soporte técnico y sistemas" },
  { id: "ventas", name: "Agente de Ventas", icon: Target, description: "Pipeline y cierre de ventas" },
  { id: "legal", name: "Agente Legal", icon: Scale, description: "Cumplimiento normativo y contratos" },
  { id: "operaciones", name: "Agente de Operaciones", icon: Settings, description: "Procesos operativos y logística" },
  { id: "atencion", name: "Agente de Atención", icon: HeadphonesIcon, description: "Soporte al cliente y helpdesk" },
  { id: "datos", name: "Agente de Datos", icon: Database, description: "Análisis de datos y reporting" },
];

// Call Modal Component
function CallModal({ client, agent, onClose, onLogCall }: { client: any; agent: any; onClose: () => void; onLogCall: (notes: string) => void }) {
  const [callStatus, setCallStatus] = useState<"idle" | "calling" | "connected" | "ended">("idle");
  const [duration, setDuration] = useState(0);
  const [notes, setNotes] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startCall = () => {
    setCallStatus("calling");
    setTimeout(() => setCallStatus("connected"), 2000);
  };

  const endCall = () => {
    setCallStatus("ended");
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (callStatus === "connected") {
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [callStatus]);

  const formatDuration = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background rounded-2xl p-6 max-w-sm w-full">
        <div className="text-center mb-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold mb-3">
            {client.name.charAt(0)}
          </div>
          <h3 className="text-lg font-semibold">{client.name}</h3>
          <p className="text-sm text-muted-foreground">{client.phone}</p>
          {agent && <Badge variant="outline" className="mt-1 text-xs">{agent.name}</Badge>}
        </div>

        <div className="flex flex-col items-center gap-4">
          {callStatus === "idle" && (
            <Button size="lg" className="w-full bg-emerald-500 hover:bg-emerald-600 gap-2" onClick={startCall}>
              <Phone className="w-5 h-5" /> Iniciar Llamada
            </Button>
          )}

          {callStatus === "calling" && (
            <div className="text-center">
              <div className="animate-pulse mb-2">
                <Phone className="w-8 h-8 mx-auto text-emerald-500 animate-bounce" />
              </div>
              <p className="text-sm text-muted-foreground">Llamando...</p>
            </div>
          )}

          {callStatus === "connected" && (
            <div className="text-center w-full">
              <div className="text-3xl font-mono font-bold text-emerald-500 mb-2">{formatDuration(duration)}</div>
              <Badge className="bg-emerald-500">Conectado</Badge>
              <Button variant="destructive" className="w-full mt-4 gap-2" onClick={endCall}>
                <PhoneOff className="w-4 h-4" /> Colgar
              </Button>
            </div>
          )}

          {callStatus === "ended" && (
            <div className="w-full space-y-3">
              <div className="text-center text-muted-foreground">
                <PhoneOff className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                Llamada finalizada • {formatDuration(duration)}
              </div>
              <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas de la llamada..." className="h-24 text-sm" />
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600" onClick={() => onLogCall(notes)}>Guardar Notas</Button>
            </div>
          )}
        </div>

        <Button variant="ghost" size="sm" className="w-full mt-4" onClick={onClose}>Cerrar</Button>
      </motion.div>
    </motion.div>
  );
}

// SME Agent Types and Tasks
const SME_AGENT_TYPES = [
  {
    id: "secretaria",
    name: "Secretaria Virtual",
    icon: Phone,
    color: "from-pink-500 to-rose-500",
    badge: "bg-pink-100 text-pink-700",
    description: "Gestión de agenda, llamadas y atención básica.",
    tasks: [
      "Agendar citas en calendario", "Responder correos de clientes", "Realizar llamadas de recordatorio",
      "Confirmar asistencias por WhatsApp", "Gestionar cancelaciones", "Filtrar llamadas entrantes",
      "Organizar tareas del día", "Enviar avisos de cobro", "Atender dudas básicas por chat",
      "Solicitar valoraciones en Google", "Actualizar base de datos de clientes", "Coordinar envíos de pedidos",
      "Redactar actas de reuniones", "Gestionar reclamaciones iniciales", "Enviar tarjetas de felicitación"
    ]
  },
  {
    id: "social",
    name: "Gestor de Redes",
    icon: Globe,
    color: "from-violet-500 to-purple-500",
    badge: "bg-violet-100 text-violet-700",
    description: "Creación de contenido y respuesta en redes sociales.",
    tasks: [
      "Publicar post diario en Instagram", "Responder comentarios en Facebook", "Monitorizar menciones de la marca",
      "Programar contenido en LinkedIn", "Actualizar ficha de Google Business", "Responder reseñas de clientes",
      "Crear historias con promociones", "Analizar hashtags de competencia", "Redactar copies atractivos",
      "Buscar tendencias locales", "Gestionar mensajes directos (DMs)", "Crear sorteos y promociones",
      "Generar informes de alcance", "Diseñar banners sencillos", "Colaborar con influencers locales"
    ]
  },
  {
    id: "contable",
    name: "Contable Digital",
    icon: FileSpreadsheet,
    color: "from-amber-500 to-orange-500",
    badge: "bg-amber-100 text-amber-700",
    description: "Facturación, tickets y control de gastos.",
    tasks: [
      "Generar facturas de venta", "Registrar facturas de proveedores", "Conciliación bancaria diaria",
      "Gestionar gastos y tickets", "Generar borradores de impuestos", "Avisar vencimientos de pagos",
      "Reclamar facturas impagadas", "Analizar flujo de caja", "Generar resúmenes de beneficio",
      "Categorizar gastos automáticamente", "Digitalizar documentos", "Sincronizar transacciones",
      "Preparar datos para gestoría", "Seguimiento de presupuestos", "Controlar inventario básico"
    ]
  },
  {
    id: "comercial",
    name: "Captador de Clientes",
    icon: Target,
    color: "from-blue-500 to-indigo-500",
    badge: "bg-blue-100 text-blue-700",
    description: "Búsqueda de leads y llamadas de venta.",
    tasks: [
      "Búsqueda de leads", "Realizar llamadas de venta", "Enviar propuestas comerciales",
      "Seguimiento de leads fríos", "Calificar prospectos nuevos", "Actualizar pipeline CRM",
      "Investigar mercados nuevos", "Contactar clientes antiguos", "Ofrecer cupones fidelidad",
      "Organizar visitas comerciales", "Gestionar base de datos ventas", "Analizar ventas perdidas",
      "Redactar guiones de venta", "Enviar presentaciones", "Detección de venta cruzada"
    ]
  },
  {
    id: "marketing",
    name: "Asistente de Marketing",
    icon: Megaphone,
    color: "from-cyan-500 to-blue-500",
    badge: "bg-cyan-100 text-cyan-700",
    description: "Publicidad local y diseño de campañas.",
    tasks: [
      "Crear landing pages", "Redactar newsletter semanal", "Gestionar Facebook Ads",
      "Configurar Google Maps Ads", "Analizar tráfico web", "Crear cupones descuento",
      "Redactar artículos blog", "Optimizar SEO local", "Enviar ofertas por SMS",
      "Diseñar flyers", "Analizar precios competencia", "Organizar eventos locales",
      "Gestionar referidos", "Crear videos cortos", "Realizar encuestas satisfacción"
    ]
  }
];

// User Dashboard Panel
function DashboardPanel({ setCurrentView, formData, setFormData }: { setCurrentView: (v: ViewType) => void; formData: FormData; setFormData: (d: FormData) => void }) {
  const [activeTab, setActiveTab] = useState("agentes");
  const [panelMode, setPanelMode] = useState<"enterprise" | "sme">("enterprise");
  const [isCalling, setIsCalling] = useState(false);
  const [callingData, setCallingData] = useState<{ name: string; phone: string; avatar?: string } | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [chatMode, setChatMode] = useState<"single" | "group">("single");
  const [chatMessages, setChatMessages] = useState<{ role: string; content: string; agent?: string }[]>([
    { role: "assistant", content: "¡Hola! Soy tu asistente. ¿En qué puedo ayudarte?", agent: "Aria-7" }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showAddAgent, setShowAddAgent] = useState(false);
  const [showSmeAddAgent, setShowSmeAddAgent] = useState(false);
  const [newSmeAgent, setNewSmeAgent] = useState({ name: "", type: "secretaria", tasks: [] as string[] });
  const [smeAgents, setSmeAgents] = useState([
    {
      name: "Sofía — Secretaria de Citas",
      role: "Secretaria Virtual",
      desc: "Gestiona tu agenda, hace y recibe llamadas, confirma citas con tus clientes y envía recordatorios automáticos por WhatsApp.",
      icon: "📞",
      color: "from-pink-500 to-rose-500",
      badge: "bg-pink-100 text-pink-700",
      status: "activo",
      stats: [
        { label: "Citas gestionadas", value: "47" },
        { label: "Llamadas realizadas", value: "23" },
        { label: "Tasa confirmación", value: "91%" },
      ],
      capabilities: ["Llamadas salientes automáticas", "Recordatorios WhatsApp", "Calendario integrado", "Gestión de cancelaciones"],
    },
    {
      name: "Marco — Captador de Leads",
      role: "Agente de Ventas",
      desc: "Responde a los visitantes de tu web en tiempo real, cualifica prospectos y agenda reuniones con los clientes potenciales.",
      icon: "🎯",
      color: "from-blue-500 to-indigo-500",
      badge: "bg-blue-100 text-blue-700",
      status: "activo",
      stats: [
        { label: "Leads captados", value: "31" },
        { label: "Conversiones", value: "12" },
        { label: "Tasa respuesta", value: "< 30s" },
      ],
      capabilities: ["Chat web 24/7", "Calificación automática", "Agenda reuniones", "CRM sync"],
    },
    {
      name: "Elena — Community Manager",
      role: "Redes Sociales",
      desc: "Crea, programa y publica contenido en Instagram, LinkedIn y Google Business. Responde comentarios y mensajes directos.",
      icon: "📱",
      color: "from-violet-500 to-purple-500",
      badge: "bg-violet-100 text-violet-700",
      status: "pausado",
      stats: [
        { label: "Posts publicados", value: "18" },
        { label: "Alcance medio", value: "1.4K" },
        { label: "Interacciones", value: "426" },
      ],
      capabilities: ["Publicación automática", "Responde comentarios", "Google Business", "Informes semanales"],
    },
    {
      name: "Carlos — Asistente Administrativo",
      role: "Gestión Interna",
      desc: "Redacta presupuestos, facturas y propuestas comerciales. Resume reuniones y gestiona el correo de tu empresa.",
      icon: "📂",
      color: "from-amber-500 to-orange-500",
      badge: "bg-amber-100 text-amber-700",
      status: "activo",
      stats: [
        { label: "Documentos", value: "34" },
        { label: "Emails gestionados", value: "89" },
        { label: "Tiempo ahorrado", value: "6h/sem" },
      ],
      capabilities: ["Presupuestos automáticos", "Resumen de reuniones", "Gestión de emails", "Propuestas PDF"],
    },
  ]);
  const [editingAgent, setEditingAgent] = useState<string | null>(null);
  const [editingSmeAgentIndex, setEditingSmeAgentIndex] = useState<number | null>(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [chatExpanded, setChatExpanded] = useState(false);
  const [chatConfig, setChatConfig] = useState({ temperature: 0.7, model: "Claude Sonnet 4.6" });
  const [showAddSource, setShowAddSource] = useState(false);
  const [sourceSearch, setSourceSearch] = useState("");
  const [newSource, setNewSource] = useState({ name: "", type: "url", url: "" });
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Chat resize and floating mode
  const [chatWidth, setChatWidth] = useState(340);
  const [chatFloating, setChatFloating] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  // Predictions state
  const [predictions, setPredictions] = useState([
    { id: 1, type: 'agente', source: 'Aria-7', prediction: 'Cliente Banco Santander probablemente renueva contrato en Q2', confidence: 87, date: 'Hoy', category: 'clientes' },
    { id: 2, type: 'modelo', source: 'Predictor de Riesgo v1', prediction: 'Tendencia alcista mercado fintech próximos 3 meses', confidence: 72, date: 'Hoy', category: 'mercado' },
    { id: 3, type: 'agente', source: 'FinBot-1', prediction: 'Oportunidad cross-selling detectada para BBVA Asset Management', confidence: 81, date: 'Ayer', category: 'ventas' },
    { id: 4, type: 'modelo', source: 'Forecast Financiero', prediction: 'Riesgo de pérdida cliente Bankinter - nivel medio', confidence: 65, date: 'Ayer', category: 'riesgo' },
    { id: 5, type: 'agente', source: 'Oracle-1', prediction: 'Incremento potencial del 15% en conversiones con nueva estrategia', confidence: 78, date: 'Hace 2 días', category: 'marketing' },
    { id: 6, type: 'modelo', source: 'Clasificador de Clientes', prediction: 'CaixaBank clasificado como cliente premium potencial', confidence: 91, date: 'Hace 2 días', category: 'clientes' },
  ]);
  const [predictionFilter, setPredictionFilter] = useState({ type: 'todos', confidence: 'todos' });

  // Automated tasks state
  const [autoTasks, setAutoTasks] = useState([
    { id: 1, task: 'Enviar email renovación a Banco Santander', type: 'email', status: 'pendiente', prediction: 'Cliente Banco Santander probablemente renueva contrato', agent: 'Aria-7', scheduled: 'Hoy 16:00', priority: 'alta' },
    { id: 2, task: 'Llamar a Bankinter para retención', type: 'llamada', status: 'en-progreso', prediction: 'Riesgo de pérdida cliente Bankinter', agent: 'FinBot-1', scheduled: 'Ayer 15:30', priority: 'alta' },
    { id: 3, task: 'Generar informe mercado fintech Q2', type: 'reporte', status: 'pendiente', prediction: 'Tendencia alcista mercado fintech', agent: 'Oracle-1', scheduled: 'Mañana 09:00', priority: 'media' },
    { id: 4, task: 'Preparar propuesta cross-selling BBVA', type: 'analisis', status: 'completada', prediction: 'Oportunidad cross-selling detectada', agent: 'FinBot-1', scheduled: 'Completado', priority: 'media' },
    { id: 5, task: 'Contactar CaixaBank como cliente premium', type: 'email', status: 'pendiente', prediction: 'CaixaBank clasificado como cliente premium', agent: 'Nexus-3', scheduled: 'Viernes 10:00', priority: 'baja' },
  ]);
  const [taskFilter, setTaskFilter] = useState({ status: 'todos', type: 'todos' });

  // Data sources table data (for spreadsheet view)
  const [dataSourceRows, setDataSourceRows] = useState([
    { id: 1, nombre: 'Expansión', tipo: 'RSS Feed', url: 'https://expansion.es/rss', estado: 'conectado', ultimaSync: 'Hace 5 min', registros: 12450, frecuencia: '15 min' },
    { id: 2, nombre: 'Cinco Días', tipo: 'RSS Feed', url: 'https://cincodias.elpais.com/rss', estado: 'conectado', ultimaSync: 'Hace 12 min', registros: 8932, frecuencia: '30 min' },
    { id: 3, nombre: 'Bloomberg API', tipo: 'API', url: 'https://api.bloomberg.com/market', estado: 'conectado', ultimaSync: 'Hace 2 min', registros: 45678, frecuencia: '5 min' },
    { id: 4, nombre: 'Reuters Finance', tipo: 'RSS Feed', url: 'https://reuters.com/rss/finance', estado: 'conectado', ultimaSync: 'Hace 8 min', registros: 34521, frecuencia: '15 min' },
    { id: 5, nombre: 'CRM Salesforce', tipo: 'Database', url: 'salesforce.com/crm', estado: 'sincronizando', ultimaSync: 'Sincronizando...', registros: 12450, frecuencia: '1 hora' },
    { id: 6, nombre: 'Market Data API', tipo: 'API', url: 'https://marketdata.example.com/v2', estado: 'conectado', ultimaSync: 'Hace 1 min', registros: 78923, frecuencia: '1 min' },
  ]);
  const [editingCell, setEditingCell] = useState<{ rowId: number; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [sourceTab, setSourceTab] = useState<'tradicionales' | 'mcp'>('tradicionales');
  const [mcpIntegrations, setMcpIntegrations] = useState([
    { id: 'slack', name: 'Slack', status: 'conectado', lastSync: 'Hace 2 min', actions: 156 },
    { id: 'notion', name: 'Notion', status: 'conectado', lastSync: 'Hace 5 min', actions: 89 },
    { id: 'salesforce', name: 'Salesforce', status: 'conectado', lastSync: 'Hace 1 min', actions: 234 },
    { id: 'github', name: 'GitHub', status: 'pendiente', lastSync: 'Pendiente', actions: 0 },
    { id: 'jira', name: 'Jira', status: 'conectado', lastSync: 'Hace 10 min', actions: 67 },
  ]);

  // Agent history modal state
  const [showAgentHistory, setShowAgentHistory] = useState(false);
  const [selectedAgentHistory, setSelectedAgentHistory] = useState<any>(null);

  // Client detail modal state
  const [showClientDetail, setShowClientDetail] = useState(false);
  const [selectedClientDetail, setSelectedClientDetail] = useState<any>(null);
  const [clientSubTab, setClientSubTab] = useState<'clientes' | 'directivos'>('clientes');

  // IBEX 35 Directors data
  const [ibexDirectors, setIbexDirectors] = useState([
    { id: 1, name: "Ana Botín", position: "Presidenta", company: "Banco Santander", portfolio: ["Santander", "Banco Sabadell", "Bankia"], photo: "AB", linkedin: "#", connections: 12 },
    { id: 2, name: "Carlos Torres Vila", position: "CEO", company: "BBVA", portfolio: ["BBVA", "Telefónica", "Repsol"], photo: "CT", linkedin: "#", connections: 8 },
    { id: 3, name: "José Ignacio Goirigolzarri", position: "Presidente", company: "CaixaBank", portfolio: ["CaixaBank", "Gas Natural", "Abertis"], photo: "JI", linkedin: "#", connections: 15 },
    { id: 4, name: "Antoni Brufau", position: "Presidente", company: "Repsol", portfolio: ["Repsol", "CaixaBank", "Enagás"], photo: "AB", linkedin: "#", connections: 10 },
    { id: 5, name: "José María Álvarez-Pallete", position: "CEO", company: "Telefónica", portfolio: ["Telefónica", "BBVA", "Banco Santander"], photo: "JM", linkedin: "#", connections: 9 },
    { id: 6, name: "Francisco Reynés", position: "Presidente", company: "Naturgy", portfolio: ["Naturgy", "CaixaBank", "Repsol"], photo: "FR", linkedin: "#", connections: 7 },
    { id: 7, name: "Antonio Garamendi", position: "Presidente", company: "CEOE", portfolio: ["BBVA", "Iberdrola", "Inditex"], photo: "AG", linkedin: "#", connections: 20 },
    { id: 8, name: "Ignacio Galán", position: "Presidente", company: "Iberdrola", portfolio: ["Iberdrola", "Banco Santander", "Repsol"], photo: "IG", linkedin: "#", connections: 14 },
  ]);

  // Analytics sub-tab state
  const [analyticsTab, setAnalyticsTab] = useState<'avanzadas' | 'mercado'>('avanzadas');
  const [selectedIbexCompany, setSelectedIbexCompany] = useState<string>('santander');

  // Trading chart states
  const [crosshairPos, setCrosshairPos] = useState<{ x: number; y: number; visible: boolean; price: number; date: string }>({ x: 0, y: 0, visible: false, price: 0, date: '' });
  const [chartScrollOffset, setChartScrollOffset] = useState(0);
  const [selectedPrediction, setSelectedPrediction] = useState<any>(null);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic cursor state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorType, setCursorType] = useState<'default' | 'agent' | 'edit' | 'data' | 'action' | 'chat' | 'client'>('default');

  // Animated progress bars - grow slowly at different rates
  const [leadScores, setLeadScores] = useState([0, 0, 0, 0, 0]);
  const [clonacionScores, setClonacionScores] = useState([0, 0, 0, 0]);
  const targetLeadScores = [92, 78, 85, 65, 88]; // Target scores for each client
  const targetClonacionScores = [94, 87, 91, 78]; // Target scores for each agent

  // Animate lead scores slowly at different rates
  useEffect(() => {
    const intervals = targetLeadScores.map((target, i) => {
      const speed = 50 + Math.random() * 150; // Different speed for each bar (50-200ms)
      return setInterval(() => {
        setLeadScores(prev => {
          const newScores = [...prev];
          if (newScores[i] < target) {
            newScores[i] = Math.min(newScores[i] + (Math.random() * 2 + 0.5), target);
          }
          return newScores;
        });
      }, speed);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  // Animate clonacion scores slowly at different rates
  useEffect(() => {
    const intervals = targetClonacionScores.map((target, i) => {
      const speed = 80 + Math.random() * 120; // Different speed for each bar
      return setInterval(() => {
        setClonacionScores(prev => {
          const newScores = [...prev];
          if (newScores[i] < target) {
            newScores[i] = Math.min(newScores[i] + (Math.random() * 1.5 + 0.3), target);
          }
          return newScores;
        });
      }, speed);
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  // Track mouse position globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate 220 candles for realistic trading chart
  const generateCandles = (basePrice: number, volatility: number = 0.03): any[] => {
    const candles = [];
    let currentPrice = basePrice * 0.85; // Start 15% below current
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 220);

    for (let i = 0; i < 220; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const change = (Math.random() - 0.48) * volatility * currentPrice;
      const open = currentPrice;
      const close = currentPrice + change;
      const high = Math.max(open, close) + Math.random() * volatility * currentPrice * 0.5;
      const low = Math.min(open, close) - Math.random() * volatility * currentPrice * 0.5;

      candles.push({
        date: date.toISOString().split('T')[0],
        open: parseFloat(open.toFixed(3)),
        high: parseFloat(high.toFixed(3)),
        low: parseFloat(low.toFixed(3)),
        close: parseFloat(close.toFixed(3)),
        volume: Math.floor(Math.random() * 50000000) + 10000000
      });

      currentPrice = close;
    }

    return candles.slice(-220); // Ensure exactly 220 candles
  };

  // IBEX 35 Companies data with 220 candles each
  const [ibexCompanies] = useState([
    { id: 'santander', name: 'Banco Santander', ticker: 'SAN', price: 4.52, change: +1.2, volume: '45.2M', candleData: generateCandles(4.52, 0.025) },
    { id: 'bbva', name: 'BBVA', ticker: 'BBVA', price: 12.85, change: +0.8, volume: '32.1M', candleData: generateCandles(12.85, 0.022) },
    { id: 'caixabank', name: 'CaixaBank', ticker: 'CABK', price: 5.23, change: -0.4, volume: '28.5M', candleData: generateCandles(5.23, 0.028) },
    { id: 'iberdrola', name: 'Iberdrola', ticker: 'IBE', price: 13.42, change: +2.1, volume: '18.7M', candleData: generateCandles(13.42, 0.020) },
    { id: 'telefonica', name: 'Telefónica', ticker: 'TEF', price: 4.18, change: -0.7, volume: '52.3M', candleData: generateCandles(4.18, 0.030) },
    { id: 'repsol', name: 'Repsol', ticker: 'REP', price: 14.85, change: +1.5, volume: '15.8M', candleData: generateCandles(14.85, 0.024) },
    { id: 'inditex', name: 'Inditex', ticker: 'ITX', price: 48.92, change: +0.3, volume: '8.2M', candleData: generateCandles(48.92, 0.018) },
    { id: 'naturgy', name: 'Naturgy', ticker: 'NTGY', price: 24.35, change: -0.2, volume: '6.5M', candleData: generateCandles(24.35, 0.022) },
  ]);

  // Market predictions with trading signals
  const [marketPredictions, setMarketPredictions] = useState([
    { id: 1, asset: 'SAN', company: 'Banco Santander', direction: 'long', entry: 4.50, takeProfit: 4.85, stopLoss: 4.32, current: 4.52, confidence: 78, status: 'activo', expiration: '7 días' },
    { id: 2, asset: 'BBVA', company: 'BBVA', direction: 'long', entry: 12.80, takeProfit: 13.50, stopLoss: 12.45, current: 12.85, confidence: 82, status: 'activo', expiration: '14 días' },
    { id: 3, asset: 'IBE', company: 'Iberdrola', direction: 'long', entry: 13.40, takeProfit: 14.20, stopLoss: 13.05, current: 13.42, confidence: 85, status: 'activo', expiration: '10 días' },
    { id: 4, asset: 'TEF', company: 'Telefónica', direction: 'short', entry: 4.20, takeProfit: 3.95, stopLoss: 4.38, current: 4.18, confidence: 71, status: 'pendiente', expiration: '5 días' },
    { id: 5, asset: 'REP', company: 'Repsol', direction: 'long', entry: 14.75, takeProfit: 15.60, stopLoss: 14.35, current: 14.85, confidence: 79, status: 'activo', expiration: '12 días' },
    { id: 6, asset: 'ITX', company: 'Inditex', direction: 'long', entry: 48.80, takeProfit: 51.50, stopLoss: 47.50, current: 48.92, confidence: 76, status: 'activo', expiration: '21 días' },
    { id: 7, asset: 'CABK', company: 'CaixaBank', direction: 'short', entry: 5.30, takeProfit: 4.95, stopLoss: 5.55, current: 5.23, confidence: 68, status: 'pendiente', expiration: '8 días' },
    { id: 8, asset: 'NTGY', company: 'Naturgy', direction: 'neutral', entry: 24.30, takeProfit: 25.50, stopLoss: 23.50, current: 24.35, confidence: 62, status: 'observacion', expiration: '15 días' },
  ]);

  // Assets list
  const [assetsList, setAssetsList] = useState([
    { id: 1, ticker: 'SAN', name: 'Banco Santander', sector: 'Banca', price: 4.52, change: +1.2, marketCap: '67.2B', pe: 6.8 },
    { id: 2, ticker: 'BBVA', name: 'BBVA', sector: 'Banca', price: 12.85, change: +0.8, marketCap: '78.5B', pe: 7.2 },
    { id: 3, ticker: 'CABK', name: 'CaixaBank', sector: 'Banca', price: 5.23, change: -0.4, marketCap: '32.1B', pe: 8.1 },
    { id: 4, ticker: 'IBE', name: 'Iberdrola', sector: 'Energía', price: 13.42, change: +2.1, marketCap: '85.3B', pe: 18.5 },
    { id: 5, ticker: 'TEF', name: 'Telefónica', sector: 'Telecom', price: 4.18, change: -0.7, marketCap: '23.8B', pe: 12.3 },
    { id: 6, ticker: 'REP', name: 'Repsol', sector: 'Petróleo', price: 14.85, change: +1.5, marketCap: '22.1B', pe: 5.8 },
    { id: 7, ticker: 'ITX', name: 'Inditex', sector: 'Retail', price: 48.92, change: +0.3, marketCap: '152B', pe: 24.2 },
    { id: 8, ticker: 'NTGY', name: 'Naturgy', sector: 'Energía', price: 24.35, change: -0.2, marketCap: '24.5B', pe: 11.8 },
  ]);

  // Models state for ML training
  const [showAddModel, setShowAddModel] = useState(false);
  const [models, setModels] = useState([
    { id: 1, name: "Predictor de Riesgo v1", type: "MLP", status: "trained", epochs: 100, inputLayers: 64, outputLayers: 1, optimizer: "Adam", accuracy: 94.2, lastTrained: "Hace 2 días" },
    { id: 2, name: "Clasificador de Clientes", type: "Transformer", status: "training", epochs: 50, inputLayers: 512, outputLayers: 5, optimizer: "AdamW", accuracy: null, lastTrained: "Entrenando..." },
    { id: 3, name: "Forecast Financiero", type: "LSTM", status: "trained", epochs: 200, inputLayers: 128, outputLayers: 3, optimizer: "RMSprop", accuracy: 89.7, lastTrained: "Hace 5 días" },
  ]);
  const [newModel, setNewModel] = useState({
    name: "", type: "MLP", epochs: 100, inputLayers: 64, outputLayers: 1, optimizer: "Adam"
  });

  // Clients enhanced state
  const [showAddClient, setShowAddClient] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [clientFilter, setClientFilter] = useState({ phase: "todos", billing: "todos" });
  const [newClient, setNewClient] = useState({ name: "", email: "", phone: "", agent: "", phase: "nuevo", billing: 0 });
  const [emailContent, setEmailContent] = useState({ subject: "", body: "" });
  const [emailTo, setEmailTo] = useState("");
  const [agentWritingEmail, setAgentWritingEmail] = useState(false);

  // SME enhanced state
  const [smeProspects, setSmeProspects] = useState([
    { id: 1, name: "Javier", phone: "+34 607 08 44 00", email: "javier@ejemplo.es", status: "pendiente", notes: "" },
    { id: 2, name: "Paulo", phone: "+34 630 25 40 93", email: "paulo@empresa.com", status: "pendiente", notes: "" },
    { id: 3, name: "Pedro", phone: "+34 696 26 31 92", email: "pedro@servicios.net", status: "pendiente", notes: "" },
    { id: 4, name: "Ernesto", phone: "+34 607 18 33 61", email: "ernesto@pyme.es", status: "pendiente", notes: "" },
  ]);

  const [smeAppointments, setSmeAppointments] = useState([
    { id: 1, date: "2026-03-04", time: "09:00", client: "Servicios Martínez", type: "Revisión Web", status: "confirmed" },
    { id: 2, date: "2026-03-04", time: "11:30", client: "Clínica Dental Sonrisas", type: "Estrategia SEM", status: "pending" },
    { id: 3, date: "2026-03-04", time: "14:00", client: "Restaurante El Puerto", type: "Sesión Fotos", status: "confirmed" },
    { id: 4, date: "2026-03-04", time: "16:45", client: "Abogados Asociados", type: "Plan de Leads", status: "confirmed" },
  ]);
  const [showSmeAppointmentModal, setShowSmeAppointmentModal] = useState(false);
  const [newSmeAppointment, setNewSmeAppointment] = useState({ client: "", date: "2026-03-04", time: "10:00", type: "Consulta" });

  // User agents state with full configuration
  const [userAgents, setUserAgents] = useState([
    {
      id: "agent-1", name: "Aria-7", role: "inversor", active: true, model: "Claude Sonnet 4.6",
      prompt: "Eres un agente especializado en análisis de inversiones y gestión de portfolio.",
      connections: ["salesforce", "bloomberg", "reuters"],
      dailyActions: 500,
      config: { temperatura: 0.7, maxTokens: 4096, frecuencia: 0.9, creatividad: "alta", idioma: "es-ES" },
      stats: { tasks: 847, success: 98, avgTime: "2.3s", satisfaction: 4.8, tokens: 245000, calls: 156, messages: 892, revenue: 12500 },
      weeklyData: [120, 145, 132, 178, 156, 45, 23]
    },
    {
      id: "agent-2", name: "Nexus-3", role: "marketing", active: true, model: "GPT 5.2",
      prompt: "Especialista en campañas de marketing digital y análisis de mercado.",
      connections: ["hubspot", "slack"],
      dailyActions: 300,
      config: { temperatura: 0.8, maxTokens: 2048, frecuencia: 0.85, creatividad: "muy-alta", idioma: "es-ES" },
      stats: { tasks: 234, success: 94, avgTime: "3.1s", satisfaction: 4.6, tokens: 128000, calls: 45, messages: 567, revenue: 8200 },
      weeklyData: [80, 95, 88, 120, 100, 30, 15]
    },
    {
      id: "agent-3", name: "Oracle-1", role: "datos", active: true, model: "Gemini 3 Flash",
      prompt: "Analista de datos experto en reporting y business intelligence.",
      connections: ["notion", "aws"],
      dailyActions: 200,
      config: { temperatura: 0.3, maxTokens: 8192, frecuencia: 0.95, creatividad: "baja", idioma: "es-ES" },
      stats: { tasks: 156, success: 97, avgTime: "1.8s", satisfaction: 4.9, tokens: 312000, calls: 23, messages: 234, revenue: 9800 },
      weeklyData: [50, 65, 58, 85, 72, 20, 10]
    },
    {
      id: "agent-4", name: "Sentinel-2", role: "legal", active: false, model: "Claude Haiku 4.5",
      prompt: "Asesor legal especializado en cumplimiento normativo y contratos.",
      connections: [],
      dailyActions: 100,
      config: { temperatura: 0.2, maxTokens: 4096, frecuencia: 0.98, creatividad: "muy-baja", idioma: "es-ES" },
      stats: { tasks: 89, success: 92, avgTime: "4.2s", satisfaction: 4.5, tokens: 67000, calls: 12, messages: 145, revenue: 3500 },
      weeklyData: [30, 35, 32, 45, 40, 10, 5]
    },
    {
      id: "agent-5", name: "FinBot-1", role: "finanzas", active: true, model: "Claude Opus 4.6",
      prompt: "Gestor financiero para presupuestos, análisis y planificación.",
      connections: ["salesforce", "jira"],
      dailyActions: 350,
      config: { temperatura: 0.4, maxTokens: 8192, frecuencia: 0.92, creatividad: "media", idioma: "es-ES" },
      stats: { tasks: 412, success: 96, avgTime: "3.5s", satisfaction: 4.7, tokens: 189000, calls: 89, messages: 678, revenue: 15000 },
      weeklyData: [100, 120, 110, 150, 130, 40, 20]
    },
  ]);

  // New agent form
  const [newAgent, setNewAgent] = useState({
    name: "", role: "inversor", model: "Claude Sonnet 4.6", temperatura: 0.7, maxTokens: 4096, creatividad: "media",
    prompt: "", connections: [] as string[], dailyActions: 100
  });

  // Clients data with phase and billing
  const [clients, setClients] = useState([
    {
      id: 1, name: "Banco Santander", email: "contacto@santander.es", phone: "+34 912 345 678", agent: "agent-1", phase: "activo", billing: 15000,
      tags: ["VIP", "Enterprise"],
      interactions: [
        { type: "email", date: "Hoy 10:30", summary: "Enviado informe mensual de inversiones" },
        { type: "call", date: "Ayer 16:45", summary: "Revisión de portfolio Q4" },
        { type: "email", date: "15 Ene", summary: "Propuesta de reestructuración" },
      ]
    },
    {
      id: 2, name: "BBVA Asset Management", email: "assets@bbva.com", phone: "+34 915 678 901", agent: "agent-3", phase: "activo", billing: 8500,
      tags: ["Prioritario", "Enterprise"],
      interactions: [
        { type: "call", date: "Hoy 09:00", summary: "Seguimiento trimestral" },
        { type: "email", date: "16 Ene", summary: "Análisis de riesgos" },
      ]
    },
    {
      id: 3, name: "CaixaBank Inversiones", email: "inversiones@caixabank.es", phone: "+34 934 567 890", agent: "agent-5", phase: "prospeccion", billing: 0,
      tags: ["PyME"],
      interactions: [
        { type: "email", date: "17 Ene", summary: "Reporte de rendimiento" },
      ]
    },
    {
      id: 4, name: "Sabadell Wealth", email: "wealth@sabadell.es", phone: "+34 935 678 901", agent: "agent-1", phase: "nuevo", billing: 0,
      tags: ["Prioritario"],
      interactions: [
        { type: "call", date: "Hoy 14:00", summary: "Primera llamada de contacto" },
      ]
    },
    {
      id: 5, name: "Bankinter Institutional", email: "inst@bankinter.es", phone: "+34 915 123 456", agent: "agent-3", phase: "inactivo", billing: 5000,
      tags: ["VIP", "Enterprise", "Prioritario"],
      interactions: [
        { type: "email", date: "10 Ene", summary: "Última comunicación" },
      ]
    },
  ]);

  // Data sources with delete capability
  const [dataSources, setDataSources] = useState([
    { id: 1, name: "Expansión", type: "RSS Feed", source: "https://expansion.es/rss", status: "connected", lastSync: "Hace 5 min", records: 12450 },
    { id: 2, name: "Cinco Días", type: "RSS Feed", source: "https://cincodias.elpais.com/rss", status: "connected", lastSync: "Hace 12 min", records: 8932 },
    { id: 3, name: "Bloomberg API", type: "API", source: "https://api.bloomberg.com", status: "connected", lastSync: "Hace 2 min", records: 45678 },
    { id: 4, name: "Reuters", type: "RSS Feed", source: "https://reuters.com/rss", status: "connected", lastSync: "Hace 8 min", records: 34521 },
    { id: 5, name: "CRM Salesforce", type: "Base de Datos", source: "salesforce.com", status: "syncing", lastSync: "Sincronizando...", records: 12450 },
  ]);

  // Mock competition data
  const competitors = [
    { id: 1, name: "FinTech Solutions S.A.", type: "Directo", threat: "high", products: ["CRM Financiero", "Analytics Pro"], news: 12, lastUpdate: "Hoy" },
    { id: 2, name: "DataCrunch AI", type: "Directo", threat: "medium", products: ["ML Platform", "Data Pipeline"], news: 8, lastUpdate: "Ayer" },
    { id: 3, name: "SmartBank Tech", type: "Indirecto", threat: "low", products: ["Banca Digital"], news: 3, lastUpdate: "Hace 3 días" },
    { id: 4, name: "InvestAnalytics", type: "Directo", threat: "high", products: ["Portfolio Manager", "Risk Analysis"], news: 15, lastUpdate: "Hoy" },
  ];

  // Analytics data
  const analyticsData = [
    { name: "Lun", emails: 120, llamadas: 45, tareas: 89 },
    { name: "Mar", emails: 145, llamadas: 52, tareas: 102 },
    { name: "Mié", emails: 132, llamadas: 48, tareas: 95 },
    { name: "Jue", emails: 178, llamadas: 61, tareas: 124 },
    { name: "Vie", emails: 156, llamadas: 55, tareas: 110 },
    { name: "Sáb", emails: 45, llamadas: 12, tareas: 30 },
    { name: "Dom", emails: 23, llamadas: 5, tareas: 15 },
  ];

  const toggleAgentActive = (agentId: string) => {
    setUserAgents(prev => prev.map(a => a.id === agentId ? { ...a, active: !a.active } : a));
  };

  const addNewAgent = () => {
    if (!newAgent.name.trim()) return;
    const agent = {
      id: `agent-${Date.now()}`,
      name: newAgent.name, role: newAgent.role, active: true, model: newAgent.model,
      prompt: newAgent.prompt, connections: newAgent.connections, dailyActions: newAgent.dailyActions,
      config: { temperatura: newAgent.temperatura, maxTokens: newAgent.maxTokens, frecuencia: 0.9, creatividad: newAgent.creatividad, idioma: "es-ES" },
      stats: { tasks: 0, success: 0, avgTime: "0s", satisfaction: 0, tokens: 0, calls: 0, messages: 0, revenue: 0 },
      weeklyData: [0, 0, 0, 0, 0, 0, 0]
    };
    setUserAgents(prev => [...prev, agent]);
    setNewAgent({ name: "", role: "inversor", model: "Claude Sonnet 4.6", temperatura: 0.7, maxTokens: 4096, creatividad: "media", prompt: "", connections: [], dailyActions: 100 });
    setShowAddAgent(false);
  };

  const updateAgent = () => {
    if (!editingAgent) return;
    setUserAgents(prev => prev.map(a => a.id === editingAgent ? { ...a, ...newAgent } : a));
    setEditingAgent(null);
    setShowAddAgent(false);
  };

  const deleteAgent = (agentId: string) => {
    setUserAgents(prev => prev.filter(a => a.id !== agentId));
  };

  const addSmeAgent = () => {
    const type = SME_AGENT_TYPES.find(t => t.id === newSmeAgent.type);
    if (!type) return;

    const agentData = {
      name: newSmeAgent.name || `${type.name} #${smeAgents.length + 1}`,
      role: type.name,
      desc: type.description,
      icon: editingSmeAgentIndex !== null ? smeAgents[editingSmeAgentIndex].icon : "🤖",
      color: type.color,
      badge: type.badge,
      status: "activo",
      stats: editingSmeAgentIndex !== null ? smeAgents[editingSmeAgentIndex].stats : [
        { label: "Tareas hoy", value: "0" },
        { label: "Conversaciones", value: "0" },
        { label: "Eficiencia", value: "100%" },
      ],
      capabilities: newSmeAgent.tasks.length > 0 ? newSmeAgent.tasks : type.tasks.slice(0, 4),
    };

    if (editingSmeAgentIndex !== null) {
      setSmeAgents(prev => prev.map((a, i) => i === editingSmeAgentIndex ? { ...a, ...agentData } : a));
      setEditingSmeAgentIndex(null);
    } else {
      setSmeAgents(prev => [...prev, agentData as any]);
    }

    setShowSmeAddAgent(false);
    setNewSmeAgent({ name: "", type: "secretaria", tasks: [] });
  };

  const deleteDataSource = (sourceId: number) => {
    setDataSources(prev => prev.filter(s => s.id !== sourceId));
  };

  const addNewSource = () => {
    if (!newSource.name.trim() || !newSource.url.trim()) return;
    const source = {
      id: Date.now(),
      name: newSource.name,
      type: newSource.type === "url" ? "URL" : newSource.type === "rss" ? "RSS Feed" : "Base de Datos",
      source: newSource.url,
      status: "connected",
      lastSync: "Ahora",
      records: 0
    };
    setDataSources(prev => [...prev, source]);
    setNewSource({ name: "", type: "url", url: "" });
    setShowAddSource(false);
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const currentMessages = [...chatMessages, { role: "user", content: newMessage, agent: "" }];
    setChatMessages(currentMessages as any);
    setNewMessage("");

    const allAgents = [
      ...userAgents,
      ...smeAgents.map((a, i) => ({ id: `agent-sme-${i + 1}`, name: a.name, role: a.role }))
    ];
    const agentObj = allAgents.find(a => a.id === selectedAgent);
    const agent = agentObj ? agentObj.name : "Orquestador Principal";
    const systemPrompt = `Actúas como ${agent} en el panel de FinAI Pro. Si eres Sofía, eres una secretaria amable que gestiona citas. Si eres Marco, eres un vendedor agresivo pero profesional. Si eres Elena, eres creativa y experta en redes. Si eres Carlos, eres eficiente y organizado. Si eres nuevo, básate en tu rol: ${agentObj?.role || 'Asistente general'}.`;

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: currentMessages.map(m => ({ role: m.role, content: m.content })),
        system_prompt: systemPrompt
      })
    })
      .then(res => res.json())
      .then(data => {
        setChatMessages(prev => [...prev, { role: "assistant", content: data.reply || "No puedo conectar con la base de datos de IA.", agent }] as any);
      })
      .catch(() => {
        setChatMessages(prev => [...prev, { role: "assistant", content: "Error de IA remota.", agent }] as any);
      });
  };

  // Model handlers
  const addNewModel = () => {
    if (!newModel.name.trim()) return;
    const model = {
      id: Date.now(),
      name: newModel.name,
      type: newModel.type,
      status: "pending",
      epochs: newModel.epochs,
      inputLayers: newModel.inputLayers,
      outputLayers: newModel.outputLayers,
      optimizer: newModel.optimizer,
      accuracy: null,
      lastTrained: "Pendiente"
    };
    setModels(prev => [...prev, model]);
    setNewModel({ name: "", type: "MLP", epochs: 100, inputLayers: 64, outputLayers: 1, optimizer: "Adam" });
    setShowAddModel(false);
  };

  const deleteModel = (modelId: number) => {
    setModels(prev => prev.filter(m => m.id !== modelId));
  };

  const trainModel = (modelId: number) => {
    setModels(prev => prev.map(m => m.id === modelId ? { ...m, status: "training", lastTrained: "Entrenando..." } : m));
    setTimeout(() => {
      setModels(prev => prev.map(m => m.id === modelId ? { ...m, status: "trained", accuracy: Math.round((Math.random() * 20 + 75) * 10) / 10, lastTrained: "Ahora" } : m));
    }, 3000);
  };

  // Client handlers
  const addNewClient = () => {
    if (!newClient.name.trim() || !newClient.email.trim()) return;
    const client = {
      id: Date.now(),
      name: newClient.name,
      email: newClient.email,
      phone: newClient.phone,
      agent: newClient.agent,
      phase: newClient.phase,
      billing: newClient.billing,
      interactions: []
    };
    setClients(prev => [...prev, client]);
    setNewClient({ name: "", email: "", phone: "", agent: "", phase: "nuevo", billing: 0 });
    setShowAddClient(false);
  };

  const getFilteredClients = () => {
    return clients.filter(c => {
      if (clientFilter.phase !== "todos" && c.phase !== clientFilter.phase) return false;
      if (clientFilter.billing === "alto" && c.billing < 10000) return false;
      if (clientFilter.billing === "medio" && (c.billing < 1000 || c.billing >= 10000)) return false;
      if (clientFilter.billing === "bajo" && c.billing >= 1000) return false;
      return true;
    });
  };

  const handleEmailClient = (client: any) => {
    setSelectedClient(client);
    setEmailContent({ subject: ``, body: "" });
    setShowEmailModal(true);
  };

  const handleCallClient = (client: any) => {
    setSelectedClient(client);
    setShowCallModal(true);
  };

  const handleAgentWriteEmail = () => {
    setAgentWritingEmail(true);
    setTimeout(() => {
      const agent = userAgents.find(a => a.id === selectedClient?.agent);
      setEmailContent({
        subject: `Seguimiento - ${selectedClient?.name}`,
        body: `Estimados señores de ${selectedClient?.name},\n\nLe escribimos en nombre de FinAI Pro para dar seguimiento a nuestra última conversación. Nuestro agente ${agent?.name || "de IA"} ha analizado su situación y nos gustaría programar una reunión para discutir nuevas oportunidades de colaboración.\n\nQuedamos a su disposición para cualquier consulta.\n\nAtentamente,\nEquipo FinAI Pro`
      });
      setAgentWritingEmail(false);
    }, 2000);
  };

  const sendEmail = () => {
    if (selectedClient) {
      const newInteraction = { type: "email", date: "Ahora", summary: emailContent.subject || "Email enviado" };
      setClients(prev => prev.map(c => c.id === selectedClient.id ? { ...c, interactions: [newInteraction, ...(c.interactions || [])] } : c));
    } else if (emailTo) {
      setSmeProspects(prev => prev.map(p => p.email === emailTo || p.name === emailTo ? { ...p, status: "contactado" } : p));
    }
    setShowEmailModal(false);
    setEmailContent({ subject: "", body: "" });
    setEmailTo("");
  };

  const logCall = (notes: string) => {
    if (selectedClient) {
      const newInteraction = { type: "call", date: "Ahora", summary: notes || "Llamada realizada" };
      setClients(prev => prev.map(c => c.id === selectedClient.id ? { ...c, interactions: [newInteraction, ...c.interactions] } : c));
    }
    setShowCallModal(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const getRoleInfo = (roleId: string) => AGENT_ROLES.find(r => r.id === roleId) || AGENT_ROLES[0];

  return (
    <div className="h-screen bg-muted/20 flex flex-col overflow-hidden">
      {/* Dashboard Header - Own Navbar */}
      <div className="bg-background border-b border-border sticky top-0 z-50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                onClick={() => setCurrentView("landing")}
                className="flex items-center gap-2"
              >
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${panelMode === 'sme' ? 'from-blue-600 to-indigo-700 shadow-blue-500/20 shadow-lg' : 'from-emerald-500 to-teal-600 shadow-emerald-500/20 shadow-lg'} flex items-center justify-center transition-all duration-500`}>
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="hidden sm:block">
                  <span className="text-xl font-bold">FinAI Pro</span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {formData.empresa || "Mi Empresa"}
                  </Badge>
                </div>
              </button>
            </div>

            {/* Cursor Type Indicator */}
            <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full border transition-all ${panelMode === 'sme' ? 'border-blue-100' : 'border-emerald-100'}`}>
              <div className={`w-3 h-3 rounded-full ${cursorType === 'default' ? 'bg-gray-500' :
                cursorType === 'agent' ? (panelMode === 'sme' ? 'bg-blue-500' : 'bg-emerald-500') :
                  cursorType === 'edit' ? 'bg-blue-500' :
                    cursorType === 'data' ? (panelMode === 'sme' ? 'bg-indigo-500' : 'bg-purple-500') :
                      'bg-orange-500'
                }`} />
              <span className={`text-xs capitalize font-medium ${panelMode === 'sme' ? 'text-blue-600' : 'text-emerald-600'}`}>{cursorType}</span>
            </div>

            <div className="flex items-center gap-3">
              {/* Mode Toggle */}
              <button
                onClick={() => {
                  const next = panelMode === "enterprise" ? "sme" : "enterprise";
                  setPanelMode(next);
                  setActiveTab("agentes");
                }}
                title={panelMode === "enterprise" ? "Cambiar a modo PYME" : "Cambiar a modo Gran Empresa"}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${panelMode === "enterprise"
                  ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 hover:bg-emerald-500/20"
                  : "bg-blue-500/10 text-blue-600 border-blue-500/30 hover:bg-blue-500/20"
                  }`}
              >
                <div className={`w-2 h-2 rounded-full ${panelMode === "enterprise" ? "bg-emerald-500" : "bg-blue-500"}`} />
                {panelMode === "enterprise" ? "Gran Empresa" : "PYME"}
              </button>
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{formData.nombre || "Usuario"}</span>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">3</span>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setCurrentView("landing")} className="gap-2">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} lg:w-64 bg-background border-r border-border transition-all duration-300 overflow-hidden shrink-0`}>
          <div className="p-4 space-y-2">
            {[
              { id: "agentes", icon: Bot, label: "Agentes IA", cursor: "agent", modes: ["enterprise", "sme"] },
              { id: "analiticas", icon: BarChart3, label: panelMode === "sme" ? "Analítica de Tráfico" : "Analíticas", cursor: "data", modes: ["enterprise", "sme"] },
              { id: "leads", icon: Users, label: "Leads / Prospectos", cursor: "default", modes: ["sme"] },
              { id: "citas", icon: Calendar, label: "Gestión de Citas", cursor: "default", modes: ["sme"] },
              { id: "modelos", icon: Brain, label: "Modelos", cursor: "agent", modes: ["enterprise"] },
              { id: "portfolio", icon: Wallet, label: "Mi Portfolio", cursor: "default", modes: ["enterprise"] },
              { id: "clientes", icon: Users, label: "Clientes", cursor: "default", modes: ["enterprise"] },
              { id: "fuentes", icon: Database, label: "Fuentes de Datos", cursor: "data", modes: ["enterprise"] },
              { id: "predicciones", icon: Lightbulb, label: "Predicciones", cursor: "default", modes: ["enterprise"] },
              { id: "tareas", icon: Zap, label: "Tareas Automáticas", cursor: "action", modes: ["enterprise"] },
              { id: "competencia", icon: Eye, label: "Competencia", cursor: "default", modes: ["enterprise"] },
            ].filter(tab => tab.modes.includes(panelMode)).map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setCursorType(tab.cursor as any); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeTab === tab.id
                  ? panelMode === "sme"
                    ? "bg-blue-500/10 text-blue-600 font-medium"
                    : "bg-emerald-500/10 text-emerald-600 font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* SME Quick Call Button */}
          {panelMode === "sme" && (
            <div className="px-4 mt-4">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 border-blue-200 text-blue-600 bg-blue-50/50"
                onClick={() => {
                  setCallingData({ name: "Cualquier Prospecto", phone: "Llamada Saliente..." });
                  setIsCalling(true);
                }}
              >
                <PhoneCall className="w-4 h-4" />
                <span>Hacer llamada rápida</span>
              </Button>
            </div>
          )}

          {/* Quick Stats */}
          <div className="p-4 border-t border-border">
            <h4 className="text-xs font-medium text-muted-foreground mb-3">RESUMEN</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Agentes Activos</span>
                <Badge className="bg-emerald-500">{userAgents.filter(a => a.active).length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Clientes</span>
                <Badge variant="outline">{clients.length}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Tareas Hoy</span>
                <span className="font-medium">{userAgents.reduce((sum: number, a) => sum + a.stats.tasks, 0)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">ROI Estimado</span>
                <span className="font-medium text-emerald-500">+34%</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Panel */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* Content Area */}
            <ResizablePanel defaultSize={70} minSize={40} className="overflow-hidden">
              <div className="h-full overflow-y-auto p-6">
                {/* Tab: Agentes - PYME MODE */}
                {activeTab === "agentes" && panelMode === "sme" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">Agentes para tu Negocio</h2>
                        <p className="text-xs text-muted-foreground">Asistentes IA especializados en PYMEs y autónomos</p>
                      </div>
                      <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20" onClick={() => { setEditingSmeAgentIndex(null); setNewSmeAgent({ name: "", type: "secretaria", tasks: [] }); setShowSmeAddAgent(true); }}><Plus className="w-4 h-4" /> Nuevo Agente</Button>
                    </div>

                    {/* Add SME Agent Modal */}
                    <AnimatePresence>
                      {showSmeAddAgent && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-blue-500/20">
                            <div className="flex items-center justify-between mb-6">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                                  <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                  <h3 className="text-lg font-bold text-blue-600">{editingSmeAgentIndex !== null ? "Editar Agente Pyme" : "Nuevo Agente para Pyme"}</h3>
                                  <p className="text-xs text-muted-foreground">{editingSmeAgentIndex !== null ? "Modifica las funciones de tu asistente" : "Versión simplificada para tu negocio"}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm" onClick={() => setShowSmeAddAgent(false)}><X className="w-4 h-4" /></Button>
                            </div>

                            <div className="space-y-6">
                              <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label className="text-sm font-semibold">Nombre del Agente</Label>
                                  <Input
                                    value={newSmeAgent.name}
                                    onChange={(e) => setNewSmeAgent({ ...newSmeAgent, name: e.target.value })}
                                    placeholder="Ej: Asistente Ventas"
                                    className="h-10 border-blue-100"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-semibold">Tipo de Especialidad</Label>
                                  <Select value={newSmeAgent.type} onValueChange={(v) => setNewSmeAgent({ ...newSmeAgent, type: v, tasks: [] })}>
                                    <SelectTrigger className="h-10 border-blue-100"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {SME_AGENT_TYPES.map(t => {
                                        const TypeIcon = t.icon;
                                        return (
                                          <SelectItem key={t.id} value={t.id}>
                                            <div className="flex items-center gap-2">
                                              <TypeIcon className="w-4 h-4" />
                                              <span>{t.name}</span>
                                            </div>
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <Label className="text-sm font-semibold">Tareas concretas (15 disponibles)</Label>
                                  <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider">Cero configuración técnica</span>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-blue-50/30 p-4 rounded-xl border border-blue-100">
                                  {(() => {
                                    const type = SME_AGENT_TYPES.find(t => t.id === newSmeAgent.type);
                                    return type?.tasks.map(task => (
                                      <div key={task} className="flex items-center space-x-2">
                                        <Checkbox
                                          id={task}
                                          checked={newSmeAgent.tasks.includes(task)}
                                          onCheckedChange={(checked) => {
                                            const tasks = checked
                                              ? [...newSmeAgent.tasks, task]
                                              : newSmeAgent.tasks.filter(t => t !== task);
                                            setNewSmeAgent({ ...newSmeAgent, tasks });
                                          }}
                                        />
                                        <label htmlFor={task} className="text-xs cursor-pointer select-none">{task}</label>
                                      </div>
                                    ));
                                  })()}
                                </div>
                                <p className="text-[10px] text-muted-foreground text-center">Selecciona las tareas que quieres que este agente aprenda a realizar.</p>
                              </div>

                              <div className="flex gap-3">
                                <Button variant="outline" className="flex-1 h-11" onClick={() => setShowSmeAddAgent(false)}>Cancelar</Button>
                                <Button className="flex-1 h-11 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/20" onClick={addSmeAgent}>
                                  {editingSmeAgentIndex !== null ? "Guardar Cambios" : "Activar Agente IA"}
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {smeAgents.map((agent, index) => (
                      <Card key={`${agent.name}-${index}`} className="hover:shadow-md transition-all">
                        <CardContent className="p-5">
                          <div className="flex items-start gap-4">
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${agent.color} flex items-center justify-center text-2xl shrink-0 shadow-lg`}>
                              {agent.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div>
                                  <h3 className="font-bold text-base">{agent.name}</h3>
                                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${agent.badge}`}>{agent.role}</span>
                                </div>
                                <Badge variant={agent.status === "activo" ? "default" : "secondary"} className={agent.status === "activo" ? "bg-emerald-500 text-white shrink-0" : "shrink-0"}>
                                  {agent.status === "activo" ? "● Activo" : "⏸ Pausado"}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2 mb-3">{agent.desc}</p>

                              {/* Stats row */}
                              <div className="grid grid-cols-3 gap-2 mb-3">
                                {agent.stats.map((s) => (
                                  <div key={s.label} className="bg-muted/40 rounded-lg p-2 text-center">
                                    <div className="text-base font-bold">{s.value}</div>
                                    <div className="text-[10px] text-muted-foreground">{s.label}</div>
                                  </div>
                                ))}
                              </div>

                              {/* Capabilities */}
                              <div className="flex flex-wrap gap-1.5">
                                {agent.capabilities.map((cap) => (
                                  <span key={cap} className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{cap}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4 border-t pt-3">
                            <Button size="sm" className="gap-1 bg-blue-600 hover:bg-blue-700 text-xs shadow-sm" onClick={() => {
                              setSelectedAgent(`agent-sme-${index + 1}`);
                              if (chatFloating) setChatWidth(450);
                              else { /* Maybe some animation here */ }
                            }}>
                              <MessageCircle className="w-3 h-3" /> Chatear
                            </Button>
                            {agent.role === "Secretaria Virtual" && (
                              <Button size="sm" variant="outline" className="text-xs gap-1 border-blue-200 text-blue-600 hover:bg-blue-50" onClick={() => {
                                setCallingData({ name: "Cualquier Prospecto", phone: "Outbound AI Call..." });
                                setIsCalling(true);
                              }}>
                                <PhoneCall className="w-3 h-3" /> Forzar Llamada
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="text-xs gap-1 border-slate-200 hover:bg-slate-100" onClick={() => {
                              setEditingSmeAgentIndex(index);
                              const typeFound = SME_AGENT_TYPES.find(t => t.name === agent.role);
                              setNewSmeAgent({ name: agent.name, type: typeFound?.id || "secretaria", tasks: agent.capabilities });
                              setShowSmeAddAgent(true);
                            }}><Settings className="w-3 h-3" /> Configurar</Button>
                            {agent.status === "activo"
                              ? <Button size="sm" variant="ghost" className="text-xs gap-1 ml-auto text-muted-foreground hover:text-red-500"><Pause className="w-3 h-3" /> Pausar</Button>
                              : <Button size="sm" variant="ghost" className="text-xs gap-1 ml-auto text-blue-600 hover:bg-blue-50"><Play className="w-3 h-3" /> Activar</Button>
                            }
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Tab: Agentes - ENTERPRISE MODE */}
                {activeTab === "agentes" && panelMode === "enterprise" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">Mis Agentes</h2>
                        <p className="text-xs text-muted-foreground">{userAgents.length} agentes • {userAgents.filter((a: any) => a.active).length} activos</p>
                      </div>
                      <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600" onClick={() => { setEditingAgent(null); setNewAgent({ name: "", role: "inversor", model: "Claude Sonnet 4.6", temperatura: 0.7, maxTokens: 4096, creatividad: "media", prompt: "", connections: [], dailyActions: 100 }); setShowAddAgent(true); }}>
                        <Plus className="w-4 h-4" /> Nuevo
                      </Button>
                    </div>

                    {/* Add/Edit Agent Modal */}
                    <AnimatePresence>
                      {showAddAgent && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">{editingAgent ? "Editar Agente" : "Crear Nuevo Agente"}</h3>
                              <Button variant="ghost" size="sm" onClick={() => { setShowAddAgent(false); setEditingAgent(null); }}><X className="w-4 h-4" /></Button>
                            </div>

                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs">Nombre</Label>
                                  <Input value={newAgent.name} onChange={(e) => setNewAgent({ ...newAgent, name: e.target.value })} placeholder="FinBot-2" className="mt-1 h-9" />
                                </div>
                                <div>
                                  <Label className="text-xs">Rol del Agente</Label>
                                  <Select value={newAgent.role} onValueChange={(v) => setNewAgent({ ...newAgent, role: v })}>
                                    <SelectTrigger className="mt-1 h-9"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      {AGENT_ROLES.map((r: any) => {
                                        const IconComponent = r.icon;
                                        return (
                                          <SelectItem key={r.id} value={r.id}>
                                            <div className="flex items-center gap-2">
                                              <IconComponent className="w-4 h-4 text-emerald-500" />
                                              <span>{r.name}</span>
                                            </div>
                                          </SelectItem>
                                        );
                                      })}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              {/* Role Preview */}
                              <div className="p-3 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
                                <div className="flex items-center gap-3">
                                  {(() => {
                                    const selectedRole = AGENT_ROLES.find((r: any) => r.id === newAgent.role);
                                    if (!selectedRole) return null;
                                    const SelectedIcon = selectedRole.icon;
                                    return (
                                      <>
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-500/30">
                                          <SelectedIcon className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <div>
                                          <div className="font-medium text-sm">{selectedRole.name}</div>
                                          <div className="text-xs text-muted-foreground">{selectedRole.description}</div>
                                        </div>
                                      </>
                                    );
                                  })()}
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs">Modelo IA</Label>
                                  <Select value={newAgent.model} onValueChange={(v) => setNewAgent({ ...newAgent, model: v })}>
                                    <SelectTrigger className="mt-1 h-9"><SelectValue /></SelectTrigger>
                                    <SelectContent>{AI_MODELS.map((m: any) => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
                                  </Select>
                                </div>
                                <div>
                                  <Label className="text-xs">Acciones/día: {newAgent.dailyActions}</Label>
                                  <Input type="number" value={newAgent.dailyActions} onChange={(e) => setNewAgent({ ...newAgent, dailyActions: parseInt(e.target.value) || 100 })} className="mt-1 h-9" />
                                </div>
                              </div>

                              <div>
                                <Label className="text-xs">Prompt del Sistema</Label>
                                <Textarea value={newAgent.prompt} onChange={(e) => setNewAgent({ ...newAgent, prompt: e.target.value })} placeholder="Define el comportamiento del agente..." className="mt-1 h-20 text-xs" />
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs">Temperatura: {newAgent.temperatura}</Label>
                                  <Slider value={[newAgent.temperatura]} onValueChange={(v) => setNewAgent({ ...newAgent, temperatura: v[0] })} min={0} max={1} step={0.1} className="mt-2" />
                                </div>
                                <div>
                                  <Label className="text-xs">Max Tokens</Label>
                                  <Select value={newAgent.maxTokens.toString()} onValueChange={(v) => setNewAgent({ ...newAgent, maxTokens: parseInt(v) })}>
                                    <SelectTrigger className="mt-1 h-9"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="2048">2,048</SelectItem>
                                      <SelectItem value="4096">4,096</SelectItem>
                                      <SelectItem value="8192">8,192</SelectItem>
                                      <SelectItem value="16384">16,384</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div>
                                <Label className="text-xs">Conexiones a Servicios</Label>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {MCP_INTEGRATIONS.slice(0, 10).map((tool: any) => (
                                    <Badge key={tool.id} variant={newAgent.connections.includes(tool.id) ? "default" : "outline"}
                                      className={`cursor-pointer text-[10px] ${newAgent.connections.includes(tool.id) ? "bg-emerald-500" : ""}`}
                                      onClick={() => {
                                        const conns = newAgent.connections.includes(tool.id)
                                          ? newAgent.connections.filter((c: string) => c !== tool.id)
                                          : [...newAgent.connections, tool.id];
                                        setNewAgent({ ...newAgent, connections: conns });
                                      }}>{tool.name}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                              <Button variant="outline" className="flex-1" onClick={() => { setShowAddAgent(false); setEditingAgent(null); }}>Cancelar</Button>
                              <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600" onClick={editingAgent ? updateAgent : addNewAgent}>{editingAgent ? "Guardar" : "Crear"}</Button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Agent Cards - Professional Column View */}
                    <div className="space-y-3">
                      {/* Header Stats */}
                      <div className="grid grid-cols-4 gap-3 mb-4">
                        <Card className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                                <Bot className="w-4 h-4 text-emerald-500" />
                              </div>
                              <div>
                                <div className="text-lg font-bold">{userAgents.length}</div>
                                <div className="text-[10px] text-muted-foreground">Total Agentes</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-teal-500/10 to-cyan-500/10 border-teal-500/20">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">
                                <Activity className="w-4 h-4 text-teal-500" />
                              </div>
                              <div>
                                <div className="text-lg font-bold">{userAgents.filter((a: any) => a.active).length}</div>
                                <div className="text-[10px] text-muted-foreground">Activos</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border-purple-500/20">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-purple-500" />
                              </div>
                              <div>
                                <div className="text-lg font-bold">{userAgents.reduce((acc: number, a: any) => acc + a.stats.tasks, 0).toLocaleString()}</div>
                                <div className="text-[10px] text-muted-foreground">Tareas</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                          <CardContent className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                                <Star className="w-4 h-4 text-yellow-500" />
                              </div>
                              <div>
                                <div className="text-lg font-bold">{(userAgents.reduce((acc: number, a: any) => acc + a.stats.satisfaction, 0) / userAgents.length).toFixed(1)}</div>
                                <div className="text-[10px] text-muted-foreground">Satisfacción</div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Agents Table */}
                      <Card className="overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full">
                            <thead>
                              <tr className="bg-muted/50 border-b">
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Agente</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Modelo</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Estado</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Clonación</th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Rendimiento</th>
                                <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground">Acciones</th>
                              </tr>
                            </thead>
                            <tbody>
                              {userAgents.map((agent: any, i: number) => {
                                const roleInfo = getRoleInfo(agent.role);
                                const RoleIcon = roleInfo.icon;
                                const clonacion = Math.round(clonacionScores[i] || 0);
                                return (
                                  <tr key={agent.id} className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${!agent.active ? 'opacity-60' : ''}`}>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-3">
                                        {/* Role Icon */}
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${agent.active
                                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                                          : 'bg-gradient-to-br from-gray-400 to-gray-500'
                                          }`}>
                                          <RoleIcon className="w-5 h-5 text-white" />
                                        </div>
                                        {/* Bot Icon + Name */}
                                        <div className="flex items-center gap-2">
                                          <div className={`w-7 h-7 rounded-full flex items-center justify-center ${agent.active ? 'bg-emerald-500/20' : 'bg-gray-400/20'
                                            }`}>
                                            <Bot className={`w-4 h-4 ${agent.active ? 'text-emerald-500' : 'text-gray-500'}`} />
                                          </div>
                                          <div>
                                            <div className="font-medium text-sm">{agent.name}</div>
                                            <div className="text-[10px] text-muted-foreground">{roleInfo.name}</div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3">
                                      <Badge variant="outline" className="text-[10px] font-mono">{agent.model.split(' ')[0]}</Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                      <Badge className={`text-[10px] ${agent.active ? 'bg-emerald-500' : 'bg-yellow-500'}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full mr-1 ${agent.active ? 'bg-white' : 'bg-white animate-pulse'}`} />
                                        {agent.active ? 'Activo' : 'Aprendiendo'}
                                      </Badge>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                                          <div
                                            className={`h-full rounded-full ${clonacion >= 90 ? 'bg-emerald-500' : clonacion >= 80 ? 'bg-teal-500' : 'bg-yellow-500'}`}
                                            style={{ width: `${clonacion}%` }}
                                          />
                                        </div>
                                        <span className={`text-xs font-medium ${clonacion >= 90 ? 'text-emerald-500' : clonacion >= 80 ? 'text-teal-500' : 'text-yellow-500'}`}>
                                          {clonacion}%
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center gap-3 text-[10px]">
                                        <span className="flex items-center gap-1 text-emerald-500">
                                          <Check className="w-3 h-3" />{agent.stats.success}%
                                        </span>
                                        <span className="flex items-center gap-1 text-teal-500">
                                          <Clock className="w-3 h-3" />{agent.stats.avgTime}
                                        </span>
                                        <span className="flex items-center gap-1 text-yellow-500">
                                          <Star className="w-3 h-3" />{agent.stats.satisfaction}
                                        </span>
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                          {agent.stats.tasks} tareas
                                        </span>
                                      </div>
                                    </td>
                                    <td className="px-4 py-3">
                                      <div className="flex items-center justify-end gap-1">
                                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => {
                                          const a = userAgents.find((ag: any) => ag.id === agent.id);
                                          if (a) {
                                            setNewAgent({ name: a.name, role: a.role, model: a.model, temperatura: a.config.temperatura, maxTokens: a.config.maxTokens, creatividad: a.config.creatividad, prompt: a.prompt, connections: a.connections, dailyActions: a.dailyActions });
                                            setEditingAgent(a.id);
                                            setShowAddAgent(true);
                                          }
                                        }} title="Editar"><Edit className="w-3.5 h-3.5" /></Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-emerald-500" onClick={() => setSelectedAgent(agent.id)} title="Chat"><MessageSquare className="w-3.5 h-3.5" /></Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-blue-500" onClick={() => { setSelectedAgentHistory(agent); setShowAgentHistory(true); }} title="Historial"><FileText className="w-3.5 h-3.5" /></Button>
                                        <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600" onClick={() => deleteAgent(agent.id)} title="Eliminar"><Trash2 className="w-3.5 h-3.5" /></Button>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </Card>
                    </div>

                    {/* Distribución por Área */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Bot className="w-4 h-4 text-emerald-500" />
                          Distribución de Agentes por Área
                        </CardTitle>
                        <CardDescription>Ajusta la asignación de tus agentes digitales</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {AGENT_ROLES.slice(0, 5).map((role: any, i: number) => {
                            // Static values that don't change on render
                            const staticValues = [
                              { count: 10, clonacion: 92 },
                              { count: 8, clonacion: 87 },
                              { count: 5, clonacion: 91 },
                              { count: 3, clonacion: 78 },
                              { count: 2, clonacion: 85 },
                            ];
                            const { count, clonacion: clonacionAvg } = staticValues[i] || { count: 1, clonacion: 75 };
                            const IconComponent = role.icon;
                            return (
                              <div key={role.id} className="space-y-1">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-2">
                                    <IconComponent className="w-4 h-4 text-emerald-500" />
                                    <span className="text-sm font-medium">{role.name}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span>Clonación: {clonacionAvg}%</span>
                                    <span className="font-medium text-foreground">{count} agentes</span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Progress value={(count / 10) * 100} className="h-2 flex-1" />
                                  <Progress value={clonacionAvg} className="h-2 w-16" />
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-4 p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Sparkles className="w-4 h-4 text-emerald-500" />
                            <span className="font-medium text-sm">Sugerencia IA</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            Basado en el análisis de ROI, se recomienda aumentar los agentes de Inversiones. ROI potencial: +15%.
                          </p>
                          <Button size="sm" className="mt-2 h-7 text-xs bg-emerald-500 hover:bg-emerald-600">
                            Aplicar recomendación
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Tab: Modelos */}
                {activeTab === "modelos" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">Modelos de ML</h2>
                        <p className="text-xs text-muted-foreground">Entrena y gestiona modelos de machine learning</p>
                      </div>
                      <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600" onClick={() => setShowAddModel(true)}>
                        <Plus className="w-4 h-4" /> Nuevo Modelo
                      </Button>
                    </div>

                    {/* Add Model Modal */}
                    <AnimatePresence>
                      {showAddModel && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background rounded-2xl p-6 max-w-md w-full">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold">Nuevo Modelo de ML</h3>
                              <Button variant="ghost" size="sm" onClick={() => setShowAddModel(false)}><X className="w-4 h-4" /></Button>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <Label className="text-xs">Nombre del Modelo</Label>
                                <Input value={newModel.name} onChange={(e) => setNewModel({ ...newModel, name: e.target.value })} placeholder="Predictor de Clientes v2" className="mt-1 h-9" />
                              </div>

                              <div>
                                <Label className="text-xs">Tipo de Red Neuronal</Label>
                                <Select value={newModel.type} onValueChange={(v) => setNewModel({ ...newModel, type: v })}>
                                  <SelectTrigger className="mt-1 h-9"><SelectValue /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="MLP">MLP - Datos tabulares</SelectItem>
                                    <SelectItem value="CNN">CNN - Imágenes</SelectItem>
                                    <SelectItem value="RNN">RNN - Secuencias clásicas</SelectItem>
                                    <SelectItem value="LSTM">LSTM - Series temporales</SelectItem>
                                    <SelectItem value="Transformer">Transformer - Texto/LLM/Visión</SelectItem>
                                    <SelectItem value="GAN">GAN - Generación realista</SelectItem>
                                    <SelectItem value="Autoencoder">Autoencoder - Compresión</SelectItem>
                                    <SelectItem value="GNN">GNN - Grafos</SelectItem>
                                    <SelectItem value="Diffusion">Diffusion - Generación</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs">Epochs</Label>
                                  <Input type="number" value={newModel.epochs} onChange={(e) => setNewModel({ ...newModel, epochs: parseInt(e.target.value) || 100 })} className="mt-1 h-9" />
                                </div>
                                <div>
                                  <Label className="text-xs">Optimizador</Label>
                                  <Select value={newModel.optimizer} onValueChange={(v) => setNewModel({ ...newModel, optimizer: v })}>
                                    <SelectTrigger className="mt-1 h-9"><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Adam">Adam</SelectItem>
                                      <SelectItem value="AdamW">AdamW</SelectItem>
                                      <SelectItem value="SGD">SGD</SelectItem>
                                      <SelectItem value="RMSprop">RMSprop</SelectItem>
                                      <SelectItem value="Adagrad">Adagrad</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-3">
                                <div>
                                  <Label className="text-xs">Capas de Entrada</Label>
                                  <Input type="number" value={newModel.inputLayers} onChange={(e) => setNewModel({ ...newModel, inputLayers: parseInt(e.target.value) || 64 })} className="mt-1 h-9" />
                                </div>
                                <div>
                                  <Label className="text-xs">Capas de Salida</Label>
                                  <Input type="number" value={newModel.outputLayers} onChange={(e) => setNewModel({ ...newModel, outputLayers: parseInt(e.target.value) || 1 })} className="mt-1 h-9" />
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-2 mt-4">
                              <Button variant="outline" className="flex-1" onClick={() => setShowAddModel(false)}>Cancelar</Button>
                              <Button className="flex-1 bg-emerald-500 hover:bg-emerald-600" onClick={addNewModel}>Crear</Button>
                            </div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Models Grid with Charts */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      {models.map((model: any) => {
                        // Generate loss data for this model
                        const lossData = Array.from({ length: 20 }, (_, i) => ({
                          epoch: i * 5,
                          loss: Math.exp(-i * 0.1) * 2 + 0.1 + Math.random() * 0.1
                        }));

                        return (
                          <Card key={model.id} className="hover:border-purple-500/50 transition-colors overflow-hidden">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${model.status === "trained" ? "bg-emerald-500/20" :
                                    model.status === "training" ? "bg-yellow-500/20" : "bg-muted"
                                    }`}>
                                    <Brain className={`w-5 h-5 ${model.status === "trained" ? "text-emerald-500" :
                                      model.status === "training" ? "text-yellow-500" : "text-muted-foreground"
                                      }`} />
                                  </div>
                                  <div>
                                    <div className="font-medium">{model.name}</div>
                                    <Badge variant="outline" className="text-[10px]">{model.type}</Badge>
                                  </div>
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => deleteModel(model.id)}>
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>

                              {/* Loss Chart */}
                              <div className="mb-3">
                                <div className="text-[10px] text-muted-foreground mb-1 flex items-center gap-1">
                                  <TrendingDown className="w-3 h-3" /> Curva de Pérdida
                                </div>
                                <div className="h-16 bg-muted/30 rounded-lg p-1 relative">
                                  <svg viewBox="0 0 100 40" className="w-full h-full">
                                    <polyline
                                      fill="none"
                                      stroke="#ef4444"
                                      strokeWidth="1.5"
                                      points={lossData.map((d, i) => `${i * 5},${35 - (1.5 / d.loss) * 30}`).join(' ')}
                                    />
                                  </svg>
                                </div>
                              </div>

                              {/* Accuracy Gauge */}
                              <div className="mb-3">
                                <div className="text-[10px] text-muted-foreground mb-1">Accuracy</div>
                                <div className="flex justify-center">
                                  <svg viewBox="0 0 120 70" className="w-32 h-20">
                                    {/* Background arc */}
                                    <path
                                      d="M 10 60 A 50 50 0 0 1 110 60"
                                      fill="none"
                                      stroke="#27272a"
                                      strokeWidth="10"
                                      strokeLinecap="round"
                                    />
                                    {/* Colored arc based on accuracy */}
                                    <path
                                      d="M 10 60 A 50 50 0 0 1 110 60"
                                      fill="none"
                                      stroke={model.accuracy >= 90 ? "#10b981" : model.accuracy >= 70 ? "#eab308" : "#ef4444"}
                                      strokeWidth="10"
                                      strokeLinecap="round"
                                      strokeDasharray={`${(model.accuracy || 0) * 1.57} 157`}
                                    />
                                    {/* Tick marks */}
                                    {[0, 25, 50, 75, 100].map((tick, i) => (
                                      <g key={i}>
                                        <text x={10 + i * 25} y="68" textAnchor="middle" className="text-[6px]" fill="#71717a">{tick}</text>
                                      </g>
                                    ))}
                                    {/* Needle */}
                                    <g transform={`rotate(${((model.accuracy || 0) / 100) * 180 - 90} 60 60)`}>
                                      <line x1="60" y1="60" x2="60" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round" />
                                      <circle cx="60" cy="60" r="4" fill="white" />
                                    </g>
                                    {/* Center value */}
                                    <text x="60" y="50" textAnchor="middle" className="text-sm font-bold" fill="white" fontSize="14">
                                      {model.accuracy || 0}%
                                    </text>
                                  </svg>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                <div className="p-2 bg-muted/50 rounded">
                                  <div className="text-muted-foreground">Epochs</div>
                                  <div className="font-medium">{model.epochs}</div>
                                </div>
                                <div className="p-2 bg-muted/50 rounded">
                                  <div className="text-muted-foreground">Optimizador</div>
                                  <div className="font-medium">{model.optimizer}</div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <Badge variant="secondary" className={`text-[10px] ${model.status === "trained" ? "bg-emerald-500/10 text-emerald-500" :
                                  model.status === "training" ? "bg-yellow-500/10 text-yellow-500" : ""
                                  }`}>
                                  {model.status === "trained" ? "Entrenado" : model.status === "training" ? "Entrenando..." : "Pendiente"}
                                </Badge>
                                <Button
                                  size="sm"
                                  className={`h-7 text-xs ${model.status === "training" ? "bg-yellow-500" : "bg-purple-500 hover:bg-purple-600"}`}
                                  disabled={model.status === "training"}
                                  onClick={() => trainModel(model.id)}
                                >
                                  {model.status === "training" ? (
                                    <><RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Training...</>
                                  ) : (
                                    <><Zap className="w-3 h-3 mr-1" /> Entrenar</>
                                  )}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Tab: Portfolio */}
                {activeTab === "portfolio" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">Mi Portfolio</h2>
                        <p className="text-xs text-muted-foreground">Gestiona tu portfolio de empresas</p>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mr-1 animate-pulse" />Live
                      </Badge>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid sm:grid-cols-4 gap-4">
                      <Card><CardContent className="p-4"><div className="text-2xl font-bold text-emerald-500">€2.4M</div><div className="text-sm text-muted-foreground">Valor Portfolio</div></CardContent></Card>
                      <Card><CardContent className="p-4"><div className="text-2xl font-bold">4</div><div className="text-sm text-muted-foreground">Empresas Activas</div></CardContent></Card>
                      <Card><CardContent className="p-4"><div className="text-2xl font-bold text-teal-500">28</div><div className="text-sm text-muted-foreground">Agentes Totales</div></CardContent></Card>
                      <Card><CardContent className="p-4"><div className="text-2xl font-bold text-cyan-500">+23%</div><div className="text-sm text-muted-foreground">ROI Promedio</div></CardContent></Card>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-6">
                      {/* Evolution Chart */}
                      <Card>
                        <CardHeader><CardTitle className="text-base">Evolución del Portfolio</CardTitle></CardHeader>
                        <CardContent>
                          <ChartContainer config={{ valor: { label: "Valor", color: "#10b981" }, roi: { label: "ROI %", color: "#14b8a6" } }} className="h-64">
                            <AreaChart data={[
                              { name: "Ene", valor: 100, roi: 0 },
                              { name: "Feb", valor: 105, roi: 5 },
                              { name: "Mar", valor: 112, roi: 12 },
                              { name: "Abr", valor: 118, roi: 18 },
                              { name: "May", valor: 125, roi: 25 },
                              { name: "Jun", valor: 134, roi: 34 },
                            ]}>
                              <XAxis dataKey="name" fontSize={10} />
                              <YAxis fontSize={10} />
                              <ChartTooltip content={<ChartTooltipContent />} />
                              <Area type="monotone" dataKey="valor" stroke="#10b981" fill="#10b981" fillOpacity={0.2} />
                            </AreaChart>
                          </ChartContainer>
                        </CardContent>
                      </Card>

                      {/* Distribution */}
                      <Card>
                        <CardHeader><CardTitle className="text-base">Distribución por Empresa</CardTitle></CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {[
                              { name: "FinTech Cobros S.L.", participacion: 25, agentes: 12, roi: "+34%", tendencia: "up", color: "#10b981" },
                              { name: "CreditCards Pro", participacion: 18, agentes: 8, roi: "+22%", tendencia: "up", color: "#14b8a6" },
                              { name: "InvestFund Management", participacion: 15, agentes: 5, roi: "+41%", tendencia: "up", color: "#06b6d4" },
                              { name: "DebtRecovery AI", participacion: 10, agentes: 3, roi: "-5%", tendencia: "down", color: "#f59e0b" },
                            ].map((empresa, i) => (
                              <div key={i} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: empresa.color }} />
                                  <div>
                                    <div className="font-medium text-sm">{empresa.name}</div>
                                    <div className="text-xs text-muted-foreground">{empresa.agentes} agentes</div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-right">
                                    <div className="text-sm font-medium">{empresa.participacion}%</div>
                                    <div className="text-xs text-muted-foreground">participación</div>
                                  </div>
                                  <div className={`flex items-center gap-1 ${empresa.tendencia === "up" ? "text-emerald-500" : "text-red-500"}`}>
                                    {empresa.tendencia === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    <span className="text-sm font-medium">{empresa.roi}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Suggestion */}
                    <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-emerald-500" />
                          <span className="font-medium">Sugerencia de Rebalanceo</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Basado en el análisis de ROI, InvestFund muestra mejor rendimiento.
                          ¿Deseas aumentar la asignación de agentes?
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">Aplicar</Button>
                          <Button size="sm" variant="outline">Ver Detalles</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Tab: Leads / Prospectos - SME simple mode */}
                {activeTab === "leads" && panelMode === "sme" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">Leads y Prospectos</h2>
                        <p className="text-xs text-muted-foreground">{smeProspects.length} contactos potenciales importados</p>
                      </div>
                      <Button size="sm" className="gap-1 bg-blue-500 hover:bg-blue-600"><Plus className="w-4 h-4" /> Añadir Lead</Button>
                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-4 gap-3">
                      {[
                        { label: "Total", value: smeProspects.length.toString(), color: "text-foreground" },
                        { label: "Pendientes", value: smeProspects.filter(p => p.status === 'pendiente').length.toString(), color: "text-yellow-600" },
                        { label: "Contactados", value: smeProspects.filter(p => p.status === 'contactado').length.toString(), color: "text-blue-600" },
                        { label: "Citas", value: smeProspects.filter(p => p.status === 'cita').length.toString(), color: "text-emerald-600" },
                      ].map((s) => (
                        <Card key={s.label} className="p-3 text-center border-blue-50 shadow-sm">
                          <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                          <div className="text-[11px] text-muted-foreground">{s.label}</div>
                        </Card>
                      ))}
                    </div>

                    {/* Prospect list */}
                    <div className="space-y-3">
                      {smeProspects.map((p) => (
                        <Card key={p.id} className="hover:shadow-md transition-all border-blue-100">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                {p.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className="font-semibold">{p.name}</span>
                                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${p.status === "pendiente" ? "bg-yellow-100 text-yellow-700" :
                                    p.status === "contactado" ? "bg-blue-100 text-blue-700" :
                                      p.status === "cita" ? "bg-emerald-100 text-emerald-700" :
                                        "bg-gray-100 text-gray-500"
                                    }`}>{p.status}</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Phone className="w-3 h-3" />{p.phone}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <Button size="sm" className="gap-1 bg-blue-500 hover:bg-blue-600 h-8 text-xs" onClick={() => {
                                  setCallingData({ name: p.name, phone: p.phone });
                                  setIsCalling(true);
                                }}>
                                  <Phone className="w-3 h-3" /> Llamar
                                </Button>
                                <Button size="sm" variant="outline" className="gap-1 h-8 text-xs border-blue-200 text-blue-600 hover:bg-blue-50" onClick={() => {
                                  setNewSmeAppointment({ ...newSmeAppointment, client: p.name });
                                  setShowSmeAppointmentModal(true);
                                }}>
                                  <Calendar className="w-3 h-3" /> Cita
                                </Button>
                                <Button size="sm" variant="outline" className="gap-1 h-8 text-xs border-blue-200 text-blue-600 hover:bg-blue-50" onClick={() => {
                                  setEmailTo(p.email);
                                  setEmailContent({ subject: `Consulta de ${formData.empresa || 'FinAI Pro'}`, body: `Hola ${p.name},\n\n` });
                                  setShowEmailModal(true);
                                }}>
                                  <Mail className="w-3 h-3" /> Email
                                </Button>
                                <Button size="sm" variant="ghost" className="gap-1 h-8 text-xs text-blue-500 hover:bg-blue-50" onClick={() => {
                                  setSelectedAgent("agent-sme-2"); // Marco for leads
                                  if (chatFloating) setChatWidth(450);
                                }}>
                                  <MessageCircle className="w-3 h-3" /> Chat
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Sofía CTA */}
                    <Card className="bg-gradient-to-r from-pink-500/10 to-rose-500/10 border-pink-300/30">
                      <CardContent className="p-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-xl shrink-0">📞</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Sofía puede llamar a estos prospectos automáticamente</p>
                          <p className="text-xs text-muted-foreground">Deja que tu secretaria virtual gestione las llamadas de prospección</p>
                        </div>
                        <Button size="sm" className="bg-pink-500 hover:bg-pink-600 shrink-0 gap-1" onClick={() => {
                          setCallingData({ name: "Ronda de Prospectos", phone: "Llamadas en Lote..." });
                          setIsCalling(true);
                        }}><Phone className="w-3 h-3" /> Delegar a Sofía</Button>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Tab: Gestión de Citas - SME mode */}
                {activeTab === "citas" && panelMode === "sme" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">Gestión de Citas</h2>
                        <p className="text-xs text-muted-foreground">Calendario de reuniones y servicios</p>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 gap-1" onClick={() => {
                        setNewSmeAppointment({ client: "", date: "2026-03-04", time: "10:00", type: "Consulta" });
                        setShowSmeAppointmentModal(true);
                      }}>
                        <Plus className="w-4 h-4" /> Nueva Cita
                      </Button>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6">
                      {/* Interactive Calendar Placeholder */}
                      <Card className="lg:col-span-2 border-blue-100 shadow-sm overflow-hidden">
                        <CardHeader className="bg-blue-50/50 border-b pb-3">
                          <div className="flex items-center justify-between font-bold text-blue-800">
                            <span>Marzo 2026</span>
                            <div className="flex gap-1">
                              <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="w-4 h-4" /></Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="grid grid-cols-7 border-b text-[10px] sm:text-xs font-bold text-center uppercase tracking-wider py-2 bg-slate-50 text-slate-500">
                            {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(d => <div key={d}>{d}</div>)}
                          </div>
                          <div className="grid grid-cols-7 text-center text-xs auto-rows-fr">
                            {Array.from({ length: 31 }).map((_, i) => {
                              const day = i + 1;
                              const hasApts = smeAppointments.filter(a => a.date === `2026-03-${day.toString().padStart(2, '0')}`);
                              return (
                                <div key={i} className={`p-2 border-r border-b min-h-[90px] flex flex-col items-start transition-colors hover:bg-blue-50/30 ${day === 4 ? 'bg-blue-50' : ''}`}>
                                  <span className={`w-6 h-6 flex items-center justify-center rounded-full mb-1 ${day === 4 ? 'bg-blue-600 text-white font-bold' : ''}`}>{day}</span>
                                  <div className="w-full space-y-1">
                                    {hasApts.map(apt => (
                                      <div key={apt.id} className="text-[9px] bg-white border border-blue-200 text-blue-700 px-1 py-0.5 rounded truncate shadow-sm">
                                        {apt.time} - {apt.client}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Agenda of the day */}
                      <Card className="border-blue-100 shadow-sm flex flex-col">
                        <CardHeader className="bg-slate-50 border-b">
                          <CardTitle className="text-sm">Agenda de Hoy</CardTitle>
                          <CardDescription className="text-[10px]">Jueves, 4 de Marzo</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 overflow-y-auto max-h-[500px]">
                          <div className="divide-y">
                            {smeAppointments.filter(a => a.date === "2026-03-04").sort((a, b) => a.time.localeCompare(b.time)).map((apt) => (
                              <div key={apt.id} className="p-3 hover:bg-blue-50 transition-colors flex gap-3">
                                <div className="text-[10px] font-bold text-slate-400 w-10 text-right pt-1">{apt.time}</div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold truncate">{apt.client}</div>
                                  <div className="flex items-center gap-1.5 mt-1">
                                    <Badge variant="outline" className="text-[9px] h-4 border-blue-200 text-blue-600">{apt.type}</Badge>
                                    <span className={`w-1.5 h-1.5 rounded-full ${apt.status === 'confirmed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                    <span className="text-[10px] text-muted-foreground capitalize">{apt.status}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter className="p-3 border-t bg-blue-50/20">
                          <Button variant="outline" size="sm" className="w-full text-xs gap-1 border-blue-200 text-blue-700" onClick={() => {
                            setCallingData({ name: "Próxima Cita", phone: "Confirmando asistencia..." });
                            setIsCalling(true);
                          }}>
                            <Bot className="w-3 h-3" /> Dejar que Sofía confirme citas
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Calling Overlay */}
                <AnimatePresence>
                  {isCalling && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 50 }}
                      className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[400px] max-w-full px-4"
                    >
                      <Card className="bg-slate-900 text-white border-2 border-emerald-500 shadow-2xl p-4">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-xl font-bold">
                              {callingData?.name.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                              <Phone className="w-2.5 h-2.5 animate-pulse" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold">{callingData?.name}</h4>
                            <p className="text-xs text-slate-400">{callingData?.phone}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider animate-pulse">Llamando...</span>
                              <div className="flex gap-0.5">
                                <div className="w-1 h-3 bg-emerald-500/30 animate-grow-1" />
                                <div className="w-1 h-3 bg-emerald-500/30 animate-grow-2" />
                                <div className="w-1 h-3 bg-emerald-500/30 animate-grow-3" />
                              </div>
                            </div>
                          </div>
                          <Button size="icon" variant="destructive" className="rounded-full h-10 w-10" onClick={() => setIsCalling(false)}>
                            <PhoneOff className="w-5 h-5" />
                          </Button>
                        </div>
                        {/* Simulated voice wave */}
                        <div className="mt-4 flex justify-between items-center px-2">
                          {Array.from({ length: 20 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-emerald-500/40 rounded-full transition-all duration-300"
                              style={{
                                height: `${Math.random() * 20 + 4}px`,
                                animation: `wave 1s ease-in-out infinite ${i * 0.05}s`
                              }}
                            />
                          ))}
                        </div>
                        <p className="text-center text-[10px] text-slate-500 mt-2">Sofía está conectando con el cliente...</p>
                      </Card>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tab: Clientes - Enhanced CRM (Enterprise) */}
                {activeTab === "clientes" && panelMode === "enterprise" && (
                  <div className="space-y-6" onMouseEnter={() => setCursorType('client')}>
                    {/* Sub-tabs for Clientes and Directivos */}
                    <div className="flex gap-2 border-b pb-2">
                      <Button
                        variant={clientSubTab === 'clientes' ? 'default' : 'ghost'}
                        size="sm"
                        className={`gap-2 ${clientSubTab === 'clientes' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={() => setClientSubTab('clientes')}
                      >
                        <Users className="w-4 h-4" /> Clientes
                      </Button>
                      <Button
                        variant={clientSubTab === 'directivos' ? 'default' : 'ghost'}
                        size="sm"
                        className={`gap-2 ${clientSubTab === 'directivos' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={() => setClientSubTab('directivos')}
                      >
                        <Building className="w-4 h-4" /> Directivos IBEX 35
                      </Button>
                    </div>

                    {/* Clientes Tab Content */}
                    {clientSubTab === 'clientes' && (
                      <>
                        {/* MEJORA 1: Pipeline de Ventas Visual */}
                        <Card className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5">
                          <CardHeader className="pb-2">
                            <CardTitle className="text-sm flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-emerald-500" />
                              Pipeline de Ventas
                            </CardTitle>
                            <CardDescription>Visualiza el estado de todos tus clientes</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-4 gap-3">
                              {[
                                { phase: "nuevo", label: "Nuevos", count: clients.filter(c => c.phase === 'nuevo').length, color: "bg-blue-500", clients: clients.filter(c => c.phase === 'nuevo').slice(0, 2) },
                                { phase: "prospeccion", label: "Prospección", count: clients.filter(c => c.phase === 'prospeccion').length, color: "bg-yellow-500", clients: clients.filter(c => c.phase === 'prospeccion').slice(0, 2) },
                                { phase: "activo", label: "Activos", count: clients.filter(c => c.phase === 'activo').length, color: "bg-emerald-500", clients: clients.filter(c => c.phase === 'activo').slice(0, 2) },
                                { phase: "inactivo", label: "Inactivos", count: clients.filter(c => c.phase === 'inactivo').length, color: "bg-gray-400", clients: clients.filter(c => c.phase === 'inactivo').slice(0, 2) },
                              ].map((column, i) => (
                                <div key={i} className="p-2 bg-muted/30 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-medium">{column.label}</span>
                                    <Badge className={`text-[10px] ${column.color}`}>{column.count}</Badge>
                                  </div>
                                  <div className="space-y-1">
                                    {column.clients.map((client: any, j: number) => (
                                      <div key={j} className="p-2 bg-background rounded border text-[10px] truncate hover:border-emerald-500/50 cursor-pointer">
                                        {client.name}
                                      </div>
                                    ))}
                                    {column.count === 0 && <div className="text-[10px] text-muted-foreground text-center py-2">Vacío</div>}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* MEJORA 2: Lead Scoring */}
                        <div className="grid lg:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Target className="w-4 h-4 text-purple-500" />
                                Lead Scoring Automático
                              </CardTitle>
                              <CardDescription>Priorización de clientes por potencial</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {clients.map((client: any, i: number) => {
                                  const score = Math.round(leadScores[i] || 0);
                                  return (
                                    <div key={client.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                                      <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-xs font-bold">
                                          {client.name.charAt(0)}
                                        </div>
                                        <div>
                                          <div className="text-sm font-medium">{client.name}</div>
                                          <div className="text-[10px] text-muted-foreground">{client.phase}</div>
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                          <div
                                            className={`h-full rounded-full transition-all duration-300 ${score >= 80 ? 'bg-emerald-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                            style={{ width: `${score}%` }}
                                          />
                                        </div>
                                        <span className={`text-xs font-bold ${score >= 80 ? 'text-emerald-500' : score >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>{score}</span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </CardContent>
                          </Card>

                          {/* MEJORA 3: Tareas Programadas */}
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-sm flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                Tareas Programadas
                              </CardTitle>
                              <CardDescription>Seguimiento de acciones pendientes</CardDescription>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-2">
                                {[
                                  { client: "Banco Santander", task: "Llamada seguimiento Q4", date: "Hoy 15:00", priority: "alta" },
                                  { client: "BBVA", task: "Enviar propuesta", date: "Mañana", priority: "media" },
                                  { client: "CaixaBank", task: "Reunión presencial", date: "Vie 10:00", priority: "alta" },
                                  { client: "Bankinter", task: "Email bienvenida", date: "Lun", priority: "baja" },
                                ].map((tarea, i) => (
                                  <div key={i} className={`p-2 rounded-lg border-l-4 ${tarea.priority === 'alta' ? 'border-l-red-500 bg-red-500/5' :
                                    tarea.priority === 'media' ? 'border-l-yellow-500 bg-yellow-500/5' : 'border-l-gray-400 bg-muted/30'
                                    }`}>
                                    <div className="flex items-center justify-between">
                                      <div>
                                        <div className="text-sm font-medium">{tarea.task}</div>
                                        <div className="text-[10px] text-muted-foreground">{tarea.client}</div>
                                      </div>
                                      <div className="text-right">
                                        <Badge variant="outline" className="text-[10px]">{tarea.date}</Badge>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Client List Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-bold">Listado de Clientes</h2>
                            <p className="text-xs text-muted-foreground">{getFilteredClients().length} de {clients.length} clientes</p>
                          </div>
                          <div className="flex gap-2">
                            <Select value={clientFilter.phase} onValueChange={(v) => setClientFilter({ ...clientFilter, phase: v })}>
                              <SelectTrigger className="w-[140px] h-8 text-xs">
                                <Filter className="w-3 h-3 mr-1" />
                                <SelectValue placeholder="Fase" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="todos">Todas las fases</SelectItem>
                                <SelectItem value="nuevo">Nuevo Cliente</SelectItem>
                                <SelectItem value="activo">Activo</SelectItem>
                                <SelectItem value="prospeccion">En Prospección</SelectItem>
                                <SelectItem value="inactivo">Inactivo</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600" onClick={() => setShowAddClient(true)}>
                              <Plus className="w-4 h-4" /> Nuevo
                            </Button>
                          </div>
                        </div>

                        {/* Client Cards */}
                        <div className="grid gap-3">
                          {getFilteredClients().map((client: any) => {
                            const assignedAgent = userAgents.find((a: any) => a.id === client.agent);
                            const phaseColors: any = {
                              nuevo: "bg-blue-500",
                              activo: "bg-emerald-500",
                              prospeccion: "bg-yellow-500",
                              inactivo: "bg-gray-400"
                            };
                            return (
                              <Card key={client.id} className="hover:shadow-md transition-all">
                                <CardContent className="p-4">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold">{client.name.charAt(0)}</div>
                                      <div>
                                        <div className="flex items-center gap-2 mb-1">
                                          <h3 className="font-semibold">{client.name}</h3>
                                          <Badge className={`text-[9px] ${phaseColors[client.phase] || "bg-gray-400"}`}>{client.phase}</Badge>
                                        </div>
                                        {/* MEJORA 5: Tags */}
                                        <div className="flex flex-wrap gap-1 mb-1">
                                          {(client.tags || []).map((tag: string, i: number) => (
                                            <Badge key={i} variant="outline" className="text-[9px] h-4">{tag}</Badge>
                                          ))}
                                        </div>
                                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{client.email}</span>
                                          <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{client.phone}</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-xs text-muted-foreground mb-1">Agente</div>
                                      <Badge variant="outline" className="text-xs">{assignedAgent?.name || "Sin asignar"}</Badge>
                                      {client.billing > 0 && (
                                        <div className="text-xs text-emerald-500 mt-1 font-medium">€{client.billing.toLocaleString()}/mes</div>
                                      )}
                                    </div>
                                  </div>

                                  {/* MEJORA 4: Timeline de Interacciones */}
                                  <div className="border-t pt-3">
                                    <div className="flex items-center justify-between mb-2">
                                      <h4 className="text-xs font-medium flex items-center gap-1">
                                        <Clock className="w-3 h-3 text-muted-foreground" />
                                        Historial de Interacciones
                                      </h4>
                                      <div className="flex gap-1">
                                        <Button size="sm" variant="ghost" className="h-6 text-[10px] gap-1 text-purple-500" onClick={() => handleCallClient(client)}>
                                          <Phone className="w-3 h-3" /> Llamar
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-6 text-[10px] gap-1" onClick={() => handleEmailClient(client)}>
                                          <Mail className="w-3 h-3" /> Email
                                        </Button>
                                        <Button size="sm" variant="outline" className="h-6 text-[10px] gap-1" onClick={() => { setSelectedClientDetail(client); setShowClientDetail(true); }}>
                                          <Eye className="w-3 h-3" /> Ver
                                        </Button>
                                      </div>
                                    </div>

                                    {/* Timeline Visual */}
                                    <div className="relative pl-6">
                                      <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-muted" />
                                      {client.interactions.length > 0 ? client.interactions.slice(0, 3).map((interaction: any, i: number) => (
                                        <div key={i} className="relative mb-2 last:mb-0">
                                          <div className={`absolute -left-4 w-3 h-3 rounded-full border-2 border-background ${interaction.type === "email" ? "bg-blue-500" : "bg-emerald-500"
                                            }`} />
                                          <div className="p-2 bg-muted/30 rounded-lg text-xs">
                                            <div className="flex items-center justify-between mb-0.5">
                                              <span className="font-medium">{interaction.type === "email" ? "Email" : "Llamada"}</span>
                                              <span className="text-muted-foreground">{interaction.date}</span>
                                            </div>
                                            <p className="text-muted-foreground text-[10px]">{interaction.summary}</p>
                                          </div>
                                        </div>
                                      )) : (
                                        <div className="text-xs text-muted-foreground text-center py-2">Sin interacciones</div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Quick Notes */}
                                  <div className="mt-3 pt-3 border-t">
                                    <div className="flex items-center gap-2">
                                      <Input placeholder="Añadir nota rápida..." className="h-7 text-xs" />
                                      <Button size="sm" variant="outline" className="h-7 shrink-0">Añadir</Button>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {/* Directivos IBEX 35 Tab Content */}
                    {clientSubTab === 'directivos' && (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-bold">Directivos IBEX 35</h2>
                            <p className="text-xs text-muted-foreground">Directivos y sus portfolios empresariales</p>
                          </div>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Download className="w-4 h-4" /> Exportar
                          </Button>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {ibexDirectors.map((director) => (
                            <Card key={director.id} className="hover:shadow-md transition-all">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3 mb-3">
                                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold text-sm">
                                    {director.photo}
                                  </div>
                                  <div className="flex-1">
                                    <h3 className="font-semibold text-sm">{director.name}</h3>
                                    <p className="text-xs text-muted-foreground">{director.position}</p>
                                    <div className="flex items-center gap-1 mt-1">
                                      <Building className="w-3 h-3 text-muted-foreground" />
                                      <span className="text-xs font-medium">{director.company}</span>
                                    </div>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <div className="text-xs font-medium text-muted-foreground">Portfolio Empresarial:</div>
                                  <div className="flex flex-wrap gap-1">
                                    {director.portfolio.map((company, i) => (
                                      <Badge key={i} variant="secondary" className="text-[10px]">{company}</Badge>
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center justify-between mt-3 pt-3 border-t">
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Users className="w-3 h-3" />
                                    <span>{director.connections} conexiones</span>
                                  </div>
                                  <div className="flex gap-1">
                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                      <Linkedin className="w-3 h-3" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-7 w-7">
                                      <Mail className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Tab: Fuentes de Datos - With Sub-tabs */}
                {activeTab === "fuentes" && (
                  <div className="space-y-4" onMouseEnter={() => setCursorType('data')}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">Fuentes de Datos</h2>
                        <p className="text-xs text-muted-foreground">Gestiona integraciones y conexiones</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <RefreshCw className="w-4 h-4" /> Sincronizar Todo
                        </Button>
                      </div>
                    </div>

                    {/* Sub-tabs for Tradicionales and MCP */}
                    <div className="flex gap-2 border-b pb-2">
                      <Button
                        variant={sourceTab === 'tradicionales' ? 'default' : 'ghost'}
                        size="sm"
                        className={`gap-2 ${sourceTab === 'tradicionales' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={() => setSourceTab('tradicionales')}
                      >
                        <Database className="w-4 h-4" /> Tradicionales
                      </Button>
                      <Button
                        variant={sourceTab === 'mcp' ? 'default' : 'ghost'}
                        size="sm"
                        className={`gap-2 ${sourceTab === 'mcp' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                        onClick={() => setSourceTab('mcp')}
                      >
                        <Webhook className="w-4 h-4" /> MCP
                      </Button>
                    </div>

                    {/* Tradicionales Tab Content */}
                    {sourceTab === 'tradicionales' && (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600" onClick={() => {
                            const newId = Math.max(...dataSourceRows.map(r => r.id)) + 1;
                            setDataSourceRows([...dataSourceRows, { id: newId, nombre: '', tipo: 'API', url: '', estado: 'pendiente', ultimaSync: 'Nuevo', registros: 0, frecuencia: '30 min' }]);
                          }}>
                            <Plus className="w-4 h-4" /> Nueva Fuente
                          </Button>
                        </div>

                        {/* Spreadsheet-style Table */}
                        <Card className="overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead className="bg-muted/50 border-b">
                                <tr>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground w-12">ID</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Nombre</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Tipo</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">URL / Conexión</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Estado</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Última Sync</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground">Registros</th>
                                  <th className="px-3 py-2 text-left text-xs font-medium text-muted-foreground w-16">Acciones</th>
                                </tr>
                              </thead>
                              <tbody>
                                {dataSourceRows.map((row, idx) => (
                                  <tr key={row.id} className={`border-b hover:bg-muted/30 ${idx % 2 === 0 ? 'bg-background' : 'bg-muted/10'}`}>
                                    <td className="px-3 py-2 text-xs text-muted-foreground">{row.id}</td>
                                    <td className="px-3 py-2">
                                      <span className="cursor-text hover:bg-muted/50 px-1 py-0.5 rounded text-xs"
                                        onClick={() => { setEditingCell({ rowId: row.id, field: 'nombre' }); setEditValue(row.nombre); }}
                                      >{row.nombre || '-'}</span>
                                    </td>
                                    <td className="px-3 py-2">
                                      <Badge variant="outline" className="text-[10px]">{row.tipo}</Badge>
                                    </td>
                                    <td className="px-3 py-2 text-xs truncate max-w-[150px]" title={row.url}>{row.url || '-'}</td>
                                    <td className="px-3 py-2">
                                      <Badge className={`text-[10px] ${row.estado === 'conectado' ? 'bg-emerald-500' : row.estado === 'sincronizando' ? 'bg-yellow-500' : 'bg-gray-400'}`}>
                                        {row.estado}
                                      </Badge>
                                    </td>
                                    <td className="px-3 py-2 text-xs text-muted-foreground">{row.ultimaSync}</td>
                                    <td className="px-3 py-2 text-xs font-mono">{row.registros.toLocaleString()}</td>
                                    <td className="px-3 py-2">
                                      <div className="flex items-center gap-1">
                                        <Button variant="ghost" size="icon" className="h-6 w-6">
                                          <RefreshCw className="w-3 h-3" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-6 w-6 text-red-500" onClick={() => setDataSourceRows(dataSourceRows.filter(r => r.id !== row.id))}>
                                          <Trash2 className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </Card>
                      </div>
                    )}

                    {/* MCP Tab Content */}
                    {sourceTab === 'mcp' && (
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600">
                            <Plus className="w-4 h-4" /> Añadir Integración MCP
                          </Button>
                        </div>

                        {/* MCP Grid */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {MCP_INTEGRATIONS.map((mcp) => {
                            const connected = mcpIntegrations.find(m => m.id === mcp.id);
                            return (
                              <Card key={mcp.id} className={`hover:shadow-md transition-all ${connected ? 'border-emerald-500/50' : 'opacity-70'}`}>
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-3">
                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${connected ? 'bg-emerald-500/20' : 'bg-muted'}`}>
                                      <mcp.icon className={`w-5 h-5 ${connected ? 'text-emerald-500' : 'text-muted-foreground'}`} />
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2">
                                        <h3 className="font-medium text-sm">{mcp.name}</h3>
                                        {connected && (
                                          <Badge className="bg-emerald-500 text-[9px]">Conectado</Badge>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-muted-foreground">{mcp.category}</p>
                                      {connected && (
                                        <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground">
                                          <span>{connected.actions} acciones</span>
                                          <span>•</span>
                                          <span>{connected.lastSync}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="mt-3 flex gap-2">
                                    {connected ? (
                                      <>
                                        <Button size="sm" variant="outline" className="flex-1 h-7 text-xs">Configurar</Button>
                                        <Button size="sm" variant="ghost" className="h-7 text-xs text-red-500" onClick={() => setMcpIntegrations(mcpIntegrations.filter(m => m.id !== mcp.id))}>Desconectar</Button>
                                      </>
                                    ) : (
                                      <Button size="sm" className="flex-1 h-7 text-xs bg-emerald-500 hover:bg-emerald-600" onClick={() => setMcpIntegrations([...mcpIntegrations, { id: mcp.id, name: mcp.name, status: 'conectado', lastSync: 'Ahora', actions: 0 }])}>Conectar</Button>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Quick Stats */}
                    <div className="grid sm:grid-cols-4 gap-3">
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <Database className="w-4 h-4 text-emerald-500" />
                          </div>
                          <div>
                            <div className="text-lg font-bold">{dataSourceRows.filter(r => r.estado === 'conectado').length}</div>
                            <div className="text-[10px] text-muted-foreground">Tradicionales</div>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <Webhook className="w-4 h-4 text-purple-500" />
                          </div>
                          <div>
                            <div className="text-lg font-bold">{mcpIntegrations.length}</div>
                            <div className="text-[10px] text-muted-foreground">MCP Activos</div>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <div className="text-lg font-bold">{mcpIntegrations.reduce((acc, m) => acc + m.actions, 0)}</div>
                            <div className="text-[10px] text-muted-foreground">Acciones MCP</div>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <RefreshCw className="w-4 h-4 text-yellow-500" />
                          </div>
                          <div>
                            <div className="text-lg font-bold">{dataSourceRows.reduce((acc, r) => acc + r.registros, 0).toLocaleString()}</div>
                            <div className="text-[10px] text-muted-foreground">Total Registros</div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Tab: Predicciones */}
                {activeTab === "predicciones" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">Predicciones</h2>
                        <p className="text-xs text-muted-foreground">Análisis predictivo de agentes y modelos</p>
                      </div>
                      <div className="flex gap-2">
                        <Select value={predictionFilter.type} onValueChange={(v) => setPredictionFilter({ ...predictionFilter, type: v })}>
                          <SelectTrigger className="w-[120px] h-8 text-xs"><SelectValue placeholder="Tipo" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="agente">Por Agente</SelectItem>
                            <SelectItem value="modelo">Por Modelo</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={predictionFilter.confidence} onValueChange={(v) => setPredictionFilter({ ...predictionFilter, confidence: v })}>
                          <SelectTrigger className="w-[120px] h-8 text-xs"><SelectValue placeholder="Confianza" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todas</SelectItem>
                            <SelectItem value="alta">Alta (80%+)</SelectItem>
                            <SelectItem value="media">Media (60-80%)</SelectItem>
                            <SelectItem value="baja">Baja (&lt;60%)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Prediction Cards */}
                    <div className="space-y-3">
                      {predictions
                        .filter(p => {
                          if (predictionFilter.type !== 'todos' && p.type !== predictionFilter.type) return false;
                          if (predictionFilter.confidence === 'alta' && p.confidence < 80) return false;
                          if (predictionFilter.confidence === 'media' && (p.confidence < 60 || p.confidence >= 80)) return false;
                          if (predictionFilter.confidence === 'baja' && p.confidence >= 60) return false;
                          return true;
                        })
                        .map((pred) => (
                          <Card key={pred.id} className="hover:shadow-md transition-shadow">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${pred.type === 'agente' ? 'bg-emerald-500/20' : 'bg-purple-500/20'
                                  }`}>
                                  {pred.type === 'agente' ? (
                                    <Bot className={`w-6 h-6 text-emerald-500`} />
                                  ) : (
                                    <Brain className={`w-6 h-6 text-purple-500`} />
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Badge variant="outline" className={`text-[10px] ${pred.type === 'agente' ? 'border-emerald-500 text-emerald-500' : 'border-purple-500 text-purple-500'
                                      }`}>
                                      {pred.type === 'agente' ? 'Agente' : 'Modelo'}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground">{pred.source}</span>
                                    <Badge variant="secondary" className="text-[10px] ml-auto">{pred.category}</Badge>
                                  </div>
                                  <p className="text-sm mb-2">{pred.prediction}</p>
                                  <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <div className="text-xs text-muted-foreground">Confianza:</div>
                                      <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                          className={`h-full rounded-full ${pred.confidence >= 80 ? 'bg-emerald-500' :
                                            pred.confidence >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                          style={{ width: `${pred.confidence}%` }}
                                        />
                                      </div>
                                      <span className={`text-xs font-bold ${pred.confidence >= 80 ? 'text-emerald-500' :
                                        pred.confidence >= 60 ? 'text-yellow-500' : 'text-red-500'
                                        }`}>{pred.confidence}%</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{pred.date}</span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                                    <Zap className="w-3 h-3" /> Crear Tarea
                                  </Button>
                                  <Button size="sm" variant="ghost" className="h-7 text-xs">
                                    Ver Detalles
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>

                    {/* Oportunidades de Colaboración Detectadas */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Handshake className="w-4 h-4 text-teal-500" />
                          Oportunidades de Colaboración Detectadas
                        </CardTitle>
                        <CardDescription>Empresas con sinergias potenciales identificadas por IA</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-3">
                          {[
                            { name: "PayFlow Solutions", sinergia: "Integración de pagos", match: 92, tipo: "Tecnología" },
                            { name: "RiskAnalytics Pro", sinergia: "Scoring de riesgo avanzado", match: 88, tipo: "Analytics" },
                            { name: "ComplianceBot", sinergia: "Cumplimiento normativo automatizado", match: 85, tipo: "LegalTech" },
                          ].map((partner, i) => (
                            <div key={i} className="p-3 bg-muted/50 rounded-lg border hover:border-teal-500/50 transition-colors">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{partner.name}</span>
                                <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px]">{partner.match}% match</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{partner.sinergia}</p>
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className="text-[10px]">{partner.tipo}</Badge>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px]">Ver perfil</Button>
                                <Button size="sm" className="flex-1 h-7 text-[10px] bg-emerald-500 hover:bg-emerald-600">Contactar</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Summary Stats */}
                    <div className="grid sm:grid-cols-3 gap-3">
                      <Card className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-emerald-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Bot className="w-8 h-8 text-emerald-500" />
                            <div>
                              <div className="text-2xl font-bold">{predictions.filter(p => p.type === 'agente').length}</div>
                              <div className="text-xs text-muted-foreground">Predicciones de Agentes</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Brain className="w-8 h-8 text-purple-500" />
                            <div>
                              <div className="text-2xl font-bold">{predictions.filter(p => p.type === 'modelo').length}</div>
                              <div className="text-xs text-muted-foreground">Predicciones de Modelos</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/20">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <TrendingUp className="w-8 h-8 text-yellow-500" />
                            <div>
                              <div className="text-2xl font-bold">{Math.round(predictions.reduce((acc, p) => acc + p.confidence, 0) / predictions.length)}%</div>
                              <div className="text-xs text-muted-foreground">Confianza Media</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Tab: Tareas Automáticas */}
                {activeTab === "tareas" && (
                  <div className="space-y-4" onMouseEnter={() => setCursorType('action')}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-xl font-bold">Tareas Automáticas</h2>
                        <p className="text-xs text-muted-foreground">Acciones derivadas de predicciones</p>
                      </div>
                      <div className="flex gap-2">
                        <Select value={taskFilter.status} onValueChange={(v) => setTaskFilter({ ...taskFilter, status: v })}>
                          <SelectTrigger className="w-[120px] h-8 text-xs"><SelectValue placeholder="Estado" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="pendiente">Pendiente</SelectItem>
                            <SelectItem value="en-progreso">En Progreso</SelectItem>
                            <SelectItem value="completada">Completada</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={taskFilter.type} onValueChange={(v) => setTaskFilter({ ...taskFilter, type: v })}>
                          <SelectTrigger className="w-[120px] h-8 text-xs"><SelectValue placeholder="Tipo" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todos">Todos</SelectItem>
                            <SelectItem value="email">Email</SelectItem>
                            <SelectItem value="llamada">Llamada</SelectItem>
                            <SelectItem value="reporte">Reporte</SelectItem>
                            <SelectItem value="analisis">Análisis</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Task Cards */}
                    <div className="space-y-2">
                      {autoTasks
                        .filter(t => {
                          if (taskFilter.status !== 'todos' && t.status !== taskFilter.status) return false;
                          if (taskFilter.type !== 'todos' && t.type !== taskFilter.type) return false;
                          return true;
                        })
                        .map((task) => (
                          <Card key={task.id} className={`hover:shadow-md transition-all ${task.status === 'completada' ? 'opacity-60' :
                            task.priority === 'alta' ? 'border-l-4 border-l-red-500' :
                              task.priority === 'media' ? 'border-l-4 border-l-yellow-500' : 'border-l-4 border-l-gray-400'
                            }`}>
                            <CardContent className="p-3">
                              <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${task.type === 'email' ? 'bg-blue-500/20' :
                                  task.type === 'llamada' ? 'bg-green-500/20' :
                                    task.type === 'reporte' ? 'bg-purple-500/20' : 'bg-orange-500/20'
                                  }`}>
                                  {task.type === 'email' ? <Mail className="w-5 h-5 text-blue-500" /> :
                                    task.type === 'llamada' ? <Phone className="w-5 h-5 text-green-500" /> :
                                      task.type === 'reporte' ? <FileText className="w-5 h-5 text-purple-500" /> :
                                        <BarChart3 className="w-5 h-5 text-orange-500" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className={`text-sm font-medium ${task.status === 'completada' ? 'line-through text-muted-foreground' : ''}`}>{task.task}</h3>
                                    <Badge className={`text-[10px] ${task.status === 'pendiente' ? 'bg-yellow-500' :
                                      task.status === 'en-progreso' ? 'bg-blue-500' : 'bg-emerald-500'
                                      }`}>
                                      {task.status === 'en-progreso' ? 'En Progreso' : task.status}
                                    </Badge>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><Bot className="w-3 h-3" />{task.agent}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{task.scheduled}</span>
                                  </div>
                                  <div className="text-[10px] text-muted-foreground mt-1 italic">"{task.prediction}"</div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                  {task.status === 'pendiente' && (
                                    <>
                                      <Button size="sm" className="h-7 text-xs bg-emerald-500 hover:bg-emerald-600" onClick={() => setAutoTasks(autoTasks.map(t => t.id === task.id ? { ...t, status: 'en-progreso' } : t))}>
                                        <Play className="w-3 h-3 mr-1" /> Ejecutar
                                      </Button>
                                      <Button size="sm" variant="outline" className="h-7 text-xs">
                                        <Calendar className="w-3 h-3 mr-1" /> Programar
                                      </Button>
                                    </>
                                  )}
                                  {task.status === 'en-progreso' && (
                                    <>
                                      <Button size="sm" className="h-7 text-xs bg-emerald-500 hover:bg-emerald-600" onClick={() => setAutoTasks(autoTasks.map(t => t.id === task.id ? { ...t, status: 'completada', scheduled: 'Completado' } : t))}>
                                        <CheckCircle className="w-3 h-3 mr-1" /> Completar
                                      </Button>
                                      <Button size="sm" variant="outline" className="h-7 text-xs">
                                        <Pause className="w-3 h-3 mr-1" /> Pausar
                                      </Button>
                                    </>
                                  )}
                                  {task.status === 'completada' && (
                                    <Badge variant="outline" className="text-emerald-500">
                                      <CheckCircle className="w-3 h-3 mr-1" /> Hecho
                                    </Badge>
                                  )}
                                  <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500" onClick={() => setAutoTasks(autoTasks.filter(t => t.id !== task.id))}>
                                    <Trash2 className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>

                    {/* Task Stats */}
                    <div className="grid sm:grid-cols-4 gap-3">
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                            <Clock className="w-4 h-4 text-yellow-500" />
                          </div>
                          <div>
                            <div className="text-lg font-bold">{autoTasks.filter(t => t.status === 'pendiente').length}</div>
                            <div className="text-[10px] text-muted-foreground">Pendientes</div>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <Play className="w-4 h-4 text-blue-500" />
                          </div>
                          <div>
                            <div className="text-lg font-bold">{autoTasks.filter(t => t.status === 'en-progreso').length}</div>
                            <div className="text-[10px] text-muted-foreground">En Progreso</div>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-emerald-500" />
                          </div>
                          <div>
                            <div className="text-lg font-bold">{autoTasks.filter(t => t.status === 'completada').length}</div>
                            <div className="text-[10px] text-muted-foreground">Completadas</div>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          </div>
                          <div>
                            <div className="text-lg font-bold">{autoTasks.filter(t => t.priority === 'alta').length}</div>
                            <div className="text-[10px] text-muted-foreground">Prioridad Alta</div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                )}

                {/* Tab: Competencia */}
                {activeTab === "competencia" && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h2 className="text-2xl font-bold">Seguimiento de Competencia</h2>
                        <p className="text-sm text-muted-foreground">Monitoriza a tus competidores con IA</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="w-4 h-4" /> Exportar
                        </Button>
                        <Button size="sm" className="gap-1 bg-emerald-500 hover:bg-emerald-600">
                          <Plus className="w-4 h-4" /> Añadir Competidor
                        </Button>
                      </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="border-red-500/30">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center">
                            <AlertTriangle className="w-6 h-6 text-red-500" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">2</div>
                            <div className="text-xs text-muted-foreground">Amenaza Alta</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-yellow-500/30">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                            <Eye className="w-6 h-6 text-yellow-500" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">1</div>
                            <div className="text-xs text-muted-foreground">Amenaza Media</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-emerald-500/30">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                            <Newspaper className="w-6 h-6 text-emerald-500" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">38</div>
                            <div className="text-xs text-muted-foreground">Noticias Semana</div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-purple-500/30">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-purple-500" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold">+12%</div>
                            <div className="text-xs text-muted-foreground">Ventas vs Compet.</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Advanced Tools */}
                    <div className="grid lg:grid-cols-3 gap-4">
                      <Card className="lg:col-span-2">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Radar className="w-4 h-4 text-emerald-500" />
                            Análisis Competitivo
                          </CardTitle>
                          <CardDescription>Comparativa con principales competidores</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={{
                            nosotros: { label: "Nosotros", color: "#10b981" },
                            competencia: { label: "Competencia", color: "#f59e0b" },
                          }} className="h-64">
                            <RadarChart data={[
                              { metric: "Producto", nosotros: 95, competencia: 82 },
                              { metric: "Precio", nosotros: 78, competencia: 85 },
                              { metric: "Soporte", nosotros: 92, competencia: 75 },
                              { metric: "Innovación", nosotros: 88, competencia: 90 },
                              { metric: "Market Share", nosotros: 70, competencia: 85 },
                            ]}>
                              <PolarGrid />
                              <PolarAngleAxis dataKey="metric" className="text-xs" />
                              <PolarRadiusAxis angle={30} domain={[0, 100]} />
                              <RechartsRadar name="Nosotros" dataKey="nosotros" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                              <RechartsRadar name="Competencia" dataKey="competencia" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                            </RadarChart>
                          </ChartContainer>
                          <div className="flex justify-center gap-6 mt-4">
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-sm">Tu empresa</span></div>
                            <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500" /><span className="text-sm">Competencia</span></div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center gap-2">
                            <Eye className="w-4 h-4 text-purple-500" />
                            Alertas de Competencia
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {[
                            { tipo: "producto", empresa: "CompetidorX", mensaje: "Lanzó nuevo producto de gestión", prioridad: "alta", tiempo: "Hace 2h" },
                            { tipo: "partnership", empresa: "AlliedFin", mensaje: "Posible partner para LATAM", prioridad: "media", tiempo: "Hace 1d" },
                            { tipo: "mercado", empresa: "MarketWatch", mensaje: "Nueva regulación favorable", prioridad: "alta", tiempo: "Hace 3d" },
                          ].map((alerta, i) => (
                            <div key={i} className={`p-2 rounded-lg border ${alerta.prioridad === "alta" ? "border-red-500/30 bg-red-500/5" : "border-yellow-500/30 bg-yellow-500/5"}`}>
                              <div className="flex items-center justify-between mb-1">
                                <Badge variant="secondary" className="text-[10px]">{alerta.empresa}</Badge>
                                <span className="text-[10px] text-muted-foreground">{alerta.tiempo}</span>
                              </div>
                              <p className="text-xs">{alerta.mensaje}</p>
                              {alerta.tipo === "partnership" && (
                                <Button size="sm" variant="outline" className="mt-1 h-6 text-[10px] w-full">
                                  <Handshake className="w-3 h-3 mr-1" />Contactar
                                </Button>
                              )}
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Oportunidades de Colaboración */}
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Handshake className="w-4 h-4 text-teal-500" />
                          Oportunidades de Colaboración Detectadas
                        </CardTitle>
                        <CardDescription>Empresas con sinergias potenciales</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-3 gap-3">
                          {[
                            { name: "PayFlow Solutions", sinergia: "Integración de pagos", match: 92 },
                            { name: "RiskAnalytics Pro", sinergia: "Scoring de riesgo", match: 88 },
                            { name: "ComplianceBot", sinergia: "Cumplimiento normativo", match: 85 },
                          ].map((partner, i) => (
                            <div key={i} className="p-3 bg-muted/50 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-sm">{partner.name}</span>
                                <Badge className="bg-emerald-500/10 text-emerald-600 text-[10px]">{partner.match}% match</Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{partner.sinergia}</p>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="flex-1 h-7 text-[10px]">Ver perfil</Button>
                                <Button size="sm" className="flex-1 h-7 text-[10px] bg-emerald-500 hover:bg-emerald-600">Contactar</Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Competitor List */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-sm">Listado de Competidores</CardTitle>
                          <div className="flex gap-2">
                            <Select defaultValue="all">
                              <SelectTrigger className="w-[120px] h-8 text-xs"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="direct">Directos</SelectItem>
                                <SelectItem value="indirect">Indirectos</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {competitors.map(comp => (
                          <div key={comp.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${comp.threat === "high" ? "bg-red-500/20" : comp.threat === "medium" ? "bg-yellow-500/20" : "bg-emerald-500/20"
                                }`}>
                                <Building className={`w-5 h-5 ${comp.threat === "high" ? "text-red-500" : comp.threat === "medium" ? "text-yellow-500" : "text-emerald-500"
                                  }`} />
                              </div>
                              <div>
                                <div className="font-medium text-sm">{comp.name}</div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <Badge variant="outline" className="text-[9px]">{comp.type}</Badge>
                                  <span>•</span>
                                  <span>{comp.lastUpdate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="flex flex-wrap gap-1 max-w-[200px]">
                                {comp.products.map((p, i) => <Badge key={i} variant="secondary" className="text-[9px]">{p}</Badge>)}
                              </div>
                              <Badge className={`${comp.threat === "high" ? "bg-red-500" : comp.threat === "medium" ? "bg-yellow-500" : "bg-emerald-500"}`}>
                                {comp.news} noticias
                              </Badge>
                              <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="w-4 h-4" /></Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                )}

                {/* Tab: Analíticas */}
                {activeTab === "analiticas" && panelMode === "sme" && (
                  <div className="-m-6">
                    <SmeDashboardDemo />
                  </div>
                )}

                {activeTab === "analiticas" && panelMode === "enterprise" && (
                  <div className="space-y-4">
                    {/* Sub-tabs for Analytics */}
                    <div className="flex items-center justify-between border-b pb-2">
                      <div className="flex gap-2">
                        <Button
                          variant={analyticsTab === 'avanzadas' ? 'default' : 'ghost'}
                          size="sm"
                          className={`gap-2 ${analyticsTab === 'avanzadas' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                          onClick={() => setAnalyticsTab('avanzadas')}
                        >
                          <BarChart3 className="w-4 h-4" /> Analíticas Avanzadas
                        </Button>
                        <Button
                          variant={analyticsTab === 'mercado' ? 'default' : 'ghost'}
                          size="sm"
                          className={`gap-2 ${analyticsTab === 'mercado' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}`}
                          onClick={() => setAnalyticsTab('mercado')}
                        >
                          <TrendingUp className="w-4 h-4" /> Analíticas de Mercado
                        </Button>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Download className="w-4 h-4" /> Exportar
                        </Button>
                      </div>
                    </div>

                    {/* Analíticas Avanzadas Tab */}
                    {analyticsTab === 'avanzadas' && (
                      <>
                        <div className="flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-bold">Analíticas Avanzadas</h2>
                            <p className="text-xs text-muted-foreground">Métricas de rendimiento en tiempo real</p>
                          </div>
                          <Select defaultValue="week">
                            <SelectTrigger className="w-[140px] h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="week">Esta semana</SelectItem>
                              <SelectItem value="month">Este mes</SelectItem>
                              <SelectItem value="quarter">Este trimestre</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {[
                            { label: "Emails Procesados", value: "799", change: "+23%", icon: Mail, color: "emerald" },
                            { label: "Llamadas Gestión", value: "278", change: "+15%", icon: Phone, color: "teal" },
                            { label: "Tareas Completadas", value: "465", change: "+31%", icon: CheckCircle2, color: "cyan" },
                            { label: "ROI Estimado", value: "+34%", change: "Objetivo: +25%", icon: TrendingUp, color: "purple" },
                          ].map((stat, i) => (
                            <Card key={i} className="p-3">
                              <div className="flex items-center justify-between mb-1">
                                <stat.icon className={`w-4 h-4 text-${stat.color}-500`} />
                                <Badge variant="outline" className="text-[10px]">{stat.change}</Badge>
                              </div>
                              <div className="text-xl font-bold">{stat.value}</div>
                              <div className="text-[10px] text-muted-foreground">{stat.label}</div>
                            </Card>
                          ))}
                        </div>

                        {/* Charts Grid */}
                        <div className="grid lg:grid-cols-2 gap-3">
                          <Card>
                            <CardHeader className="pb-1 pt-3">
                              <CardTitle className="text-xs">Actividad Semanal</CardTitle>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <ChartContainer config={{
                                emails: { label: "Emails", color: "#10b981" },
                                llamadas: { label: "Llamadas", color: "#14b8a6" },
                                tareas: { label: "Tareas", color: "#06b6d4" },
                              }} className="h-[160px]">
                                <BarChart data={analyticsData}>
                                  <XAxis dataKey="name" fontSize={9} />
                                  <YAxis fontSize={9} />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Bar dataKey="emails" fill="#10b981" radius={[3, 3, 0, 0]} />
                                  <Bar dataKey="llamadas" fill="#14b8a6" radius={[3, 3, 0, 0]} />
                                  <Bar dataKey="tareas" fill="#06b6d4" radius={[3, 3, 0, 0]} />
                                </BarChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-1 pt-3">
                              <CardTitle className="text-xs flex items-center gap-1">
                                <TrendingUp className="w-3 h-3 text-emerald-500" />
                                Tendencia de Rendimiento
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="pb-3">
                              <ChartContainer config={{
                                rendimiento: { label: "Rendimiento", color: "#10b981" },
                              }} className="h-[160px]">
                                <RechartsLineChart data={[
                                  { name: "Ene", rendimiento: 65 },
                                  { name: "Feb", rendimiento: 72 },
                                  { name: "Mar", rendimiento: 68 },
                                  { name: "Abr", rendimiento: 78 },
                                  { name: "May", rendimiento: 85 },
                                  { name: "Jun", rendimiento: 92 },
                                  { name: "Jul", rendimiento: 88 },
                                ]}>
                                  <XAxis dataKey="name" fontSize={9} />
                                  <YAxis fontSize={9} />
                                  <ChartTooltip content={<ChartTooltipContent />} />
                                  <Line type="monotone" dataKey="rendimiento" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981", r: 3 }} />
                                </RechartsLineChart>
                              </ChartContainer>
                            </CardContent>
                          </Card>
                        </div>

                        {/* Token & Revenue */}
                        <div className="grid lg:grid-cols-3 gap-3">
                          <Card className="p-3">
                            <div className="text-xs font-medium flex items-center gap-1 mb-2">
                              <Cpu className="w-3 h-3 text-purple-500" /> Consumo de Tokens
                            </div>
                            <div className="text-2xl font-bold mb-1">1.2M</div>
                            <Progress value={72} className="h-1.5 mb-1" />
                            <div className="text-[10px] text-muted-foreground">72% del límite mensual</div>
                          </Card>

                          <Card className="p-3">
                            <div className="text-xs font-medium flex items-center gap-1 mb-2">
                              <Bot className="w-3 h-3 text-emerald-500" /> Rendimiento Agentes
                            </div>
                            <div className="space-y-1.5">
                              {userAgents.slice(0, 3).map((agent: any) => (
                                <div key={agent.id} className="flex items-center gap-2">
                                  <span className="text-[10px] flex-1 truncate">{agent.name}</span>
                                  <span className="text-[10px] font-medium text-emerald-500">{agent.stats.success}%</span>
                                </div>
                              ))}
                            </div>
                          </Card>

                          <Card className="p-3">
                            <div className="text-xs font-medium flex items-center gap-1 mb-2">
                              <DollarSign className="w-3 h-3 text-yellow-500" /> Desglose de Ingresos
                            </div>
                            <div className="text-2xl font-bold mb-1">€49,000</div>
                            <div className="text-[10px] text-muted-foreground">+18% vs mes anterior</div>
                          </Card>
                        </div>
                      </>
                    )}

                    {/* Analíticas de Mercado Tab - Professional Trading Interface */}
                    {analyticsTab === 'mercado' && (
                      <div className="space-y-3">
                        {/* Top Bar with Asset Selector */}
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            {/* Asset Dropdown */}
                            <Select value={selectedIbexCompany} onValueChange={(v) => { setSelectedIbexCompany(v); setSelectedPrediction(null); }}>
                              <SelectTrigger className="w-[200px] h-9 text-sm font-medium border-2 border-emerald-500/50 bg-emerald-500/5">
                                <SelectValue placeholder="Seleccionar activo..." />
                              </SelectTrigger>
                              <SelectContent>
                                {ibexCompanies.map((company) => (
                                  <SelectItem key={company.id} value={company.id}>
                                    <div className="flex items-center gap-2">
                                      <span className="font-bold text-emerald-500">{company.ticker}</span>
                                      <span className="text-xs text-muted-foreground">{company.name}</span>
                                      <span className={`ml-auto text-xs ${company.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {company.change >= 0 ? '+' : ''}{company.change.toFixed(1)}%
                                      </span>
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            {/* Current Price Display */}
                            {(() => {
                              const company = ibexCompanies.find(c => c.id === selectedIbexCompany);
                              if (!company) return null;
                              return (
                                <div className="flex items-center gap-4">
                                  <div>
                                    <span className="text-2xl font-bold">€{company.price.toFixed(2)}</span>
                                    <span className={`ml-2 text-sm font-medium ${company.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                      {company.change >= 0 ? <ArrowUpRight className="w-4 h-4 inline" /> : <ArrowDownRight className="w-4 h-4 inline" />}
                                      {company.change >= 0 ? '+' : ''}{company.change.toFixed(2)} ({company.change >= 0 ? '+' : ''}{company.change.toFixed(1)}%)
                                    </span>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs gap-1">
                              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Mercado Abierto
                            </Badge>
                            <Badge variant="secondary" className="text-xs">220 velas</Badge>
                          </div>
                        </div>

                        {/* Main Trading Chart */}
                        <Card className="border-2 border-border/50">
                          <CardContent className="p-0 relative">
                            {(() => {
                              const company = ibexCompanies.find(c => c.id === selectedIbexCompany);
                              if (!company) return null;

                              const visibleCandles = 60; // Show 60 candles at once
                              const candleData = company.candleData;
                              const startIndex = Math.max(0, candleData.length - visibleCandles - chartScrollOffset);
                              const endIndex = Math.min(candleData.length, startIndex + visibleCandles);
                              const visibleData = candleData.slice(startIndex, endIndex);

                              const minPrice = Math.min(...visibleData.map(d => d.low)) * 0.995;
                              const maxPrice = Math.max(...visibleData.map(d => d.high)) * 1.005;
                              const priceRange = maxPrice - minPrice;
                              const chartHeight = 320;
                              const candleWidth = 100 / visibleCandles;

                              // Get prediction for current company
                              const currentPred = selectedPrediction || marketPredictions.find(p => p.asset === company.ticker);

                              return (
                                <div
                                  className="relative bg-white rounded-lg overflow-hidden border"
                                  ref={chartContainerRef}
                                  onMouseMove={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    const chartAreaLeft = 60;
                                    const chartAreaWidth = rect.width - 80;

                                    if (x >= chartAreaLeft && x <= rect.width - 20) {
                                      const candleIndex = Math.floor((x - chartAreaLeft) / (chartAreaWidth / visibleCandles));
                                      const actualIndex = startIndex + candleIndex;
                                      const candle = candleData[actualIndex];

                                      if (candle) {
                                        const price = maxPrice - (y / chartHeight) * priceRange;
                                        setCrosshairPos({
                                          x, y,
                                          visible: true,
                                          price: price,
                                          date: candle.date
                                        });
                                      }
                                    }
                                  }}
                                  onMouseLeave={() => setCrosshairPos(prev => ({ ...prev, visible: false }))}
                                >
                                  {/* Price Scale (Y-axis) - White theme */}
                                  <div className="absolute left-0 top-0 bottom-0 w-[60px] bg-gray-50 flex flex-col justify-between py-2 text-[10px] text-gray-600 border-r border-gray-200">
                                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                                      <div key={i} className="px-2 text-right font-medium">
                                        €{(maxPrice - ratio * priceRange).toFixed(2)}
                                      </div>
                                    ))}
                                  </div>

                                  {/* Chart Area - White background */}
                                  <div className="ml-[60px] mr-[20px] h-[320px] relative">
                                    {/* Grid Lines */}
                                    {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                                      <div
                                        key={i}
                                        className="absolute left-0 right-0 border-t border-gray-100"
                                        style={{ top: `${ratio * 100}%` }}
                                      />
                                    ))}

                                    {/* SL/TP Lines if prediction selected */}
                                    {currentPred && (
                                      <>
                                        {/* Take Profit Line */}
                                        <div
                                          className="absolute left-0 right-0 border-t-2 border-dashed border-emerald-500 z-10"
                                          style={{ top: `${((maxPrice - currentPred.takeProfit) / priceRange) * 100}%` }}
                                        >
                                          <div className="absolute right-0 -top-3 bg-emerald-500 text-white text-[9px] px-1 rounded">
                                            TP €{currentPred.takeProfit.toFixed(2)}
                                          </div>
                                        </div>
                                        {/* Entry Line */}
                                        <div
                                          className="absolute left-0 right-0 border-t-2 border-dashed border-blue-500 z-10"
                                          style={{ top: `${((maxPrice - currentPred.entry) / priceRange) * 100}%` }}
                                        >
                                          <div className="absolute right-0 -top-3 bg-blue-500 text-white text-[9px] px-1 rounded">
                                            ENTRY €{currentPred.entry.toFixed(2)}
                                          </div>
                                        </div>
                                        {/* Stop Loss Line */}
                                        <div
                                          className="absolute left-0 right-0 border-t-2 border-dashed border-red-500 z-10"
                                          style={{ top: `${((maxPrice - currentPred.stopLoss) / priceRange) * 100}%` }}
                                        >
                                          <div className="absolute right-0 -top-3 bg-red-500 text-white text-[9px] px-1 rounded">
                                            SL €{currentPred.stopLoss.toFixed(2)}
                                          </div>
                                        </div>
                                      </>
                                    )}

                                    {/* Candles */}
                                    <div className="flex h-full">
                                      {visibleData.map((candle, i) => {
                                        const isGreen = candle.close >= candle.open;
                                        const bodyTop = ((maxPrice - Math.max(candle.open, candle.close)) / priceRange) * chartHeight;
                                        const bodyHeight = Math.max(1, Math.abs(candle.close - candle.open) / priceRange * chartHeight);
                                        const wickTop = ((maxPrice - candle.high) / priceRange) * chartHeight;
                                        const wickBottom = ((maxPrice - candle.low) / priceRange) * chartHeight;

                                        return (
                                          <div
                                            key={i}
                                            className="relative flex-1"
                                            style={{ width: `${candleWidth}%` }}
                                          >
                                            {/* Wick */}
                                            <div
                                              className={`absolute left-1/2 w-px ${isGreen ? 'bg-emerald-400' : 'bg-red-400'}`}
                                              style={{
                                                top: `${(wickTop / chartHeight) * 100}%`,
                                                height: `${((wickBottom - wickTop) / chartHeight) * 100}%`
                                              }}
                                            />
                                            {/* Body */}
                                            <div
                                              className={`absolute left-[20%] w-[60%] ${isGreen ? 'bg-emerald-400' : 'bg-red-400'}`}
                                              style={{
                                                top: `${(bodyTop / chartHeight) * 100}%`,
                                                height: `${Math.max(0.5, (bodyHeight / chartHeight) * 100)}%`
                                              }}
                                            />
                                          </div>
                                        );
                                      })}
                                    </div>

                                    {/* Crosshair - White theme */}
                                    {crosshairPos.visible && (
                                      <>
                                        <div
                                          className="absolute top-0 bottom-0 w-px bg-gray-400 pointer-events-none"
                                          style={{ left: `${crosshairPos.x - 60}px` }}
                                        />
                                        <div
                                          className="absolute left-0 right-0 h-px bg-gray-400 pointer-events-none"
                                          style={{ top: `${crosshairPos.y}px` }}
                                        />
                                        {/* Price Label */}
                                        <div
                                          className="absolute right-0 bg-emerald-500 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none font-medium"
                                          style={{ top: `${crosshairPos.y - 8}px` }}
                                        >
                                          €{crosshairPos.price.toFixed(2)}
                                        </div>
                                        {/* Date Label */}
                                        <div
                                          className="absolute bottom-0 bg-gray-700 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none font-medium"
                                          style={{ left: `${crosshairPos.x - 60 - 30}px` }}
                                        >
                                          {crosshairPos.date}
                                        </div>
                                      </>
                                    )}
                                  </div>

                                  {/* Time Scale (X-axis) - White theme */}
                                  <div className="ml-[60px] mr-[20px] h-[24px] bg-gray-50 flex items-center border-t border-gray-200">
                                    <div className="flex w-full justify-between px-2 text-[9px] text-gray-600 font-medium">
                                      {visibleData.filter((_, i) => i % 10 === 0).map((candle, i) => (
                                        <span key={i}>{candle.date.slice(5)}</span>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Scroll Controls */}
                                  <div className="absolute bottom-8 right-2 flex gap-1">
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      disabled={chartScrollOffset >= candleData.length - visibleCandles}
                                      onClick={() => setChartScrollOffset(prev => Math.min(prev + 20, candleData.length - visibleCandles))}
                                    >
                                      <ArrowLeft className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="secondary"
                                      size="sm"
                                      className="h-6 w-6 p-0"
                                      disabled={chartScrollOffset <= 0}
                                      onClick={() => setChartScrollOffset(prev => Math.max(prev - 20, 0))}
                                    >
                                      <ArrowRight className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              );
                            })()}
                          </CardContent>
                        </Card>

                        {/* MEJORA 1: Market Summary KPIs */}
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { label: "IBEX 35", value: "11,847.32", change: "+1.2%", positive: true },
                            { label: "Volumen", value: "€2.4B", change: "+15%", positive: true },
                            { label: "Volatilidad", value: "18.5%", change: "Media", positive: null },
                            { label: "Advancers", value: "28", change: "vs 7", positive: true },
                            { label: "Spread", value: "0.02%", change: "Bajo", positive: true },
                          ].map((kpi, i) => (
                            <Card key={i} className="p-2">
                              <div className="text-[10px] text-muted-foreground">{kpi.label}</div>
                              <div className="text-lg font-bold">{kpi.value}</div>
                              <div className={`text-[10px] ${kpi.positive === true ? 'text-emerald-500' : kpi.positive === false ? 'text-red-500' : 'text-muted-foreground'}`}>{kpi.change}</div>
                            </Card>
                          ))}
                        </div>

                        {/* MEJORA 2: Technical Indicators */}
                        <Card>
                          <CardHeader className="pb-2 pt-3">
                            <CardTitle className="text-xs flex items-center gap-1">
                              <Activity className="w-3 h-3 text-blue-500" />
                              Indicadores Técnicos
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-2 pt-0">
                            <div className="grid grid-cols-4 gap-3">
                              {[
                                { name: "RSI (14)", value: "62.5", signal: "Neutral", color: "text-yellow-500" },
                                { name: "MACD", value: "0.15", signal: "Alcista", color: "text-emerald-500" },
                                { name: "SMA 20", value: "4.48", signal: "Por encima", color: "text-emerald-500" },
                                { name: "EMA 50", value: "4.35", signal: "Soporte", color: "text-emerald-500" },
                              ].map((ind, i) => (
                                <div key={i} className="p-2 bg-muted/30 rounded-lg text-center">
                                  <div className="text-[10px] text-muted-foreground">{ind.name}</div>
                                  <div className="text-sm font-bold">{ind.value}</div>
                                  <div className={`text-[10px] ${ind.color}`}>{ind.signal}</div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* MEJORA 3: Market Sentiment */}
                        <div className="grid lg:grid-cols-2 gap-3">
                          <Card>
                            <CardHeader className="pb-2 pt-3">
                              <CardTitle className="text-xs flex items-center gap-1">
                                <PieChartIcon className="w-3 h-3 text-purple-500" />
                                Sentimiento de Mercado
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2 pt-0">
                              <div className="flex items-center gap-4">
                                <div className="relative w-20 h-20">
                                  <svg viewBox="0 0 36 36" className="w-full h-full">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="65, 100" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#eab308" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-65" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="10, 100" strokeDashoffset="-90" />
                                  </svg>
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-sm font-bold">65%</span>
                                  </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-emerald-500" />
                                    <span className="text-xs">Alcista (65%)</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-yellow-500" />
                                    <span className="text-xs">Neutral (25%)</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded bg-red-500" />
                                    <span className="text-xs">Bajista (10%)</span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          {/* MEJORA 4: Price Alerts */}
                          <Card>
                            <CardHeader className="pb-2 pt-3">
                              <CardTitle className="text-xs flex items-center gap-1">
                                <Bell className="w-3 h-3 text-orange-500" />
                                Alertas de Precio Activas
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2 pt-0">
                              <div className="space-y-2">
                                {[
                                  { asset: "SAN", type: "Encima", price: "€4.60", status: "Activa" },
                                  { asset: "BBVA", type: "Debajo", price: "€12.50", status: "Activa" },
                                  { asset: "IBE", type: "Encima", price: "€13.80", status: "Disparada" },
                                ].map((alert, i) => (
                                  <div key={i} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="text-[10px]">{alert.asset}</Badge>
                                      <span className="text-xs">{alert.type} {alert.price}</span>
                                    </div>
                                    <Badge className={`text-[10px] ${alert.status === 'Disparada' ? 'bg-red-500' : 'bg-emerald-500'}`}>{alert.status}</Badge>
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        </div>

                        {/* MEJORA 5: News Feed */}
                        <Card>
                          <CardHeader className="pb-2 pt-3">
                            <CardTitle className="text-xs flex items-center gap-1">
                              <Newspaper className="w-3 h-3 text-yellow-500" />
                              Noticias Relevantes
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-2 pt-0">
                            <div className="grid grid-cols-3 gap-2">
                              {[
                                { title: "Banco Central mantiene tipos", source: "Bloomberg", time: "10:32", impact: "positive" },
                                { title: "IBEX abre con ganancias", source: "Expansión", time: "09:15", impact: "positive" },
                                { title: "Volatilidad baja en Europa", source: "Reuters", time: "08:45", impact: "neutral" },
                              ].map((news, i) => (
                                <div key={i} className="p-2 bg-muted/30 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                                  <div className="text-xs font-medium mb-1 line-clamp-2">{news.title}</div>
                                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                                    <span>{news.source}</span>
                                    <span>{news.time}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* Trading Panel Below Chart */}
                        <div className="grid lg:grid-cols-3 gap-3">
                          {/* Trading Predictions - Clickable to show on chart */}
                          <Card className="lg:col-span-2">
                            <CardHeader className="pb-2 pt-3">
                              <CardTitle className="text-xs flex items-center gap-1">
                                <Target className="w-3 h-3 text-emerald-500" />
                                Señales de Trading - Click para ver en gráfico
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2 pt-0">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {marketPredictions.map((pred) => {
                                  const company = ibexCompanies.find(c => c.ticker === pred.asset);
                                  return (
                                    <div
                                      key={pred.id}
                                      onClick={() => {
                                        if (company) {
                                          setSelectedIbexCompany(company.id);
                                          setSelectedPrediction(pred);
                                        }
                                      }}
                                      className={`p-2 rounded-lg cursor-pointer transition-all border ${selectedPrediction?.id === pred.id
                                        ? 'bg-emerald-500/20 border-emerald-500'
                                        : 'bg-muted/30 border-transparent hover:bg-muted/50'
                                        }`}
                                    >
                                      <div className="flex items-center justify-between mb-1">
                                        <div className="flex items-center gap-1">
                                          <Badge className={`text-[8px] h-4 ${pred.direction === 'long' ? 'bg-emerald-500' :
                                            pred.direction === 'short' ? 'bg-red-500' : 'bg-yellow-500'
                                            }`}>
                                            {pred.direction.toUpperCase()}
                                          </Badge>
                                          <span className="text-xs font-bold">{pred.asset}</span>
                                        </div>
                                        <span className={`text-[9px] ${pred.confidence >= 75 ? 'text-emerald-500' : pred.confidence >= 60 ? 'text-yellow-500' : 'text-red-500'}`}>
                                          {pred.confidence}%
                                        </span>
                                      </div>
                                      <div className="grid grid-cols-3 gap-1 text-[8px]">
                                        <div className="text-center">
                                          <span className="text-muted-foreground">Entry</span>
                                          <div className="font-bold">€{pred.entry.toFixed(2)}</div>
                                        </div>
                                        <div className="text-center">
                                          <span className="text-emerald-500">TP</span>
                                          <div className="font-bold text-emerald-500">€{pred.takeProfit.toFixed(2)}</div>
                                        </div>
                                        <div className="text-center">
                                          <span className="text-red-500">SL</span>
                                          <div className="font-bold text-red-500">€{pred.stopLoss.toFixed(2)}</div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </CardContent>
                          </Card>

                          {/* Quick Stats */}
                          <Card>
                            <CardHeader className="pb-2 pt-3">
                              <CardTitle className="text-xs flex items-center gap-1">
                                <Activity className="w-3 h-3 text-emerald-500" />
                                Info del Activo
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="p-2 pt-0">
                              {(() => {
                                const company = ibexCompanies.find(c => c.id === selectedIbexCompany);
                                const pred = selectedPrediction || marketPredictions.find(p => p.asset === company?.ticker);
                                if (!company) return null;

                                return (
                                  <div className="space-y-2">
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="p-2 bg-muted/30 rounded-lg">
                                        <div className="text-[9px] text-muted-foreground">Volumen</div>
                                        <div className="text-sm font-bold">{company.volume}</div>
                                      </div>
                                      <div className="p-2 bg-muted/30 rounded-lg">
                                        <div className="text-[9px] text-muted-foreground">Variación</div>
                                        <div className={`text-sm font-bold ${company.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                          {company.change >= 0 ? '+' : ''}{company.change.toFixed(1)}%
                                        </div>
                                      </div>
                                    </div>

                                    {pred && (
                                      <div className="p-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg border border-emerald-500/20">
                                        <div className="text-[10px] font-semibold mb-1">Señal Activa</div>
                                        <div className="flex items-center justify-between text-[9px]">
                                          <span>R/R Ratio</span>
                                          <span className="font-bold text-emerald-500">
                                            {((pred.takeProfit - pred.entry) / (pred.entry - pred.stopLoss)).toFixed(2)}
                                          </span>
                                        </div>
                                        <div className="flex items-center justify-between text-[9px]">
                                          <span>Expiración</span>
                                          <span className="font-medium">{pred.expiration}</span>
                                        </div>
                                      </div>
                                    )}

                                    <Button size="sm" className="w-full h-8 text-xs bg-emerald-500 hover:bg-emerald-600">
                                      <Zap className="w-3 h-3 mr-1" /> Nueva Predicción
                                    </Button>
                                  </div>
                                );
                              })()}
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </ResizablePanel>

            <ResizableHandle withHandle className="bg-emerald-500/20 hover:bg-emerald-500/40 transition-colors" />

            {/* Chat Panel */}
            <ResizablePanel defaultSize={30} minSize={25} maxSize={50} className="overflow-hidden p-2">
              <Card className="h-full flex flex-col shadow-lg" onMouseEnter={() => setCursorType('chat')} onMouseLeave={() => setCursorType('default')}>
                <CardHeader className="pb-2 border-b">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2">
                      <MessageSquareMore className={`w-4 h-4 ${panelMode === 'sme' ? 'text-blue-500' : 'text-emerald-500'}`} />
                      Chat con Agentes
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => { setChatFloating(!chatFloating); if (!chatFloating) setChatWidth(450); }} title="Ventana flotante">
                        {chatFloating ? <Minimize2 className="w-3 h-3" /> : <ExternalLink className="w-3 h-3" />}
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setChatExpanded(!chatExpanded)} title="Pantalla completa">
                        {chatExpanded ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                      </Button>
                    </div>
                  </div>

                  {/* Agent Selector - Bigger and Highlighted */}
                  <div className="mt-3">
                    {chatMode === "single" && (
                      <Select value={selectedAgent || ""} onValueChange={setSelectedAgent}>
                        <SelectTrigger className={`h-11 text-sm font-medium border-2 transition-colors ${panelMode === 'sme' ? 'border-blue-500/50 bg-blue-500/5 hover:bg-blue-500/10' : 'border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10'}`}>
                          <SelectValue placeholder="Seleccionar agente..." />
                        </SelectTrigger>
                        <SelectContent className="z-[100]">
                          {[...userAgents, ...smeAgents.map((a, i) => ({ ...a, id: `agent-sme-${i + 1}` }))].filter((a: any) => a.active || a.status === "activo").map((agent: any) => (
                            <SelectItem key={agent.id} value={agent.id} className="text-sm">
                              <div className="flex items-center gap-2">
                                <Bot className={`w-4 h-4 ${panelMode === 'sme' ? 'text-blue-500' : 'text-emerald-500'}`} />
                                <span className="font-medium">{agent.name}</span>
                                <Badge variant="outline" className="text-[10px] ml-auto">{agent.model ? agent.model.split(' ')[0] : 'IA'}</Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant={chatMode === "single" ? "default" : "ghost"} size="sm" onClick={() => setChatMode("single")} className={`h-8 text-xs ${chatMode === "single" ? (panelMode === 'sme' ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-500 hover:bg-emerald-600") : ""}`}>1:1</Button>
                      <Button variant={chatMode === "group" ? "default" : "ghost"} size="sm" onClick={() => setChatMode("group")} className={`h-8 text-xs ${chatMode === "group" ? (panelMode === 'sme' ? "bg-blue-600 hover:bg-blue-700" : "bg-emerald-500 hover:bg-emerald-600") : ""}`}><Users className="w-3 h-3 mr-1" /> Grupo</Button>
                    </div>
                  </div>

                  {chatMode === "group" && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {userAgents.filter((a: any) => a.active).slice(0, 4).map((agent: any) => (
                        <Badge key={agent.id} variant="secondary" className="text-[10px]">{agent.name}</Badge>
                      ))}
                    </div>
                  )}

                  {/* Selected Agent Info - Read only from config */}
                  {selectedAgent && chatMode === "single" && (() => {
                    const agent = userAgents.find((a: any) => a.id === selectedAgent);
                    if (!agent) return null;
                    return (
                      <div className="mt-2 p-2 bg-muted/50 rounded-lg border">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-emerald-600">{agent.name}</span>
                          <Badge variant="outline" className="text-[10px]">{agent.model}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                          <span>Temp: <span className="font-medium text-foreground">{agent.config.temperatura}</span></span>
                          <span>Tokens: <span className="font-medium text-foreground">{agent.config.maxTokens.toLocaleString()}</span></span>
                          <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500" />Activo</span>
                        </div>
                      </div>
                    );
                  })()}
                </CardHeader>

                <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[85%] rounded-xl p-3 ${msg.role === "user" ? (panelMode === 'sme' ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-emerald-500 text-white") : "bg-muted border"}`}>
                        {msg.agent && (
                          <div className={`text-[11px] font-bold mb-1 flex items-center gap-1 ${panelMode === 'sme' ? 'text-blue-600' : 'text-emerald-600'}`}>
                            <Bot className="w-3 h-3" />
                            {msg.agent}
                          </div>
                        )}
                        <div className="text-sm">{msg.content}</div>
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef} />
                </CardContent>

                <CardFooter className="p-2 border-t gap-1 bg-slate-50/50">
                  <Input placeholder="Escribe un mensaje..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && handleSendMessage()} className={`flex-1 h-10 text-sm ${panelMode === 'sme' ? 'border-blue-100 focus-visible:ring-blue-500' : ''}`} />
                  <Button size="icon" onClick={handleSendMessage} className={`h-10 w-10 shrink-0 ${panelMode === 'sme' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 shadow-lg' : 'bg-emerald-500 hover:bg-emerald-600'}`}><Send className="w-4 h-4" /></Button>
                  <Button variant="outline" size="icon" className="h-10 w-10" onClick={() => setChatMessages([{ role: "assistant", content: "¡Hola! Soy tu asistente. ¿Enqué puedo ayudarte?", agent: "Sistema" }])}><Trash2 className="w-4 h-4" /></Button>
                </CardFooter>
              </Card>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>

      {/* Agent History Modal */}
      <AnimatePresence>
        {showAgentHistory && selectedAgentHistory && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedAgentHistory.name}</h3>
                    <p className="text-xs text-muted-foreground">Historial y registro de acciones</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowAgentHistory(false)}><X className="w-4 h-4" /></Button>
              </div>

              <Tabs defaultValue="acciones" className="flex-1 overflow-hidden">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="acciones">Registro de Acciones</TabsTrigger>
                  <TabsTrigger value="chat">Historial de Chat</TabsTrigger>
                </TabsList>
                <TabsContent value="acciones" className="mt-4 overflow-y-auto max-h-[50vh]">
                  <div className="space-y-2">
                    {[
                      { time: "Hoy 14:32", action: "Análisis de portfolio completado", type: "analisis", status: "success" },
                      { time: "Hoy 12:15", action: "Email enviado a Banco Santander", type: "email", status: "success" },
                      { time: "Hoy 10:00", action: "Llamada programada con BBVA", type: "call", status: "pending" },
                      { time: "Ayer 16:45", action: "Informe semanal generado", type: "report", status: "success" },
                      { time: "Ayer 14:20", action: "Sincronización con Salesforce", type: "sync", status: "success" },
                      { time: "Ayer 09:30", action: "Alerta de mercado detectada", type: "alert", status: "warning" },
                      { time: "15 Ene 18:00", action: "Reunión con cliente CaixaBank", type: "meeting", status: "success" },
                      { time: "15 Ene 11:45", action: "Predicción de riesgo actualizada", type: "prediction", status: "success" },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${log.type === 'email' ? 'bg-blue-500/20' :
                          log.type === 'call' ? 'bg-green-500/20' :
                            log.type === 'analisis' ? 'bg-purple-500/20' :
                              log.type === 'report' ? 'bg-orange-500/20' :
                                log.type === 'alert' ? 'bg-yellow-500/20' : 'bg-emerald-500/20'
                          }`}>
                          {log.type === 'email' ? <Mail className="w-4 h-4 text-blue-500" /> :
                            log.type === 'call' ? <Phone className="w-4 h-4 text-green-500" /> :
                              log.type === 'analisis' ? <BarChart3 className="w-4 h-4 text-purple-500" /> :
                                log.type === 'report' ? <FileText className="w-4 h-4 text-orange-500" /> :
                                  log.type === 'alert' ? <AlertTriangle className="w-4 h-4 text-yellow-500" /> :
                                    <Check className="w-4 h-4 text-emerald-500" />}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm">{log.action}</p>
                          <p className="text-[10px] text-muted-foreground">{log.time}</p>
                        </div>
                        <Badge variant="outline" className={`text-[10px] ${log.status === 'success' ? 'border-emerald-500 text-emerald-500' : 'border-yellow-500 text-yellow-500'}`}>
                          {log.status === 'success' ? 'Completado' : 'Pendiente'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="chat" className="mt-4 overflow-y-auto max-h-[50vh]">
                  <div className="space-y-3">
                    {[
                      { role: "user", content: "¿Cuál es el estado actual del portfolio de Banco Santander?", time: "Hoy 14:30" },
                      { role: "assistant", content: "El portfolio de Banco Santander muestra un rendimiento positivo del 12.3% en lo que va de año. Las principales posiciones están en sectores financieros y tecnológicos. Te recomiendo revisar la exposición a mercados emergentes.", time: "Hoy 14:30" },
                      { role: "user", content: "Genera un informe detallado para enviar al cliente", time: "Hoy 14:32" },
                      { role: "assistant", content: "He generado el informe detallado en formato PDF y lo he preparado para envío. ¿Deseas que lo envíe directamente al contacto principal o prefieres revisarlo primero?", time: "Hoy 14:32" },
                    ].map((msg, i) => (
                      <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-xl p-3 ${msg.role === 'user' ? 'bg-emerald-500 text-white' : 'bg-muted'}`}>
                          <p className="text-sm">{msg.content}</p>
                          <p className="text-[10px] opacity-70 mt-1">{msg.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Client Detail Modal */}
      <AnimatePresence>
        {showClientDetail && selectedClientDetail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background rounded-2xl p-6 max-w-3xl w-full max-h-[85vh] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-lg font-bold">
                    {selectedClientDetail.name?.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedClientDetail.name}</h3>
                    <p className="text-xs text-muted-foreground">{selectedClientDetail.email}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowClientDetail(false)}><X className="w-4 h-4" /></Button>
              </div>

              <Tabs defaultValue="interacciones" className="flex-1 overflow-hidden">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="interacciones">Interacciones</TabsTrigger>
                  <TabsTrigger value="equipo">Equipo</TabsTrigger>
                  <TabsTrigger value="vinculaciones">Vinculaciones</TabsTrigger>
                </TabsList>
                <TabsContent value="interacciones" className="mt-4 overflow-y-auto max-h-[55vh]">
                  <div className="space-y-3">
                    {(selectedClientDetail.interactions || []).length > 0 ? selectedClientDetail.interactions.map((int: any, i: number) => (
                      <Card key={i} className="p-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${int.type === 'email' ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                            {int.type === 'email' ? <Mail className="w-5 h-5 text-blue-500" /> : <Phone className="w-5 h-5 text-green-500" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline" className="text-xs">{int.type === 'email' ? 'Email' : 'Llamada'}</Badge>
                              <span className="text-xs text-muted-foreground">{int.date}</span>
                            </div>
                            <p className="text-sm">{int.summary}</p>
                          </div>
                        </div>
                      </Card>
                    )) : (
                      <div className="text-center text-muted-foreground py-8">Sin interacciones registradas</div>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="equipo" className="mt-4 overflow-y-auto max-h-[55vh]">
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { name: "Juan García", position: "CEO", email: "jgarcia@empresa.es", phone: "+34 612 345 678" },
                      { name: "María López", position: "CFO", email: "mlopez@empresa.es", phone: "+34 623 456 789" },
                      { name: "Carlos Ruiz", position: "CTO", email: "cruiz@empresa.es", phone: "+34 634 567 890" },
                      { name: "Ana Martínez", position: "Directora Financiera", email: "amartinez@empresa.es", phone: "+34 645 678 901" },
                    ].map((member, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-sm">{member.name}</p>
                            <p className="text-xs text-muted-foreground">{member.position}</p>
                            <div className="flex gap-2 mt-1">
                              <Button variant="ghost" size="icon" className="h-6 w-6"><Mail className="w-3 h-3" /></Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6"><Phone className="w-3 h-3" /></Button>
                              <Button variant="ghost" size="icon" className="h-6 w-6"><Linkedin className="w-3 h-3" /></Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="vinculaciones" className="mt-4 overflow-y-auto max-h-[55vh]">
                  <div className="space-y-3">
                    {[
                      { company: "Empresa Holding A", role: "Matriz", stake: "100%" },
                      { company: "Filial Norte S.L.", role: "Filial", stake: "75%" },
                      { company: "Joint Venture IB", role: "Asociada", stake: "50%" },
                      { company: "Startup FinTech X", role: "Inversora", stake: "15%" },
                    ].map((vinc, i) => (
                      <Card key={i} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Building className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium text-sm">{vinc.company}</p>
                              <p className="text-xs text-muted-foreground">{vinc.role}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">{vinc.stake}</Badge>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Call Modal */}
      <AnimatePresence>
        {showCallModal && selectedClient && (
          <CallModal
            client={selectedClient}
            agent={userAgents.find(a => a.id === selectedClient.agent)}
            onClose={() => setShowCallModal(false)}
            onLogCall={logCall}
          />
        )}
      </AnimatePresence>

      {/* SME Appointment Modal */}
      <AnimatePresence>
        {showSmeAppointmentModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background rounded-2xl p-6 max-w-sm w-full border-2 border-blue-500/20">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-blue-600">Nueva Cita</h3>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowSmeAppointmentModal(false)}><X className="w-4 h-4" /></Button>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <Label className="text-xs">Cliente</Label>
                  <Input value={newSmeAppointment.client} onChange={e => setNewSmeAppointment({ ...newSmeAppointment, client: e.target.value })} placeholder="Nombre del cliente" className="border-blue-100" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-xs">Fecha</Label>
                    <Input type="date" value={newSmeAppointment.date} onChange={e => setNewSmeAppointment({ ...newSmeAppointment, date: e.target.value })} className="border-blue-100" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs">Hora</Label>
                    <Input type="time" value={newSmeAppointment.time} onChange={e => setNewSmeAppointment({ ...newSmeAppointment, time: e.target.value })} className="border-blue-100" />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Tipo de Servicio</Label>
                  <Select value={newSmeAppointment.type} onValueChange={v => setNewSmeAppointment({ ...newSmeAppointment, type: v })}>
                    <SelectTrigger className="border-blue-100"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Consulta">Consulta</SelectItem>
                      <SelectItem value="Revisión">Revisión</SelectItem>
                      <SelectItem value="Presupuesto">Presupuesto</SelectItem>
                      <SelectItem value="Venta">Venta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1" onClick={() => setShowSmeAppointmentModal(false)}>Cancelar</Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={() => {
                    setSmeAppointments([...smeAppointments, { ...newSmeAppointment, id: Date.now(), status: 'confirmed' }]);
                    setShowSmeAppointmentModal(false);
                  }}>Agendar</Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (selectedClient || emailTo) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-background rounded-2xl p-6 max-w-lg w-full">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl ${panelMode === 'sme' ? 'bg-blue-500' : 'bg-emerald-500'} flex items-center justify-center text-white`}>
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Nuevo Email</h3>
                    <p className="text-xs text-muted-foreground">{selectedClient?.name || emailTo}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowEmailModal(false)}><X className="w-4 h-4" /></Button>
              </div>

              <div className="space-y-3">
                <div>
                  <Label className="text-xs">Para</Label>
                  <Input value={selectedClient?.email || emailTo} readOnly className="mt-1 h-9 bg-muted/50" />
                </div>
                <div>
                  <Label className="text-xs">Asunto</Label>
                  <Input value={emailContent.subject} onChange={(e) => setEmailContent({ ...emailContent, subject: e.target.value })} placeholder="Asunto del email..." className="mt-1 h-9" />
                </div>
                <div>
                  <Label className="text-xs">Mensaje</Label>
                  <Textarea value={emailContent.body} onChange={(e) => setEmailContent({ ...emailContent, body: e.target.value })} placeholder="Escribe tu mensaje..." className="mt-1 h-32" />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="gap-1" onClick={handleAgentWriteEmail} disabled={agentWritingEmail}>
                    <Bot className="w-3 h-3" />
                    {agentWritingEmail ? "Escribiendo..." : "Agente escribe"}
                  </Button>
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowEmailModal(false)}>Cancelar</Button>
                <Button className={`flex-1 ${panelMode === 'sme' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20 shadow-lg' : 'bg-emerald-500 hover:bg-emerald-600'} gap-1`} onClick={sendEmail}>
                  <Send className="w-4 h-4" /> Enviar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic Cursor - Small Icon Near Pointer */}
      <div
        className="fixed pointer-events-none z-[9999]"
        style={{
          left: mousePos.x + 12,
          top: mousePos.y + 12,
        }}
      >
        {cursorType === 'agent' && (
          <div className="w-4 h-4 rounded bg-purple-500 flex items-center justify-center shadow-sm">
            <Bot className="w-2.5 h-2.5 text-white" />
          </div>
        )}
        {cursorType === 'chat' && (
          <div className="w-4 h-4 rounded bg-blue-500 flex items-center justify-center shadow-sm">
            <MessageSquare className="w-2.5 h-2.5 text-white" />
          </div>
        )}
        {cursorType === 'data' && (
          <div className="w-4 h-4 rounded bg-cyan-500 flex items-center justify-center shadow-sm">
            <Database className="w-2.5 h-2.5 text-white" />
          </div>
        )}
        {cursorType === 'action' && (
          <div className="w-4 h-4 rounded bg-orange-500 flex items-center justify-center shadow-sm">
            <Zap className="w-2.5 h-2.5 text-white" />
          </div>
        )}
        {cursorType === 'client' && (
          <div className="w-4 h-4 rounded bg-pink-500 flex items-center justify-center shadow-sm">
            <User className="w-2.5 h-2.5 text-white" />
          </div>
        )}
        {cursorType === 'edit' && (
          <div className="w-4 h-4 rounded bg-yellow-500 flex items-center justify-center shadow-sm">
            <Edit className="w-2.5 h-2.5 text-black" />
          </div>
        )}
      </div>
    </div>
  );
}

// Footer
function Footer({ setCurrentView }: { setCurrentView: (v: ViewType) => void }) {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12 px-4 text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">FinAI Pro</span>
          </div>
          <p className="max-w-md"> Transformando el sector financiero español a través de automatización inteligente y agentes de IA observacionales de última generación. </p>
          <div className="flex gap-4 pt-4">
            <a href="#" className="hover:text-emerald-400 transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="hover:text-emerald-400 transition-colors"><Linkedin className="w-5 h-5" /></a>
            <a href="#" className="hover:text-emerald-400 transition-colors"><Globe className="w-5 h-5" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Producto</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setCurrentView("configuracion")} className="hover:text-emerald-400 transition-colors">Solicitar Demo</button></li>
            <li><button onClick={() => setCurrentView("login")} className="hover:text-emerald-400 transition-colors">Iniciar sesión (Guest)</button></li>
            <li><a href="#precios" className="hover:text-emerald-400 transition-colors">Precios</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-4">Compañía</h4>
          <ul className="space-y-2">
            <li><button onClick={() => setCurrentView("equipo")} className="hover:text-emerald-400 transition-colors">Equipo de Expertos</button></li>
            <li><button onClick={() => setCurrentView("legal")} className="hover:text-emerald-400 transition-colors">Aviso Legal y Privacidad</button></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-800 text-sm text-center">
        <p>© {new Date().getFullYear()} FinAI Pro Solutions, S.L. Todos los derechos reservados. CIF: B-87654321</p>
        <p className="mt-2 text-slate-500">Madrid, España</p>
      </div>
    </footer>
  );
}

// Login Page Component
function LoginPage({ setCurrentView }: { setCurrentView: (v: ViewType) => void }) {
  return (
    <div className="min-h-screen pt-32 pb-20 flex flex-col justify-center items-center bg-muted/30">
      <Card className="w-full max-w-md shadow-2xl border-none">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">Acceso a Panel</CardTitle>
          <CardDescription>Inicia sesión o entra como visitante</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email corporativo</label>
              <input type="email" placeholder="admin@empresa.com" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contraseña</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
            </div>
            <Button
              className="w-full py-6 text-base shadow-lg shadow-emerald-500/20 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 transition-all font-semibold"
              onClick={() => setCurrentView("panel")}
            >
              Iniciar Sesión Seguro
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-muted"></span></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-muted px-2 text-muted-foreground rounded-full">Accesos directos</span></div>
          </div>

          <Button
            variant="outline"
            className="w-full py-6 text-base hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200 transition-colors"
            onClick={() => setCurrentView("panel")}
          >
            <User className="w-5 h-5 mr-2" /> Entrar como Visitante
          </Button>
          <p className="text-xs text-center text-muted-foreground pt-2">
            El modo visitante no asocia datos a la base de datos ni requiere registro.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Main App
export default function Home() {
  const { currentView, setCurrentView, formData, setFormData } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col">
      <style jsx global>{`
        @keyframes wave {
          0%, 100% { height: 4px; opacity: 0.3; }
          50% { height: 20px; opacity: 1; }
        }
        @keyframes grow {
          0%, 100% { transform: scaleY(0.5); }
          50% { transform: scaleY(1.5); }
        }
        .animate-grow-1 { animation: grow 1s ease-in-out infinite; }
        .animate-grow-2 { animation: grow 1s ease-in-out infinite 0.2s; }
        .animate-grow-3 { animation: grow 1s ease-in-out infinite 0.4s; }
      `}</style>
      {currentView !== "panel" && <Navbar currentView={currentView} setCurrentView={setCurrentView} />}
      <main className={`flex-1 ${currentView === "panel" ? "" : ""}`}>
        <AnimatePresence mode="wait">
          {currentView === "landing" && (
            <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HeroSection setCurrentView={setCurrentView} />
              <ServicesSection />
              <InvestorSection />
              <DashboardDemoSection />
              <PricingSection setCurrentView={setCurrentView} />
            </motion.div>
          )}
          {currentView === "configuracion" && (
            <motion.div key="configuracion" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ConfigWizardPage setCurrentView={setCurrentView} formData={formData} setFormData={setFormData} />
            </motion.div>
          )}
          {currentView === "panel" && (
            <motion.div key="panel" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <DashboardPanel setCurrentView={setCurrentView} formData={formData} setFormData={setFormData} />
            </motion.div>
          )}
          {currentView === "equipo" && (
            <motion.div key="equipo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <TeamPage setCurrentView={setCurrentView} />
            </motion.div>
          )}
          {currentView === "legal" && (
            <motion.div key="legal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LegalPage setCurrentView={setCurrentView} />
            </motion.div>
          )}
          {currentView === "target" && (
            <motion.div key="target" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="pt-16">
                <TargetDashboardDemo />
              </div>
            </motion.div>
          )}
          {currentView === "login" && (
            <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <LoginPage setCurrentView={setCurrentView} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      {currentView !== "panel" && <Footer setCurrentView={setCurrentView} />}
      {currentView !== "panel" && <SupportChat />}
    </div>
  );
}
