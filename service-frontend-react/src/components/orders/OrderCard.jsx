import { Link } from 'react-router-dom'
import { formatDate, formatPrice } from '../../utils/formatters'
import Badge from '../ui/Badge'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/constants'

function OrderCard({ order }) {
  const statusColor = ORDER_STATUS_COLORS[order.status] || 'default'

  return (
    <Link to={`/user/orders/${order.id}`}>
      <div className="card hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Commande #{order.id}</h3>
            <p className="text-sm text-gray-500">{formatDate(order.createdAt, 'datetime')}</p>
          </div>
          <Badge variant={statusColor}>
            {ORDER_STATUS_LABELS[order.status]}
          </Badge>
        </div>
        
        <div className="space-y-2 mb-4">
          {order.items?.slice(0, 3).map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-700">{item.quantity}x {item.mealName}</span>
              <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
          {order.items?.length > 3 && (
            <p className="text-sm text-gray-500">Et {order.items.length - 3} autre(s)...</p>
          )}
        </div>
        
        <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
          <span className="font-semibold">Total</span>
          <span className="text-xl font-bold text-primary-600">
            {formatPrice(order.total)}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default OrderCard
