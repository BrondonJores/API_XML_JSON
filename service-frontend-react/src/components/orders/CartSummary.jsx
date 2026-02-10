import { ShoppingCartIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '../../utils/formatters'
import useCart from '../../hooks/useCart'
import CartItem from './CartItem'

// Constantes pour les frais
const TAX_RATE = 0.1 // 10% de TVA
const DELIVERY_FEE = 3.5 // Frais de livraison en euros

/**
 * Résumé du panier avec liste des articles et totaux
 * @param {function} onCheckout - Fonction appelée lors du clic sur "Commander"
 */
const CartSummary = ({ onCheckout }) => {
  const { items, totalPrice, clearCart } = useCart()

  // Calculs des totaux
  const subtotal = totalPrice
  const tax = subtotal * TAX_RATE
  const deliveryFee = items.length > 0 ? DELIVERY_FEE : 0
  const total = subtotal + tax + deliveryFee

  // Si le panier est vide
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <div className="text-center py-8">
          <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Votre panier est vide
          </h3>
          <p className="text-gray-500">
            Ajoutez des plats pour commencer votre commande
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200">
      {/* En-tête */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Votre panier</h2>
          <button
            onClick={clearCart}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Vider le panier
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          {items.length} article{items.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Liste des articles */}
      <div className="px-6 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      {/* Résumé des prix */}
      <div className="px-6 py-4 border-t border-gray-200 space-y-3">
        {/* Sous-total */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Sous-total</span>
          <span className="text-gray-900 font-medium">
            {formatPrice(subtotal)}
          </span>
        </div>

        {/* TVA */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">
            TVA ({(TAX_RATE * 100).toFixed(0)}%)
          </span>
          <span className="text-gray-900 font-medium">{formatPrice(tax)}</span>
        </div>

        {/* Frais de livraison */}
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Frais de livraison</span>
          <span className="text-gray-900 font-medium">
            {formatPrice(deliveryFee)}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-indigo-600">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      {/* Bouton commander */}
      <div className="px-6 pb-6">
        <button
          onClick={() => onCheckout({ items, subtotal, tax, deliveryFee, total })}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
        >
          <ShoppingCartIcon className="w-5 h-5" />
          Commander {formatPrice(total)}
        </button>
      </div>
    </div>
  )
}

export default CartSummary
