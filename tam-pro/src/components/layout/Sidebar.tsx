import Link from 'next/link'
import { cn } from '@/lib/utils/cn'

type Item = {
  href: string
  label: string
  icon?: string
  badge?: number
}

type Props = {
  univers: 'chr' | 'export' | 'admin'
  items: Item[]
  currentPath?: string
}

export function Sidebar({ univers, items, currentPath }: Props) {
  const accentColor = univers === 'chr' ? 'bordeaux' : univers === 'export' ? 'terre' : 'or'

  return (
    <aside className="w-64 bg-noir-2 border-r border-or/15 py-6">
      <nav className="flex flex-col gap-1 px-3">
        {items.map((item) => {
          const isActive = currentPath === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-4 py-2.5 font-corps text-sm rounded-sm transition-colors',
                'hover:bg-or/5',
                isActive
                  ? accentColor === 'bordeaux'
                    ? 'bg-bordeaux/15 text-bordeaux-hover border-l-2 border-bordeaux-hover'
                    : accentColor === 'terre'
                    ? 'bg-terre/15 text-terre-hover border-l-2 border-terre-hover'
                    : 'bg-or/15 text-or-clair border-l-2 border-or'
                  : 'text-gris-doux hover:text-or-clair'
              )}
            >
              <span className="flex items-center gap-3">
                {item.icon && <span className="text-base">{item.icon}</span>}
                {item.label}
              </span>
              {item.badge !== undefined && item.badge > 0 && (
                <span className={cn(
                  'text-[0.65rem] px-1.5 py-0.5 font-sc',
                  isActive ? 'bg-or text-noir' : 'bg-or/20 text-or-clair'
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
