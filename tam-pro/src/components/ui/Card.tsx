import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

type CardProps = HTMLAttributes<HTMLDivElement> & {
  univers?: 'chr' | 'export' | 'neutre'
}

export function Card({ className, univers = 'neutre', children, ...props }: CardProps) {
  const universBorder =
    univers === 'chr'
      ? 'border-bordeaux/30 hover:border-bordeaux-clair'
      : univers === 'export'
      ? 'border-terre/30 hover:border-terre-clair'
      : 'border-or/20 hover:border-or/40'

  return (
    <div
      className={cn(
        'bg-noir-2 border p-6 transition-all duration-500',
        'hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]',
        universBorder,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({ className, children, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('font-titre text-xl text-white mb-2', className)} {...props}>
      {children}
    </h3>
  )
}

export function CardDescription({ className, children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn('text-sm text-[#c4bfb2]', className)} {...props}>
      {children}
    </p>
  )
}
