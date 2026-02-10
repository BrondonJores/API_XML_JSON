import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { formatPrice } from '../../utils/formatters'
import useCart from '../../hooks/useCart'

/**
 * Élément du panier avec contrôles de quantité
 * @param {object} item - Article du panier
 */
const CartItem = ({ item }) => {
  const { updateQuantity, removeItem } = useCart()

  // Gérer le changement de quantité via les boutons
  const handleIncrement = () => {
    updateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1)
    }
  }

  // Gérer le changement de quantité via l'input
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10)
    if (!isNaN(value) && value > 0) {
      updateQuantity(item.id, value)
    }
  }

  // Gérer la suppression
  const handleRemove = () => {
    removeItem(item.id)
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b border-gray-200 last:border-b-0">
      {/* Image du plat */}
      <div className="flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        ) : (
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="text-gray-400 text-xs">Pas d&apos;image</span>
          </div>
        )}
      </div>

      {/* Informations du plat */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 truncate">
          {item.name}
        </h4>
        <p className="text-sm text-gray-500 mt-1">
          {formatPrice(item.price)} / unité
        </p>
        {item.category && (
          <p className="text-xs text-gray-400 mt-1">{item.category}</p>
        )}
      </div>

      {/* Contrôles de quantité */}
      <div className="flex items-center gap-2">
        {/* Bouton diminuer */}
        <button
          onClick={handleDecrement}
          disabled={item.quantity <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Diminuer la quantité"
        >
          <MinusIcon className="w-4 h-4 text-gray-600" />
        </button>

        {/* Input quantité */}
        <input
          type="number"
          min="1"
          value={item.quantity}
          onChange={handleQuantityChange}
          className="w-16 text-center border border-gray-300 rounded-md py-1 text-sm font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />

        {/* Bouton augmenter */}
        <button
          onClick={handleIncrement}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
          aria-label="Augmenter la quantité"
        >
          <PlusIcon className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* Prix total de l'article */}
      <div className="text-right min-w-[80px]">
        <p className="text-sm font-bold text-gray-900">
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>

      {/* Bouton supprimer */}
      <button
        onClick={handleRemove}
        className="flex-shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Supprimer l'article"
      >
        <TrashIcon className="w-5 h-5" />
      </button>
    </div>
  )
}

export default CartItem
