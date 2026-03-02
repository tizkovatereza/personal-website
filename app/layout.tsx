import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { MessageBubble } from '@/components/message-bubble'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Tereza Tizkova',
    template: '%s | Tereza Tizkova',
  },
  description: 'Growth for developer tools, AI courses, and writing about tech, startups, and life.',
  metadataBase: new URL('https://tereza.dev'),
  openGraph: {
    title: 'Tereza Tizkova',
    description: 'Growth for developer tools, AI courses, and writing about tech, startups, and life.',
    url: 'https://tereza.dev',
    siteName: 'Tereza Tizkova',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tereza Tizkova',
    description: 'Growth for developer tools, AI courses, and writing about tech, startups, and life.',
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
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#262626' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <MessageBubble />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
