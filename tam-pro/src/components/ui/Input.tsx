import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/cn'

const fieldBase =
  'w-full bg-noir-3 border border-or/20 px-4 py-3 text-[#e9e4d8] font-corps text-sm ' +
  'transition-colors focus:border-or focus:outline-none placeholder:text-gris'

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBase, className)} {...props} />
  )
)
Input.displayName = 'Input'

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, rows = 4, ...props }, ref) => (
    <textarea ref={ref} rows={rows} className={cn(fieldBase, 'resize-y', className)} {...props} />
  )
)
Textarea.displayName = 'Textarea'

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, children, ...props }, ref) => (
    <select ref={ref} className={cn(fieldBase, 'cursor-pointer', className)} {...props}>
      {children}
    </select>
  )
)
Select.displayName = 'Select'

type FieldProps = {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}

export function Field({ label, required, hint, error, children }: FieldProps) {
  return (
    <div className="mb-4">
      <label className="block font-sc text-xs tracking-wider text-or-clair uppercase mb-2">
        {label} {required && <span className="text-or">·</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-gris italic">{hint}</p>}
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
    </div>
  )
}
