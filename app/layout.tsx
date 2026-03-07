import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { MessageBubble } from '@/components/message-bubble'
import './globals.css'

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tereza Tizkova',
    template: '%s | Tereza Tizkova',
  },
  description: 'Growth, AI, Writing. San Francisco & Prague.',
  metadataBase: new URL('https://tereza.dev'),
  openGraph: {
    title: 'Tereza Tizkova',
    description: 'Growth, AI, Writing.',
    url: 'https://tereza.dev',
    siteName: 'Tereza Tizkova',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tereza Tizkova',
    description: 'Growth, AI, Writing.',
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
    { media: '(prefers-color-scheme: light)', color: '#f0f0f0' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={ibmPlexMono.variable}>
      <body className="font-mono antialiased">
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
            <main className="flex-1 lg:ml-[280px] min-h-screen">
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
