"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, BarChart, Bar, ResponsiveContainer } from "recharts";

const chartConfig = { valor: { label: "Volumen" }, roi: { label: "Conversión %" } } satisfies ChartConfig;

export function SmeDashboardDemo() {
    const [activeTab, setActiveTab] = useState("analytics");

    // Datos simulados extraídos de un CSV
    const csvDataAnalytics = [
        { mes: "Ene", impresiones: 12000, seo: 4500, sem: 2000, llamadas: 145, leads: 320, conversion: 2.1 },
        { mes: "Feb", impresiones: 15400, seo: 5100, sem: 3500, llamadas: 180, leads: 410, conversion: 2.4 },
        { mes: "Mar", impresiones: 18900, seo: 5800, sem: 4200, llamadas: 215, leads: 505, conversion: 2.8 },
        { mes: "Abr", impresiones: 22100, seo: 6300, sem: 5100, llamadas: 260, leads: 630, conversion: 3.2 },
        { mes: "May", impresiones: 26500, seo: 7200, sem: 6800, llamadas: 310, leads: 780, conversion: 3.5 },
        { mes: "Jun", impresiones: 31000, seo: 8500, sem: 8200, llamadas: 385, leads: 950, conversion: 4.1 },
    ];

    // Datos para calendario de citas
    const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 4)); // Marzo 2026

    const appointments = [
        { time: "09:00", client: "Servicios Martínez", type: "Revisión Web", status: "confirmed" },
        { time: "11:30", client: "Clínica Dental Sonrisas", type: "Estrategia SEM", status: "pending" },
        { time: "14:00", client: "Restaurante El Puerto", type: "Sesión Fotos", status: "confirmed" },
        { time: "16:45", client: "Abogados Asociados", type: "Plan de Leads", status: "confirmed" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 md:p-12 text-slate-900 dark:text-slate-100">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Setup */}
                <section className="space-y-4 text-center">
                    <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 mb-2">
                        <FileSpreadsheet className="w-3 h-3 mr-1" /> Datos importados desde CSV
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight">Dashboard de Marketing Local</h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        Optimizado para pequeñas empresas. Analiza el rendimiento de tu web, campañas de publicidad, generación de leads y gestiona tus citas.
                    </p>
                </section>

                <Card className="overflow-hidden shadow-xl border-slate-200 dark:border-slate-800">
                    <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 p-6 border-b border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Rendimiento y Citas</h3>
                                <p className="text-sm text-slate-500">Última actualización (via CSV): Hoy 08:00 AM</p>
                            </div>
                        </div>
                    </div>

                    <CardContent className="p-6">
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="grid w-full grid-cols-2 max-w-md mb-8 bg-slate-100 dark:bg-slate-900">
                                <TabsTrigger value="analytics" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-slate-800">
                                    <BarChart3 className="w-4 h-4 mr-2" /> Analítica Web y Leads
                                </TabsTrigger>
                                <TabsTrigger value="calendar" className="data-[state=active]:bg-white data-[state=active]:text-blue-600 dark:data-[state=active]:bg-slate-800">
                                    <CalendarIcon className="w-4 h-4 mr-2" /> Gestión de Citas
                                </TabsTrigger>
                            </TabsList>

                            {/* Analytics Tab */}
                            <TabsContent value="analytics" className="space-y-6">
                                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                                    <Card className="bg-white dark:bg-slate-900 border-none shadow-sm"><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><Globe className="w-4 h-4 text-blue-500" /> <span className="text-sm text-slate-500">Impresiones Web</span></div><div className="text-2xl font-bold text-blue-600">31.0K</div></CardContent></Card>
                                    <Card className="bg-white dark:bg-slate-900 border-none shadow-sm"><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><Search className="w-4 h-4 text-indigo-500" /> <span className="text-sm text-slate-500">Tráfico SEO</span></div><div className="text-2xl font-bold text-indigo-600">8,500</div></CardContent></Card>
                                    <Card className="bg-white dark:bg-slate-900 border-none shadow-sm"><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><MousePointerClick className="w-4 h-4 text-sky-500" /> <span className="text-sm text-slate-500">Volumen SEM</span></div><div className="text-2xl font-bold text-sky-600">8,200</div></CardContent></Card>
                                    <Card className="bg-white dark:bg-slate-900 border-none shadow-sm"><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><Users className="w-4 h-4 text-purple-500" /> <span className="text-sm text-slate-500">Leads Generados</span></div><div className="text-2xl font-bold text-purple-600">950</div></CardContent></Card>
                                    <Card className="bg-white dark:bg-slate-900 border-none shadow-sm"><CardContent className="p-4"><div className="flex items-center gap-2 mb-1"><Phone className="w-4 h-4 text-emerald-500" /> <span className="text-sm text-slate-500">Llamadas</span></div><div className="text-2xl font-bold text-emerald-600">385</div></CardContent></Card>
                                </div>

                                <div className="grid lg:grid-cols-2 gap-6">
                                    <Card className="shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="text-base flex justify-between">
                                                <span>Crecimiento de Tráfico (SEO vs SEM)</span>
                                                <Badge variant="outline" className="text-blue-600 border-blue-200 bg-blue-50">CSV Source</Badge>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer config={chartConfig} className="h-72 w-full">
                                                <AreaChart data={csvDataAnalytics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                                    <XAxis dataKey="mes" fontSize={12} tickLine={false} axisLine={false} />
                                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                                    <ChartTooltip content={<ChartTooltipContent />} />
                                                    <Area type="monotone" dataKey="seo" name="Tráfico Orgánico (SEO)" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} />
                                                    <Area type="monotone" dataKey="sem" name="Tráfico Pago (SEM)" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.2} strokeWidth={2} />
                                                </AreaChart>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>

                                    <Card className="shadow-sm">
                                        <CardHeader>
                                            <CardTitle className="text-base flex justify-between">
                                                <span>Evolución Tasa de Conversión (%)</span>
                                                <div className="flex items-center text-emerald-500 text-sm">
                                                    <TrendingUp className="w-4 h-4 mr-1" /> +2.0% (6m)
                                                </div>
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <ChartContainer config={chartConfig} className="h-72 w-full">
                                                <BarChart data={csvDataAnalytics} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                                    <XAxis dataKey="mes" fontSize={12} tickLine={false} axisLine={false} />
                                                    <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                                    <ChartTooltip content={<ChartTooltipContent />} />
                                                    <Bar dataKey="conversion" name="Tasa Conversión %" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                                </BarChart>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>

                            {/* Calendar Tab */}
                            <TabsContent value="calendar" className="space-y-6">
                                <div className="grid lg:grid-cols-3 gap-8">
                                    {/* Calendar View */}
                                    <Card className="lg:col-span-2 shadow-sm border-slate-200">
                                        <CardHeader className="flex flex-row items-center justify-between pb-2 border-b">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-bold text-lg">Marzo 2026</h3>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft className="w-5 h-5" /></button>
                                                <button className="p-2 hover:bg-slate-100 rounded-full"><ChevronRight className="w-5 h-5" /></button>
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="grid grid-cols-7 border-b text-center text-sm font-medium text-slate-500 py-2">
                                                <div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div><div>Dom</div>
                                            </div>
                                            <div className="grid grid-cols-7 text-center text-sm auto-rows-[minmax(80px,_auto)]">
                                                {Array.from({ length: 31 }).map((_, i) => (
                                                    <div key={i} className={`p-2 border-r border-b min-h-[80px] flex flex-col items-center ${i === 3 ? 'bg-blue-50/50' : ''}`}>
                                                        <span className={`w-8 h-8 flex items-center justify-center rounded-full ${i === 3 ? 'bg-blue-600 text-white font-bold' : ''}`}>
                                                            {i + 1}
                                                        </span>
                                                        {i === 3 && (
                                                            <div className="mt-1 w-full px-1">
                                                                <div className="text-[10px] bg-blue-100 text-blue-700 rounded px-1 py-0.5 truncate mb-1">4 Citas</div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Daily Agenda */}
                                    <Card className="shadow-sm border-slate-200">
                                        <CardHeader className="bg-slate-50 border-b pb-4">
                                            <CardTitle className="text-base">Agenda del Día</CardTitle>
                                            <CardDescription>Jueves, 4 de Marzo</CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-0">
                                            <div className="divide-y">
                                                {appointments.map((apt, i) => (
                                                    <div key={i} className="p-4 hover:bg-slate-50 transition-colors flex gap-4">
                                                        <div className="font-semibold text-slate-500 w-12 text-right">{apt.time}</div>
                                                        <div>
                                                            <div className="font-medium">{apt.client}</div>
                                                            <div className="text-sm text-slate-500 flex items-center mt-1">
                                                                <Badge variant="outline" className="mr-2 border-blue-200 text-blue-600 bg-blue-50/50">
                                                                    {apt.type}
                                                                </Badge>
                                                                {apt.status === 'confirmed' ? (
                                                                    <span className="flex items-center text-emerald-500 text-xs"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1" />Confirmada</span>
                                                                ) : (
                                                                    <span className="flex items-center text-amber-500 text-xs"><div className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1" />Pendiente</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
