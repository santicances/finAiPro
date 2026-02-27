import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FinAI Pro - Transformación Digital para Empresas Financieras con IA",
  description: "Automatiza procesos financieros con agentes digitales que aprenden de tus empleados. Data Analytics, ML, RAG, CRM Automation y más. Desde €25/empleado.",
  keywords: ["Inteligencia Artificial", "Finanzas", "Machine Learning", "Automatización", "CRM", "Call Center AI", "Data Analytics", "ETL", "RAG", "Agentes Digitales"],
  authors: [{ name: "FinAI Pro Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "FinAI Pro - IA para Empresas Financieras",
    description: "Agentes digitales que aprenden de tus empleados y automatizan procesos financieros",
    url: "https://finai.pro",
    siteName: "FinAI Pro",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinAI Pro - IA para Empresas Financieras",
    description: "Agentes digitales que aprenden de tus empleados y automatizan procesos financieros",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
