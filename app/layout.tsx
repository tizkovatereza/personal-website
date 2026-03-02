import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { MessageBubble } from '@/components/message-bubble'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tereza Tizkova',
    template: '%s | Tereza Tizkova',
  },
  description: 'Growth Lead, Math Grad, Content Creator, Community Builder. Building at the intersection of AI, growth, and writing.',
  metadataBase: new URL('https://tereza.dev'),
  openGraph: {
    title: 'Tereza Tizkova',
    description: 'Growth Lead, Math Grad, Content Creator, Community Builder.',
    url: 'https://tereza.dev',
    siteName: 'Tereza Tizkova',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tereza Tizkova',
    description: 'Growth Lead, Math Grad, Content Creator, Community Builder.',
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
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${spaceGrotesk.variable}`}>
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
