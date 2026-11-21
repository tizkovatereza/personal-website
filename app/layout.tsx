import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { Sidebar } from '@/components/sidebar'
import { MobileNav } from '@/components/mobile-nav'
import { DontClickHere } from '@/components/dont-click-here'
import { PageViewTracker } from '@/components/page-view-tracker'
import './globals.css'
import './site-type.css'

const inter = localFont({ src: '../public/fonts/inter.ttf', weight: '100 900', variable: '--font-sans-display', display: 'swap' })
const jetbrainsMono = localFont({ src: '../public/fonts/jetbrains.ttf', weight: '100 800', variable: '--font-mono-display', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Tereza Tizkova',
    template: '%s | Tereza Tizkova',
  },
  description: 'Building the future with machines. Growth at E2B, San Francisco.',
  metadataBase: new URL('https://www.terezatizkova.com'),
  openGraph: {
    title: 'Tereza Tizkova',
    description: 'Building the future with machines.',
    url: 'https://www.terezatizkova.com',
    siteName: 'Tereza Tizkova',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://www.terezatizkova.com/api/og?title=Tereza%20Tizkova&subtitle=Building%20the%20future%20with%20machines',
        width: 1200,
        height: 630,
        alt: 'Tereza Tizkova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tereza Tizkova',
    description: 'Building the future with machines.',
    images: ['https://www.terezatizkova.com/api/og?title=Tereza%20Tizkova&subtitle=Building%20the%20future%20with%20machines'],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-serif antialiased noise-texture">
        <div className="global-bg-pattern print:hidden" aria-hidden="true" />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {/* Easter Egg & Theme Toggle */}
          <div className="print:hidden">
            <DontClickHere />
          </div>
          
          {/* Mobile Navigation */}
          <div className="print:hidden">
            <MobileNav />
          </div>
          
          {/* Desktop Layout with Fixed Sidebar */}
          <div className="lg:flex">
            <div className="print:hidden">
              <Sidebar />
            </div>
            <main className="flex-1 lg:ml-[220px] print:ml-0 min-h-screen print:min-h-0">
              {children}
            </main>
          </div>
        </ThemeProvider>
        <Analytics />
        <PageViewTracker />
      </body>
    </html>
  )
}
