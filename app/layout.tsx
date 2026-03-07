import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { MessageBubble } from '@/components/message-bubble'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans-display',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-serif-display',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tereza Tizkova',
    template: '%s | Tereza Tizkova',
  },
  description: 'Building the future with machines. Growth, AI, Writing. San Francisco & Prague.',
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
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0c10' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
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
            <main className="flex-1 lg:ml-[200px] min-h-screen">
              {children}
            </main>
          </div>
          
          <MessageBubble />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
