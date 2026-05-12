import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume | Tereza Tizkova',
  description: 'Resume of Tereza Tizkova - Growth & DevRel leader, AI infrastructure.',
  openGraph: {
    title: 'Resume',
    description: 'Tereza Tizkova - Growth & DevRel leader, AI infrastructure',
    images: [{ url: 'https://www.terezatizkova.com/api/og?title=Resume&subtitle=Tereza%20Tizkova', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://www.terezatizkova.com/api/og?title=Resume&subtitle=Tereza%20Tizkova'],
  },
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
