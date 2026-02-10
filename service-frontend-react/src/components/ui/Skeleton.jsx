import clsx from 'clsx'

// Composant Skeleton pour le chargement
function Skeleton({ className, variant = 'text', width, height, count = 1 }) {
  const variants = {
    text: 'h-4 rounded',
    title: 'h-8 rounded',
    circle: 'rounded-full',
    rect: 'rounded',
  }

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={clsx(
        'bg-gray-200 animate-pulse',
        variants[variant],
        className
      )}
      style={{ width, height }}
    />
  ))

  return count === 1 ? skeletons[0] : <div className="space-y-3">{skeletons}</div>
}

export default Skeleton
