import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import * as orderService from '../../services/orderService'
import { formatDate, formatPrice } from '../../utils/formatters'
import Badge from '../../components/ui/Badge'
import Loader from '../../components/ui/Loader'
import OrderTimeline from '../../components/orders/OrderTimeline'
import QRCodeDisplay from '../../components/common/QRCodeDisplay'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/constants'

function OrderDetail() {
  const { id } = useParams()
  
  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => orderService.getOrderById(id),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    )
  }

  if (!order) return <div>Commande introuvable</div>

  const statusColor = ORDER_STATUS_COLORS[order.status] || 'default'

  return (
    <div className="py-8">
      <div className="container-custom max-w-4xl">
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Commande #{order.id}</h1>
              <p className="text-gray-600">{formatDate(order.createdAt, 'datetime')}</p>
            </div>
            <Badge variant={statusColor} size="lg">
              {ORDER_STATUS_LABELS[order.status]}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">Articles</h3>
              <div className="space-y-3">
                {order.items?.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.quantity}x {item.mealName}</span>
                    <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-primary-600">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">QR Code</h3>
              <QRCodeDisplay value={`order-${order.id}`} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Historique</h3>
            <OrderTimeline history={order.history || []} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetail
