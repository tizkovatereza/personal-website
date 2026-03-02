import { cn } from '@/lib/utils'
import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react'

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger'
  children: React.ReactNode
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  danger: AlertCircle,
}

const styles = {
  info: 'border-blue-500/50 bg-blue-500/10',
  warning: 'border-yellow-500/50 bg-yellow-500/10',
  tip: 'border-green-500/50 bg-green-500/10',
  danger: 'border-red-500/50 bg-red-500/10',
}

export function Callout({ type = 'info', children }: CalloutProps) {
  const Icon = icons[type]

  return (
    <div className={cn('my-6 flex gap-3 rounded-lg border p-4', styles[type])}>
      <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
      <div className="text-sm leading-relaxed [&>p]:m-0">{children}</div>
    </div>
  )
}
