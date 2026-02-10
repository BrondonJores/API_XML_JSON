import useCartStore from '../store/cartStore'

/**
 * Hook personnalisé pour le panier
 * @returns {object} État et actions du panier
 */
const useCart = () => {
  const {
    items,
    totalItems,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    hasItem,
    getItemQuantity,
    getUniqueItemsCount,
  } = useCartStore()

  return {
    items,
    totalItems,
    totalPrice,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    hasItem,
    getItemQuantity,
    getUniqueItemsCount,
  }
}

export default useCart
