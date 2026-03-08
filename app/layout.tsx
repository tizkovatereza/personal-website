import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/sidebar'
import { MobileNav } from '@/components/mobile-nav'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans-display',
  display: 'swap',
  weight: ['300', '400', '500'],
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif-display',
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono-display',
  display: 'swap',
  weight: ['300', '400'],
})

export const metadata: Metadata = {
  title: {
    default: 'Tereza Tizkova',
    template: '%s | Tereza Tizkova',
  },
  description: 'Building the future with machines. Growth at E2B, San Francisco.',
  metadataBase: new URL('https://tereza.dev'),
  openGraph: {
    title: 'Tereza Tizkova',
    description: 'Building the future with machines.',
    url: 'https://tereza.dev',
    siteName: 'Tereza Tizkova',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tereza Tizkova',
    description: 'Building the future with machines.',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    types: {
      'application/rss+xml': '/feed.xml',
    },
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0e17',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans font-light antialiased noise-texture scanlines">
        <div className="global-bg-pattern" aria-hidden="true" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Mobile Navigation */}
          <MobileNav />
          
          {/* Desktop Layout with Fixed Sidebar */}
          <div className="lg:flex">
            <Sidebar />
            <main className="flex-1 lg:ml-[220px] min-h-screen">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
