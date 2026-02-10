import { Link } from 'react-router-dom'
import { formatPrice } from '../../utils/formatters'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { useCart } from '../../hooks/useCart'

function MealCard({ meal }) {
  const { addItem, isInCart } = useCart()

  const handleAddToCart = (e) => {
    e.preventDefault()
    addItem(meal, 1)
  }

  return (
    <Link to={`/menu/${meal.id}`} className="group">
      <div className="card hover:shadow-xl transition-shadow p-0 overflow-hidden">
        <div className="relative h-48 bg-gray-200">
          {meal.image ? (
            <img 
              src={meal.image} 
              alt={meal.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <span className="text-4xl">🍽️</span>
            </div>
          )}
          {meal.isPopular && (
            <Badge variant="warning" className="absolute top-2 right-2">
              Populaire
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition">
            {meal.name}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {meal.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(meal.price)}
            </span>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              variant={isInCart(meal.id) ? 'success' : 'primary'}
            >
              {isInCart(meal.id) ? 'Ajouté' : 'Ajouter'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default MealCard
