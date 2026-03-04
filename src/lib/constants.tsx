// Wizard Steps
export const WIZARD_STEPS = [
  { id: 1, title: "Contacto", icon: "User" },
  { id: 2, title: "Empresa", icon: "Building2" },
  { id: 3, title: "Funciones", icon: "Settings" },
  { id: 4, title: "Agentes", icon: "Bot" },
  { id: 5, title: "Modelos IA", icon: "Brain" },
  { id: 6, title: "Integraciones", icon: "Webhook" },
  { id: 7, title: "Objetivos", icon: "Target" },
  { id: 8, title: "Contrato", icon: "FileSignature" },
];

// AI Models available
export const AI_MODELS = [
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
export const MCP_INTEGRATIONS = [
  { id: "slack", name: "Slack", icon: "MessageSquare", category: "Comunicación", description: "Notificaciones y comandos en canales" },
  { id: "notion", name: "Notion", icon: "Layers", category: "Productividad", description: "Crear y actualizar páginas, bases de datos" },
  { id: "github", name: "GitHub", icon: "Code", category: "Desarrollo", description: "Issues, PRs, repositorios" },
  { id: "jira", name: "Jira", icon: "Briefcase", category: "Gestión", description: "Tickets, sprints, workflows" },
  { id: "linear", name: "Linear", icon: "Zap", category: "Gestión", description: "Issues y proyectos ágiles" },
  { id: "asana", name: "Asana", icon: "Check", category: "Gestión", description: "Tareas y proyectos" },
  { id: "trello", name: "Trello", icon: "Layers", category: "Gestión", description: "Boards, lists y cards" },
  { id: "salesforce", name: "Salesforce", icon: "Users", category: "CRM", description: "Leads, oportunidades, cuentas" },
  { id: "hubspot", name: "HubSpot", icon: "Target", category: "CRM", description: "Marketing, ventas, service" },
  { id: "intercom", name: "Intercom", icon: "MessageCircle", category: "Soporte", description: "Chat y mensajes a usuarios" },
  { id: "zendesk", name: "Zendesk", icon: "HeadphonesIcon", category: "Soporte", description: "Tickets de soporte" },
  { id: "figma", name: "Figma", icon: "Palette", category: "Diseño", description: "Diseños y prototipos" },
  { id: "miro", name: "Miro", icon: "PieChart", category: "Colaboración", description: "Boards y diagramas" },
  { id: "vercel", name: "Vercel", icon: "Globe", category: "Infraestructura", description: "Deployments y logs" },
  { id: "aws", name: "AWS", icon: "Database", category: "Infraestructura", description: "Servicios cloud AWS" },
];

// News Sources
export const NEWS_SOURCES = [
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

// Agent Roles Configuration
export const AGENT_ROLES = [
  { id: "inversor", name: "Agente Inversor", icon: "TrendingUp", description: "Análisis de inversiones y portfolio" },
  { id: "marketing", name: "Agente de Marketing", icon: "Megaphone", description: "Campañas y estrategias de marketing" },
  { id: "finanzas", name: "Agente de Finanzas", icon: "DollarSign", description: "Gestión financiera y presupuestos" },
  { id: "rrhh", name: "Agente de RRHH", icon: "Users", description: "Recursos humanos y talento" },
  { id: "it", name: "Agente de IT", icon: "Cpu", description: "Soporte técnico y sistemas" },
  { id: "ventas", name: "Agente de Ventas", icon: "Target", description: "Pipeline y cierre de ventas" },
  { id: "legal", name: "Agente Legal", icon: "Scale", description: "Cumplimiento normativo y contratos" },
  { id: "operaciones", name: "Agente de Operaciones", icon: "Settings", description: "Procesos operativos y logística" },
  { id: "atencion", name: "Agente de Atención", icon: "HeadphonesIcon", description: "Soporte al cliente y helpdesk" },
  { id: "datos", name: "Agente de Datos", icon: "Database", description: "Análisis de datos y reporting" },
];

// Product Contracts Data
export const PRODUCT_CONTRACTS: Record<string, {
  precio: string;
  empleados: string;
  agentes: string;
  caracteristicas: string[];
  condiciones: string[];
}> = {
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
