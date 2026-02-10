import { useCartStore } from '../store/cartStore'

// Hook personnalisé pour gérer le panier
export const useCart = () => {
  const {
    items,
    deliveryInfo,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setDeliveryInfo,
    getTotal,
    getTotalItems,
    getOrderItems,
    isInCart,
    getItemQuantity,
  } = useCartStore()

  // Calculer le sous-total
  const subtotal = getTotal()

  // Calculer les frais de livraison
  const deliveryFee = subtotal > 0 ? (subtotal >= 30 ? 0 : 5) : 0

  // Calculer les taxes
  const taxRate = 0.1 // 10%
  const tax = subtotal * taxRate

  // Calculer le total final
  const total = subtotal + deliveryFee + tax

  // Nombre d'items
  const itemCount = getTotalItems()

  // Vérifier si le panier est vide
  const isEmpty = items.length === 0

  return {
    items,
    deliveryInfo,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    setDeliveryInfo,
    getOrderItems,
    isInCart,
    getItemQuantity,
    subtotal,
    deliveryFee,
    tax,
    total,
    itemCount,
    isEmpty,
  }
}
