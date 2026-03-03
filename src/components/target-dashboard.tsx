"use client";

import React, { useState } from 'react';
import { Building2, Rocket, Briefcase, Plus, TrendingUp, Presentation, MonitorSmartphone, PenTool, LayoutTemplate, Activity } from 'lucide-react';

export function TargetDashboardDemo() {
    const [profileType, setProfileType] = useState('FREELANCER');
    const [sector, setSector] = useState('');
    const [bidAmount, setBidAmount] = useState(1.5);

    const profiles = [
        { id: 'FREELANCER', name: 'Autónomo', icon: <Briefcase className="w-6 h-6" />, desc: 'Soluciones ágiles para profesionales', sectors: ['Diseño y Creatividad', 'Consultoría Independiente', 'Programación Freelance'] },
        { id: 'ENTREPRENEUR', name: 'Empresario', icon: <Building2 className="w-6 h-6" />, desc: 'Estrategias de crecimiento y scale-up', sectors: ['E-commerce', 'SaaS & Software', 'Retail & Franquicias'] },
        { id: 'INVESTOR', name: 'Inversor', icon: <Rocket className="w-6 h-6" />, desc: 'Análisis de ROI y oportunidades', sectors: ['Real Estate', 'Venture Capital', 'Cripto & Finanzas'] },
    ];

    const tools = [
        { name: 'Crear Landing Page', icon: <LayoutTemplate className="w-5 h-5" />, color: 'bg-blue-500/10 text-blue-500' },
        { name: 'Anuncios Redes Sociales', icon: <MonitorSmartphone className="w-5 h-5" />, color: 'bg-indigo-500/10 text-indigo-500' },
        { name: 'Contenido Web (Blog/SEO)', icon: <PenTool className="w-5 h-5" />, color: 'bg-green-500/10 text-green-500' },
        { name: 'Nuevas Secciones', icon: <Plus className="w-5 h-5" />, color: 'bg-orange-500/10 text-orange-500' },
        { name: 'Diseños Publicitarios', icon: <Presentation className="w-5 h-5" />, color: 'bg-purple-500/10 text-purple-500' },
    ];

    const trafficSources = [
        { name: 'Google SEO', type: 'Orgánico', visits: 1240, leads: 45, calls: 12 },
        { name: 'Redes Sociales (Orgánico)', type: 'Orgánico', visits: 850, leads: 22, calls: 5 },
        { name: 'Email Marketing', type: 'Orgánico', visits: 430, leads: 50, calls: 8 },
        { name: 'Tráfico Directo', type: 'Orgánico', visits: 1100, leads: 15, calls: 2 },
        { name: 'Referidos', type: 'Orgánico', visits: 320, leads: 30, calls: 10 },
        { name: 'Google Ads', type: 'PPC', visits: 2500, leads: 180, calls: 45 },
        { name: 'Facebook Ads', type: 'PPC', visits: 3100, leads: 210, calls: 35 },
        { name: 'LinkedIn Ads', type: 'PPC', visits: 850, leads: 90, calls: 25 },
        { name: 'TikTok Ads', type: 'PPC', visits: 4200, leads: 60, calls: 10 },
        { name: 'Twitter (X) Ads', type: 'PPC', visits: 600, leads: 15, calls: 3 },
    ];

    const currentProfile = profiles.find(p => p.id === profileType);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-zinc-950 p-6 md:p-12 text-zinc-900 dark:text-zinc-100">
            <div className="max-w-7xl mx-auto space-y-10">

                {/* Header Setup */}
                <section className="space-y-4">
                    <h1 className="text-3xl font-bold tracking-tight">Configuración de Perfil (Target)</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Selecciona el tipo de entidad para adaptar las campañas, creatividades y pujas.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        {profiles.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => { setProfileType(p.id); setSector(''); }}
                                className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left flex flex-col gap-3 ${profileType === p.id
                                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-md'
                                    : 'border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-zinc-900'
                                    }`}
                            >
                                <div className={`p-3 rounded-full w-fit ${profileType === p.id ? 'bg-blue-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800'}`}>
                                    {p.icon}
                                </div>
                                <h3 className="font-bold text-lg">{p.name}</h3>
                                <p className="text-sm opacity-70">{p.desc}</p>
                            </button>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-col gap-2 max-w-sm">
                        <label className="font-medium text-sm">Sector Específico:</label>
                        <select
                            value={sector}
                            onChange={(e) => setSector(e.target.value)}
                            className="px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 focus:ring-2 focus:ring-blue-600 outline-none"
                        >
                            <option value="">Selecciona un sector...</option>
                            {currentProfile?.sectors.map(s => <option key={s} value={s}>{s}</option>)}
                            <option value="other">Otro / Personalizado</option>
                        </select>
                    </div>
                </section>

                <hr className="border-zinc-200 dark:border-zinc-800" />

                {/* Creation Tools */}
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Activity className="w-6 h-6 text-blue-600" />
                        <h2 className="text-2xl font-bold">Herramientas de Creación</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        {tools.map((tool) => (
                            <button key={tool.name} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-blue-500 rounded-2xl gap-4 hover:shadow-lg transition-all group">
                                <div className={`p-4 rounded-full ${tool.color} group-hover:scale-110 transition-transform`}>
                                    {tool.icon}
                                </div>
                                <span className="text-sm font-semibold text-center">{tool.name}</span>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Traffic & Bidding Dashboard */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-green-500" /> Rendimiento de Tráfico y Captación
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="border-b border-zinc-100 dark:border-zinc-800 text-zinc-500">
                                        <th className="pb-3 font-medium">Fuente</th>
                                        <th className="pb-3 font-medium">Tipo</th>
                                        <th className="pb-3 text-right font-medium">Visitas</th>
                                        <th className="pb-3 text-right font-medium text-blue-600">Leads</th>
                                        <th className="pb-3 text-right font-medium text-green-600">Llamadas</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
                                    {trafficSources.map((s, i) => (
                                        <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                                            <td className="py-3 font-medium">{s.name}</td>
                                            <td className="py-3">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-md ${s.type === 'Orgánico' ? 'bg-green-100 text-green-700 dark:bg-green-900/30' : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30'}`}>
                                                    {s.type}
                                                </span>
                                            </td>
                                            <td className="py-3 text-right">{s.visits.toLocaleString()}</td>
                                            <td className="py-3 text-right font-semibold">{s.leads}</td>
                                            <td className="py-3 text-right font-semibold">{s.calls}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Bidding Control Panel */}
                    <div className="bg-blue-600 text-white rounded-2xl p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <TrendingUp className="w-32 h-32" />
                        </div>
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-2xl font-bold">Panel de Pujas Inteligentes</h3>
                            <p className="text-blue-100 text-sm">Ajusta tu puja máxima (CPC o CPL) para campañas PPC en directo para tu target de <b>{currentProfile?.name}</b>.</p>

                            <div className="bg-white/10 rounded-xl p-4 mt-6">
                                <div className="flex justify-between items-end mb-2">
                                    <span className="text-sm font-medium">Puja Actual por Click (€)</span>
                                    <span className="text-3xl font-bold">{bidAmount.toFixed(2)}€</span>
                                </div>
                                <input
                                    type="range"
                                    min="0.10" max="10" step="0.10"
                                    value={bidAmount}
                                    onChange={(e) => setBidAmount(parseFloat(e.target.value))}
                                    className="w-full accent-white"
                                />
                                <div className="flex justify-between text-xs mt-2 text-blue-200">
                                    <span>0.10€</span>
                                    <span>10.00€</span>
                                </div>
                            </div>
                        </div>

                        <button className="relative z-10 mt-8 w-full bg-white text-blue-600 font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all active:scale-95">
                            Aplicar Puja en Redes PPC
                        </button>
                    </div>

                </section>
            </div>
        </div>
    );
}
