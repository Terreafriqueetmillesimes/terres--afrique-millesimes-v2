import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utilitaire pour combiner les classes Tailwind avec fusion intelligente.
 * Usage : cn('px-4', condition && 'bg-or', 'px-6') => 'bg-or px-6'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
