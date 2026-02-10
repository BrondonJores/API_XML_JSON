import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useMutation } from '@tanstack/react-query'
import * as orderService from '../../services/orderService'
import Button from '../../components/ui/Button'
import CartItem from '../../components/orders/CartItem'
import CartSummary from '../../components/orders/CartSummary'
import EmptyState from '../../components/common/EmptyState'

function Order() {
  const navigate = useNavigate()
  const {
    items,
    isEmpty,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    deliveryFee,
    tax,
    total,
    getOrderItems,
  } = useCart()

  const createOrderMutation = useMutation({
    mutationFn: orderService.createOrder,
    onSuccess: (data) => {
      clearCart()
      navigate(`/user/orders/${data.id}`)
    },
  })

  const handleCheckout = () => {
    const orderData = {
      items: getOrderItems(),
      total,
    }
    createOrderMutation.mutate(orderData)
  }

  if (isEmpty) {
    return (
      <div className="py-8">
        <div className="container-custom">
          <EmptyState
            icon="🛒"
            title="Votre panier est vide"
            description="Ajoutez des plats depuis notre menu"
            action={
              <Button onClick={() => navigate('/menu')}>
                Voir le menu
              </Button>
            }
          />
        </div>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Mon panier</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          <div>
            <CartSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
            />
            <Button
              fullWidth
              size="lg"
              className="mt-4"
              onClick={handleCheckout}
              loading={createOrderMutation.isPending}
            >
              Commander
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
