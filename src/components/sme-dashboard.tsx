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
    // Datos simulados extraídos de un CSV
    const csvDataAnalytics = [
        { mes: "Ene", impresiones: 12000, seo: 4500, sem: 2000, llamadas: 145, leads: 320, conversion: 2.1 },
        { mes: "Feb", impresiones: 15400, seo: 5100, sem: 3500, llamadas: 180, leads: 410, conversion: 2.4 },
        { mes: "Mar", impresiones: 18900, seo: 5800, sem: 4200, llamadas: 215, leads: 505, conversion: 2.8 },
        { mes: "Abr", impresiones: 22100, seo: 6300, sem: 5100, llamadas: 260, leads: 630, conversion: 3.2 },
        { mes: "May", impresiones: 26500, seo: 7200, sem: 6800, llamadas: 310, leads: 780, conversion: 3.5 },
        { mes: "Jun", impresiones: 31000, seo: 8500, sem: 8200, llamadas: 385, leads: 950, conversion: 4.1 },
    ];

    return (
        <div className="bg-slate-50 dark:bg-slate-950 p-4 text-slate-900 dark:text-slate-100 h-full overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Header Setup */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Analítica de Tráfico</h1>
                        <p className="text-slate-500 text-xs">Datos optimizados para marketing local (Fuente: marketing_data.csv)</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
                        <FileSpreadsheet className="w-3 h-3 mr-1" /> Importación CSV Activa
                    </Badge>
                </div>

                {/* Main Stats Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
                    <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Globe className="w-3 h-3 text-blue-500" />
                                <span className="text-[10px] text-slate-500 uppercase font-bold">Impresiones Web</span>
                            </div>
                            <div className="text-xl font-bold text-blue-600">31,000</div>
                            <div className="text-[9px] text-emerald-500 font-medium">↑ 12% vs mes ant.</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Search className="w-3 h-3 text-indigo-500" />
                                <span className="text-[10px] text-slate-500 uppercase font-bold">Tráfico SEO</span>
                            </div>
                            <div className="text-xl font-bold text-slate-900 dark:text-white">8,500</div>
                            <div className="text-[9px] text-emerald-500 font-medium">↑ 8% vs mes ant.</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <MousePointerClick className="w-3 h-3 text-sky-500" />
                                <span className="text-[10px] text-slate-500 uppercase font-bold">Volumen SEM</span>
                            </div>
                            <div className="text-xl font-bold text-slate-900 dark:text-white">8,200</div>
                            <div className="text-[9px] text-emerald-500 font-medium">↑ 25% vs mes ant.</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Users className="w-3 h-3 text-purple-500" />
                                <span className="text-[10px] text-slate-500 uppercase font-bold">Leads</span>
                            </div>
                            <div className="text-xl font-bold text-purple-600">950</div>
                            <div className="text-[9px] text-emerald-500 font-medium">↑ 15% vs mes ant.</div>
                        </CardContent>
                    </Card>
                    <Card className="bg-white dark:bg-slate-900 border-blue-50 shadow-sm transition-all hover:shadow-md">
                        <CardContent className="p-3">
                            <div className="flex items-center gap-2 mb-1">
                                <Phone className="w-3 h-3 text-emerald-500" />
                                <span className="text-[10px] text-slate-500 uppercase font-bold">Llamadas</span>
                            </div>
                            <div className="text-xl font-bold text-emerald-600">385</div>
                            <div className="text-[9px] text-emerald-500 font-medium">↑ 5% vs mes ant.</div>
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
                                    ↑ +2.0% mes actual
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
    );
}
