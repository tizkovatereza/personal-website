import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Growth Lab | Tereza Tizkova',
  description: 'Topics office hours - growth tactics, developer marketing, and more',
  openGraph: {
    title: 'Growth Lab',
    description: 'Topics office hours - growth tactics, developer marketing, and more',
    images: [{ url: 'https://www.terezatizkova.com/api/og?title=Growth%20Lab&subtitle=Topics%20office%20hours', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.terezatizkova.com/api/og?title=Growth%20Lab&subtitle=Topics%20office%20hours'],
  },
}

export default function GrowthLabLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
