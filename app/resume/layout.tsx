import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume | Tereza Tizkova',
  description: 'Resume of Tereza Tizkova - Growth & DevRel leader, AI infrastructure.',
}

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
