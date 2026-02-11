import clsx from 'clsx'

function StatsCard({ title, value, icon: Icon, trend, trendValue, color = 'primary' }) {
  const colors = {
    primary: 'text-primary-600 bg-primary-100',
    success: 'text-green-600 bg-green-100',
    warning: 'text-yellow-600 bg-yellow-100',
    danger: 'text-red-600 bg-red-100',
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={clsx(
              'text-sm mt-2 flex items-center',
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              <span className="mr-1">{trend === 'up' ? '↑' : '↓'}</span>
              {trendValue}
            </p>
          )}
        </div>
        {Icon && (
          <div className={clsx('w-12 h-12 rounded-lg flex items-center justify-center', colors[color])}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  )
}

export default StatsCard
