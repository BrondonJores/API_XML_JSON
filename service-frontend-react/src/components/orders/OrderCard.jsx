import { EyeIcon } from '@heroicons/react/24/outline'
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../../utils/constants'
import { formatPrice, formatDateTime } from '../../utils/formatters'

// Correspondance des couleurs de statut avec Tailwind
const STATUS_COLOR_CLASSES = {
  warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  info: 'bg-blue-100 text-blue-800 border-blue-200',
  primary: 'bg-indigo-100 text-indigo-800 border-indigo-200',
  success: 'bg-green-100 text-green-800 border-green-200',
  error: 'bg-red-100 text-red-800 border-red-200',
}

/**
 * Carte d'affichage d'une commande
 * @param {object} order - Données de la commande
 * @param {function} onViewDetails - Fonction appelée lors du clic sur "Voir détails"
 */
const OrderCard = ({ order, onViewDetails }) => {
  const statusColor = ORDER_STATUS_COLORS[order.status] || 'info'
  const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      {/* En-tête avec numéro et date */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Commande #{order.orderNumber || order.id}
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            {formatDateTime(order.createdAt)}
          </p>
        </div>
        
        {/* Badge de statut */}
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium border ${STATUS_COLOR_CLASSES[statusColor]}`}
        >
          {statusLabel}
        </span>
      </div>

      {/* Résumé des articles */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Articles:</p>
        <div className="space-y-1">
          {order.items && order.items.slice(0, 3).map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-700">
                {item.quantity}x {item.name}
              </span>
              <span className="text-gray-900 font-medium">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          ))}
          {order.items && order.items.length > 3 && (
            <p className="text-xs text-gray-500 italic">
              +{order.items.length - 3} autre(s) article(s)
            </p>
          )}
        </div>
      </div>

      {/* Total et bouton d'action */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <div>
          <p className="text-xs text-gray-500">Total</p>
          <p className="text-xl font-bold text-gray-900">
            {formatPrice(order.totalPrice || order.total)}
          </p>
        </div>
        
        <button
          onClick={() => onViewDetails(order)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
        >
          <EyeIcon className="w-4 h-4" />
          Voir détails
        </button>
      </div>
    </div>
  )
}

export default OrderCard
