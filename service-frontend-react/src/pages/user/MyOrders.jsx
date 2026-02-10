import { useQuery } from '@tanstack/react-query'
import * as orderService from '../../services/orderService'
import OrderCard from '../../components/orders/OrderCard'
import Loader from '../../components/ui/Loader'
import EmptyState from '../../components/common/EmptyState'

function MyOrders() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ['myOrders'],
    queryFn: orderService.getMyOrders,
  })

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader size="lg" />
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Mes commandes</h1>

        {!orders || orders.length === 0 ? (
          <EmptyState
            icon="📦"
            title="Aucune commande"
            description="Vous n'avez pas encore passé de commande"
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyOrders
