import { formatPrice } from '../../utils/formatters'
import Button from '../ui/Button'
import { RectangleStackIcon } from '@heroicons/react/24/outline'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200">
      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0">
        {item.meal.image ? (
          <img 
            src={item.meal.image} 
            alt={item.meal.name}
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary-50 rounded-lg">
            <RectangleStackIcon className="w-8 h-8 text-primary-600" />
          </div>
        )}
      </div>
      
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.meal.name}</h4>
        <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
        >
          -
        </Button>
        <span className="w-8 text-center font-medium">{item.quantity}</span>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
        >
          +
        </Button>
      </div>
      
      <div className="text-right">
        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
        <button
          onClick={() => onRemove(item.id)}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Retirer
        </button>
      </div>
    </div>
  )
}

export default CartItem
