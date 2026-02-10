import clsx from 'clsx'
import { forwardRef } from 'react'

const Textarea = forwardRef(({ 
  label, 
  error, 
  rows = 4,
  className,
  fullWidth = true,
  ...props 
}, ref) => {
  return (
    <div className={clsx(fullWidth && 'w-full')}>
      {label && (
        <label className="label">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={clsx(
          'input resize-none',
          error && 'border-red-500 focus:ring-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
