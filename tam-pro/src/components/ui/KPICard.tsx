import { cn } from '@/lib/utils/cn'

type KPICardProps = {
  label: string
  value: string | number
  trend?: { value: number; suffix?: string }
  className?: string
}

export function KPICard({ label, value, trend, className }: KPICardProps) {
  return (
    <div className={cn('bg-noir-2 border border-or/20 p-6 hover:border-or/40 transition-colors', className)}>
      <p className="font-sc text-[0.65rem] tracking-[0.3em] uppercase text-gris-doux mb-3">{label}</p>
      <p className="font-titre text-4xl text-white mb-2">{value}</p>
      {trend && (
        <p className={cn('text-xs font-sc tracking-wider', trend.value >= 0 ? 'text-emerald-400' : 'text-red-400')}>
          {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}{trend.suffix ?? ''} sur 30j
        </p>
      )}
    </div>
  )
}
