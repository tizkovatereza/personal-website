import type { ReactNode } from 'react'
import '../paper-writing.css'

export default function PaperWritingLayout({ children }: { children: ReactNode }) {
  return <div className="paper-writing">{children}</div>
}
