import clsx from 'clsx'
import { formatDate } from '../../utils/formatters'
import { ORDER_STATUS_LABELS } from '../../utils/constants'

function OrderTimeline({ history = [] }) {
  return (
    <div className="space-y-4">
      {history.map((event, index) => (
        <div key={index} className="flex">
          <div className="flex flex-col items-center mr-4">
            <div className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center',
              index === 0 ? 'bg-primary-600' : 'bg-gray-300'
            )}>
              <span className="text-white text-sm">✓</span>
            </div>
            {index < history.length - 1 && (
              <div className="w-0.5 h-full bg-gray-300 my-1" />
            )}
          </div>
          
          <div className="flex-1 pb-8">
            <h4 className="font-medium text-gray-900">
              {ORDER_STATUS_LABELS[event.status]}
            </h4>
            <p className="text-sm text-gray-500">
              {formatDate(event.timestamp, 'datetime')}
            </p>
            {event.note && (
              <p className="text-sm text-gray-600 mt-1">{event.note}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderTimeline
