import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import * as menuService from '../../services/menuService'
import { formatPrice } from '../../utils/formatters'
import { useCart } from '../../hooks/useCart'
import Button from '../../components/ui/Button'
import Badge from '../../components/ui/Badge'
import Loader from '../../components/ui/Loader'
import NutritionalTable from '../../components/menu/NutritionalTable'
import { ALLERGEN_LABELS } from '../../utils/constants'

function MealDetail() {
  const { id } = useParams()
  const { addItem } = useCart()
  const { data: meal, isLoading } = useQuery({
    queryKey: ['meal', id],
    queryFn: () => menuService.getMealById(id),
  })

  const handleAddToCart = () => {
    addItem(meal, 1)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader size="lg" />
      </div>
    )
  }

  if (!meal) {
    return (
      <div className="container-custom py-8">
        <p>Plat introuvable</p>
      </div>
    )
  }

  return (
    <div className="py-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              {meal.image ? (
                <img src={meal.image} alt={meal.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <span className="text-8xl">🍽️</span>
                </div>
              )}
            </div>
          </div>

          {/* Détails */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{meal.name}</h1>
            <p className="text-3xl font-bold text-primary-600 mb-6">
              {formatPrice(meal.price)}
            </p>

            <p className="text-gray-700 mb-6">{meal.description}</p>

            {/* Allergènes */}
            {meal.allergens && meal.allergens.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Allergènes:</h3>
                <div className="flex flex-wrap gap-2">
                  {meal.allergens.map((allergen) => (
                    <Badge key={allergen} variant="warning">
                      {ALLERGEN_LABELS[allergen]}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Button size="lg" fullWidth onClick={handleAddToCart}>
              Ajouter au panier
            </Button>

            {/* Informations nutritionnelles */}
            {meal.nutrition && (
              <div className="mt-8">
                <NutritionalTable nutrition={meal.nutrition} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MealDetail
