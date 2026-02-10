import clsx from 'clsx'

// Composant Card
function Card({ children, className, padding = true, hover = false, onClick }) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-lg shadow-md border border-gray-200',
        padding && 'p-6',
        hover && 'hover:shadow-lg transition-shadow duration-200 cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

// Sous-composants
Card.Header = function CardHeader({ children, className }) {
  return (
    <div className={clsx('mb-4 pb-4 border-b border-gray-200', className)}>
      {children}
    </div>
  )
}

Card.Title = function CardTitle({ children, className }) {
  return (
    <h3 className={clsx('text-lg font-semibold text-gray-900', className)}>
      {children}
    </h3>
  )
}

Card.Body = function CardBody({ children, className }) {
  return (
    <div className={clsx('', className)}>
      {children}
    </div>
  )
}

Card.Footer = function CardFooter({ children, className }) {
  return (
    <div className={clsx('mt-4 pt-4 border-t border-gray-200', className)}>
      {children}
    </div>
  )
}

export default Card
