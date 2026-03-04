"use client";

import React from 'react';
import {
    BarChart3,
    Calendar as CalendarIcon,
    Users,
    Phone,
    MousePointerClick,
    Search,
    Globe,
    FileSpreadsheet,
    TrendingUp,
    Clock,
    DollarSign,
    ShoppingCart,
    Star,
    MessageSquare,
    Instagram,
    Linkedin,
    MapPin,
    Target,
    Zap,
    Award,
    ArrowUpRight,
    Percent,
    Building2,
    Sparkles,
    TrendingDown,
    CreditCard,
    Wallet,
    PieChart,
    BarChart2,
    LineChart,
    ArrowDownRight,
    Briefcase
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar, PieChart as RechartsPie, Pie, Cell } from "recharts";

const chartConfig = { 
    valor: { label: "Volumen" }, 
    roi: { label: "Conversión %" },
    facturacion: { label: "Facturación" },
    clientes: { label: "Clientes" }
} satisfies ChartConfig;

// Helper para formatear números de forma consistente (evita errores de hidratación)
const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatCurrency = (num: number): string => {
    return `€${formatNumber(num)}`;
};

export function SmeDashboardDemo() {
    // Datos simulados extraídos de un CSV
    const csvDataAnalytics = [
        { mes: "Ene", impresiones: 12000, seo: 4500, sem: 2000, llamadas: 145, leads: 320, conversion: 2.1 },
        { mes: "Feb", impresiones: 15400, seo: 5100, sem: 3500, llamadas: 180, leads: 410, conversion: 2.4 },
        { mes: "Mar", impresiones: 18900, seo: 5800, sem: 4200, llamadas: 215, leads: 505, conversion: 2.8 },
        { mes: "Abr", impresiones: 22100, seo: 6300, sem: 5100, llamadas: 260, leads: 630, conversion: 3.2 },
        { mes: "May", impresiones: 26500, seo: 7200, sem: 6800, llamadas: 310, leads: 780, conversion: 3.5 },
        { mes: "Jun", impresiones: 31000, seo: 8500, sem: 8200, llamadas: 385, leads: 950, conversion: 4.1 },
    ];

    // Datos de resumen PYME - Negocio
    const smeBusinessData = {
        facturacionMensual: 28500,
        facturacionAnterior: 24200,
        clientesActivos: 87,
        clientesNuevos: 12,
        clientesPerdidos: 3,
        ticketMedio: 327,
        tasaRetencion: 94,
        pedidosMes: 156,
        pedidosAnterior: 132,
        gastosMes: 15200,
        beneficioNeto: 13300,
        margen: 46.7
    };

    // Datos de redes sociales
    const socialMediaData = {
        instagram: { seguidores: 1245, alcance: 8500, interacciones: 423, publicaciones: 18, engagement: 4.9 },
        linkedin: { conexiones: 380, impresiones: 4200, interacciones: 156, publicaciones: 8, engagement: 3.7 },
        googleBusiness: { vistas: 3200, llamadas: 45, direcciones: 28, reseñas: 4.7, totalReseñas: 28 }
    };

    // Datos para gráficos
    const facturacionData = [
        { mes: "Ene", facturacion: 18500, clientes: 65 },
        { mes: "Feb", facturacion: 21200, clientes: 70 },
        { mes: "Mar", facturacion: 22800, clientes: 75 },
        { mes: "Abr", facturacion: 24500, clientes: 79 },
        { mes: "May", facturacion: 26100, clientes: 82 },
        { mes: "Jun", facturacion: 28500, clientes: 87 },
    ];

    const canalesData = [
        { name: "Web", value: 35, color: "#3b82f6" },
        { name: "Redes", value: 28, color: "#8b5cf6" },
        { name: "Recomendación", value: 22, color: "#10b981" },
        { name: "Publicidad", value: 15, color: "#f59e0b" },
    ];

    // Tendencias de ventas
    const ventasSemana = [
        { dia: "L", valor: 85 },
        { dia: "M", valor: 92 },
        { dia: "X", valor: 78 },
        { dia: "J", valor: 110 },
        { dia: "V", valor: 125 },
        { dia: "S", valor: 65 },
        { dia: "D", valor: 45 },
    ];

    // Cálculos de variación
    const varFacturacion = ((smeBusinessData.facturacionMensual - smeBusinessData.facturacionAnterior) / smeBusinessData.facturacionAnterior * 100).toFixed(1);
    const varPedidos = ((smeBusinessData.pedidosMes - smeBusinessData.pedidosAnterior) / smeBusinessData.pedidosAnterior * 100).toFixed(1);

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-4 text-slate-900 dark:text-slate-100 h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                            <Building2 className="w-6 h-6 text-blue-600" />
                            Dashboard PYME
                        </h1>
                        <p className="text-slate-500 text-xs">Resumen ejecutivo para tu negocio</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200">
                            <Sparkles className="w-3 h-3 mr-1" /> Plan Activo
                        </Badge>
                        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                            <FileSpreadsheet className="w-3 h-3 mr-1" /> CSV Activo
                        </Badge>
                    </div>
                </div>

                {/* ===== SECCIÓN RESUMEN EJECUTIVO PYME ===== */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Target className="w-5 h-5 text-blue-500" />
                            Resumen Ejecutivo
                        </h2>
                        <Badge variant="secondary" className="text-xs">Junio 2024</Badge>
                    </div>

                    {/* KPIs Principales PYME - 6 tarjetas */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Facturación */}
                        <Card className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/30 dark:to-green-950/30 border-emerald-200 dark:border-emerald-800">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                                            <DollarSign className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block">Facturación Mensual</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">
                                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> +{varFacturacion}%
                                    </Badge>
                                </div>
                                <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-400">
                                    {formatCurrency(smeBusinessData.facturacionMensual)}
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-slate-500">vs {formatCurrency(smeBusinessData.facturacionAnterior)} mes ant.</span>
                                    <div className="flex items-center gap-1 text-emerald-600">
                                        <TrendingUp className="w-3 h-3" />
                                        <span className="text-xs font-medium">+{formatCurrency(smeBusinessData.facturacionMensual - smeBusinessData.facturacionAnterior)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Beneficio Neto */}
                        <Card className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-950/30 dark:to-cyan-950/30 border-teal-200 dark:border-teal-800">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center">
                                            <Wallet className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block">Beneficio Neto</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-teal-100 text-teal-700 text-[10px]">
                                        Margen {smeBusinessData.margen}%
                                    </Badge>
                                </div>
                                <div className="text-3xl font-bold text-teal-700 dark:text-teal-400">
                                    {formatCurrency(smeBusinessData.beneficioNeto)}
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-slate-500">Gastos: {formatCurrency(smeBusinessData.gastosMes)}</span>
                                    <div className="w-20 h-1.5 bg-teal-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-teal-500 rounded-full" style={{ width: `${smeBusinessData.margen}%` }} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Clientes Activos */}
                        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-800">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                                            <Users className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block">Clientes Activos</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-700 text-[10px]">
                                        +{smeBusinessData.clientesNuevos} nuevos
                                    </Badge>
                                </div>
                                <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                                    {smeBusinessData.clientesActivos}
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs text-slate-500">Retención: {smeBusinessData.tasaRetencion}%</span>
                                    <span className="text-xs text-red-500">-{smeBusinessData.clientesPerdidos} perdidos</span>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Ticket Medio */}
                        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                                            <CreditCard className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block">Ticket Medio</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-purple-100 text-purple-700 text-[10px]">
                                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> +8%
                                    </Badge>
                                </div>
                                <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">
                                    {formatCurrency(smeBusinessData.ticketMedio)}
                                </div>
                                <div className="text-xs text-slate-500 mt-2">
                                    Por transacción
                                </div>
                            </CardContent>
                        </Card>

                        {/* Pedidos/Citas */}
                        <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center">
                                            <ShoppingCart className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block">Pedidos/Citas</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-amber-100 text-amber-700 text-[10px]">
                                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> +{varPedidos}%
                                    </Badge>
                                </div>
                                <div className="text-3xl font-bold text-amber-700 dark:text-amber-400">
                                    {smeBusinessData.pedidosMes}
                                </div>
                                <div className="text-xs text-slate-500 mt-2">
                                    Este mes • Promedio {Math.round(smeBusinessData.pedidosMes / 30)}/día
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tasa de Conversión */}
                        <Card className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30 border-rose-200 dark:border-rose-800">
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center">
                                            <Percent className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-xs text-slate-600 dark:text-slate-400 font-medium block">Tasa Conversión</span>
                                        </div>
                                    </div>
                                    <Badge className="bg-rose-100 text-rose-700 text-[10px]">
                                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> +0.3%
                                    </Badge>
                                </div>
                                <div className="text-3xl font-bold text-rose-700 dark:text-rose-400">
                                    4.1%
                                </div>
                                <div className="text-xs text-slate-500 mt-2">
                                    39 de 950 leads convertidos
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Segunda fila: Gráficos */}
                    <div className="grid lg:grid-cols-3 gap-4">
                        {/* Evolución Facturación y Clientes */}
                        <Card className="lg:col-span-2 shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <BarChart2 className="w-4 h-4 text-emerald-500" />
                                    Evolución Facturación y Clientes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-44 w-full">
                                    <AreaChart data={facturacionData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <XAxis dataKey="mes" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis yAxisId="left" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `€${v/1000}k`} />
                                        <YAxis yAxisId="right" orientation="right" fontSize={10} tickLine={false} axisLine={false} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area yAxisId="left" type="monotone" dataKey="facturacion" name="Facturación" stroke="#10b981" fill="#10b981" fillOpacity={0.2} strokeWidth={2} />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        {/* Canales de Adquisición */}
                        <Card className="shadow-sm">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex items-center gap-2">
                                    <PieChart className="w-4 h-4 text-purple-500" />
                                    Canales de Clientes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-36 w-full">
                                    <RechartsPie>
                                        <Pie
                                            data={canalesData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={25}
                                            outerRadius={50}
                                            paddingAngle={2}
                                            dataKey="value"
                                        >
                                            {canalesData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                    </RechartsPie>
                                </ChartContainer>
                                <div className="grid grid-cols-2 gap-1 mt-2">
                                    {canalesData.map((canal) => (
                                        <div key={canal.name} className="flex items-center gap-1 text-[10px]">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: canal.color }} />
                                            <span className="text-slate-600 dark:text-slate-400">{canal.name}: {canal.value}%</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Tercera fila: Métricas adicionales */}
                    <div className="grid sm:grid-cols-4 gap-3">
                        <Card className="bg-white dark:bg-slate-900 shadow-sm p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Clock className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-medium">Horas Ahorradas</span>
                            </div>
                            <div className="text-xl font-bold text-blue-600">47h</div>
                            <Progress value={78} className="h-1.5 mt-1" />
                            <div className="text-[10px] text-slate-500 mt-1">78% del objetivo mensual</div>
                        </Card>
                        <Card className="bg-white dark:bg-slate-900 shadow-sm p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <MessageSquare className="w-4 h-4 text-purple-500" />
                                <span className="text-xs font-medium">Respuestas Auto</span>
                            </div>
                            <div className="text-xl font-bold text-purple-600">892</div>
                            <Progress value={92} className="h-1.5 mt-1" />
                            <div className="text-[10px] text-slate-500 mt-1">92% tasa satisfacción</div>
                        </Card>
                        <Card className="bg-white dark:bg-slate-900 shadow-sm p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Phone className="w-4 h-4 text-emerald-500" />
                                <span className="text-xs font-medium">Llamadas Gest.</span>
                            </div>
                            <div className="text-xl font-bold text-emerald-600">156</div>
                            <Progress value={85} className="h-1.5 mt-1" />
                            <div className="text-[10px] text-slate-500 mt-1">85% tasa éxito</div>
                        </Card>
                        <Card className="bg-white dark:bg-slate-900 shadow-sm p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Award className="w-4 h-4 text-amber-500" />
                                <span className="text-xs font-medium">ROI Agentes</span>
                            </div>
                            <div className="text-xl font-bold text-amber-600">3.2x</div>
                            <Progress value={65} className="h-1.5 mt-1" />
                            <div className="text-[10px] text-slate-500 mt-1">€3.2 por €1 invertido</div>
                        </Card>
                    </div>
                </div>

                {/* ===== SECCIÓN REDES SOCIALES ===== */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Instagram className="w-5 h-5 text-pink-500" />
                            Redes Sociales
                        </h2>
                        <Badge variant="outline" className="text-xs">Últimos 30 días</Badge>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4">
                        {/* Instagram */}
                        <Card className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20 border-pink-200 dark:border-pink-800">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                                        <Instagram className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">Instagram</div>
                                        <div className="text-xs text-slate-500">@tu_empresa</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-lg font-bold text-pink-600">{formatNumber(socialMediaData.instagram.seguidores)}</div>
                                        <div className="text-[10px] text-slate-500">Seguidores</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-purple-600">{formatNumber(socialMediaData.instagram.alcance)}</div>
                                        <div className="text-[10px] text-slate-500">Alcance</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-pink-600">{formatNumber(socialMediaData.instagram.interacciones)}</div>
                                        <div className="text-[10px] text-slate-500">Interacciones</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-purple-600">{socialMediaData.instagram.engagement}%</div>
                                        <div className="text-[10px] text-slate-500">Engagement</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* LinkedIn */}
                        <Card className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-blue-950/20 dark:to-sky-950/20 border-blue-200 dark:border-blue-800">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                                        <Linkedin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">LinkedIn</div>
                                        <div className="text-xs text-slate-500">Página empresa</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-lg font-bold text-blue-600">{formatNumber(socialMediaData.linkedin.conexiones)}</div>
                                        <div className="text-[10px] text-slate-500">Conexiones</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-sky-600">{formatNumber(socialMediaData.linkedin.impresiones)}</div>
                                        <div className="text-[10px] text-slate-500">Impresiones</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-blue-600">{formatNumber(socialMediaData.linkedin.interacciones)}</div>
                                        <div className="text-[10px] text-slate-500">Interacciones</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-sky-600">{socialMediaData.linkedin.engagement}%</div>
                                        <div className="text-[10px] text-slate-500">Engagement</div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Google Business */}
                        <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800">
                            <CardContent className="p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-sm">Google Business</div>
                                        <div className="text-xs text-slate-500">Ficha local</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <div className="text-lg font-bold text-emerald-600">{formatNumber(socialMediaData.googleBusiness.vistas)}</div>
                                        <div className="text-[10px] text-slate-500">Vistas</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-teal-600">{socialMediaData.googleBusiness.llamadas}</div>
                                        <div className="text-[10px] text-slate-500">Llamadas</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold text-emerald-600">{socialMediaData.googleBusiness.direcciones}</div>
                                        <div className="text-[10px] text-slate-500">Rutas</div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="text-lg font-bold text-amber-500">{socialMediaData.googleBusiness.reseñas}</div>
                                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* ===== SECCIÓN ANALÍTICA WEB ===== */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                            <Globe className="w-5 h-5 text-blue-500" />
                            Analítica de Tráfico Web
                        </h2>
                        <Badge variant="outline" className="text-xs">marketing_data.csv</Badge>
                    </div>

                    {/* Main Stats Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                        <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                            <CardContent className="p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <Globe className="w-3 h-3 text-blue-500" />
                                    <span className="text-[10px] text-slate-500 uppercase font-bold">Impresiones Web</span>
                                </div>
                                <div className="text-xl font-bold text-blue-600">31.000</div>
                                <div className="text-[9px] text-emerald-500 font-medium">+12% vs mes ant.</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                            <CardContent className="p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <Search className="w-3 h-3 text-indigo-500" />
                                    <span className="text-[10px] text-slate-500 uppercase font-bold">Tráfico SEO</span>
                                </div>
                                <div className="text-xl font-bold text-slate-900 dark:text-white">8.500</div>
                                <div className="text-[9px] text-emerald-500 font-medium">+8% vs mes ant.</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                            <CardContent className="p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <MousePointerClick className="w-3 h-3 text-sky-500" />
                                    <span className="text-[10px] text-slate-500 uppercase font-bold">Volumen SEM</span>
                                </div>
                                <div className="text-xl font-bold text-slate-900 dark:text-white">8.200</div>
                                <div className="text-[9px] text-emerald-500 font-medium">+25% vs mes ant.</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                            <CardContent className="p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <Users className="w-3 h-3 text-purple-500" />
                                    <span className="text-[10px] text-slate-500 uppercase font-bold">Leads</span>
                                </div>
                                <div className="text-xl font-bold text-purple-600">950</div>
                                <div className="text-[9px] text-emerald-500 font-medium">+15% vs mes ant.</div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                            <CardContent className="p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <Phone className="w-3 h-3 text-emerald-500" />
                                    <span className="text-[10px] text-slate-500 uppercase font-bold">Llamadas</span>
                                </div>
                                <div className="text-xl font-bold text-emerald-600">385</div>
                                <div className="text-[9px] text-emerald-500 font-medium">+5% vs mes ant.</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-4">
                        <Card className="shadow-sm border-blue-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex justify-between">
                                    <span className="flex items-center gap-2"><BarChart3 className="w-3 h-3 text-blue-500" /> Tráfico Web (SEO vs SEM)</span>
                                    <Badge variant="secondary" className="text-[9px] h-4 bg-blue-50 text-blue-600">report_web.csv</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-48 w-full">
                                    <AreaChart data={csvDataAnalytics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <XAxis dataKey="mes" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Area type="monotone" dataKey="seo" name="Orgánico" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.1} strokeWidth={2} />
                                        <Area type="monotone" dataKey="sem" name="Pago" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.1} strokeWidth={2} />
                                    </AreaChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm border-blue-50">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-sm flex justify-between">
                                    <span className="flex items-center gap-2"><TrendingUp className="w-3 h-3 text-blue-500" /> Tasa de Conversión</span>
                                    <div className="flex items-center text-emerald-500 text-[10px] font-bold">
                                        +2.0% mes actual
                                    </div>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ChartContainer config={chartConfig} className="h-48 w-full">
                                    <BarChart data={csvDataAnalytics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                        <XAxis dataKey="mes" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis fontSize={10} tickLine={false} axisLine={false} />
                                        <ChartTooltip content={<ChartTooltipContent />} />
                                        <Bar dataKey="conversion" name="Conv. %" fill="#2563eb" radius={[3, 3, 0, 0]} />
                                    </BarChart>
                                </ChartContainer>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </div>
    );
}
