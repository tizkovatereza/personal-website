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
  return (
    <>
      {/* Hide parent layout elements when printing */}
      <style jsx global>{`
        @media print {
          /* Hide sidebar and navigation */
          .lg\\:ml-\\[220px\\] {
            margin-left: 0 !important;
          }
          nav,
          aside,
          .lg\\:flex > aside,
          .lg\\:fixed,
          [class*="sidebar"],
          [class*="mobile-nav"],
          .global-bg-pattern,
          .noise-texture::before,
          .scanlines::after {
            display: none !important;
          }
          /* Reset body styles */
          body {
            background: white !important;
            color: black !important;
          }
          body::before,
          body::after {
            display: none !important;
          }
          /* Ensure main content fills page */
          main {
            margin: 0 !important;
            padding: 0 !important;
          }
        }
      `}</style>
      {children}
    </>
  )
}
