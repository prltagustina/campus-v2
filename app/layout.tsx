import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Inter } from 'next/font/google'
import { AppShell } from '@/components/v3/app-shell'

// Inter incorporada al sitio (antes solo se declaraba: se veía en Inter
// únicamente si estaba instalada en el equipo). Fuente variable: cubre todos
// los pesos que usa el sitio (400 a 900). Con el eje óptico (opsz) de Inter 4:
// los títulos grandes usan el diseño "Display", más ajustado, como la Inter
// instalada con la que se diseñó el prototipo.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter', axes: ['opsz'] })

export const metadata: Metadata = {
  title: 'Nuevo Diseño Curricular - Educación Primaria Santa Fe',
  description: 'Diseño Curricular para la Educación Primaria de la Provincia de Santa Fe. Explora las áreas curriculares: Matemática, Lengua y Literatura, Ciencias Naturales, Ciencias Sociales, Educación Física, Educación Artística, Lenguas Extranjeras, Educación Tecnológica y Saberes, Vidas y Mundos.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={`font-sans antialiased`}>
        <AppShell>{children}</AppShell>
        <Analytics />
      </body>
    </html>
  )
}
