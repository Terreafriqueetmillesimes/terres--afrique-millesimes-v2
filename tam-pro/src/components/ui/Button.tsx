import { forwardRef, type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

type Variant = 'or' | 'bordeaux' | 'terre' | 'outline-or' | 'outline-bordeaux' | 'outline-terre' | 'ghost'

const variants: Record<Variant, string> = {
  or: 'bg-or text-noir border-or hover:bg-or-clair hover:border-or-clair',
  bordeaux: 'bg-bordeaux text-white border-bordeaux hover:bg-bordeaux-hover hover:border-bordeaux-hover shadow-[0_10px_30px_-10px_rgba(109,7,26,0.5)] hover:shadow-[0_14px_36px_-8px_rgba(109,7,26,0.7)]',
  terre: 'bg-terre text-white border-terre hover:bg-terre-hover hover:border-terre-hover shadow-[0_10px_30px_-10px_rgba(139,90,43,0.5)] hover:shadow-[0_14px_36px_-8px_rgba(139,90,43,0.7)]',
  'outline-or': 'bg-transparent text-or border-or/45 hover:bg-or hover:text-noir',
  'outline-bordeaux': 'bg-transparent text-bordeaux-clair border-bordeaux-clair hover:bg-bordeaux-clair hover:text-white',
  'outline-terre': 'bg-transparent text-terre-clair border-terre-clair hover:bg-terre-clair hover:text-white',
  ghost: 'bg-transparent text-gris-doux border-transparent hover:text-or-clair',
}

const base =
  'inline-block font-sc uppercase border cursor-pointer transition-all duration-300 px-7 py-3 text-center'

type ButtonProps = {
  variant?: Variant
  className?: string
  href?: never
} & ButtonHTMLAttributes<HTMLButtonElement>

type LinkProps = {
  variant?: Variant
  className?: string
  href: string
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'or', ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variants[variant], 'text-[0.82rem] tracking-sc', className)}
      {...props}
    />
  )
)
Button.displayName = 'Button'

export function ButtonLink({ className, variant = 'or', href, ...props }: LinkProps) {
  return (
    <a
      href={href}
      className={cn(base, variants[variant], 'text-[0.82rem] tracking-sc', className)}
      {...props}
    />
  )
}
