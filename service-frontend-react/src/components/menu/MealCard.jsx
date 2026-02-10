import { PlusIcon, CheckIcon } from '@heroicons/react/24/outline'
import useCart from '../../hooks/useCart'
import { useState } from 'react'

/**
 * Carte d'affichage d'un plat avec image, nom, description, prix et allergènes
 * @param {object} meal - Données du plat
 * @param {string} meal.id - Identifiant du plat
 * @param {string} meal.name - Nom du plat
 * @param {string} meal.description - Description du plat
 * @param {number} meal.price - Prix du plat
 * @param {string} meal.image - URL de l'image du plat
 * @param {array} meal.allergens - Liste des allergènes
 * @param {object} meal.nutritional - Informations nutritionnelles
 */
const MealCard = ({ meal }) => {
  const { addItem, hasItem } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  // Abréviations des allergènes
  const allergenLabels = {
    gluten: 'GLU',
    lactose: 'LAC',
    nuts: 'NUT',
    eggs: 'EGG',
    fish: 'FSH',
    shellfish: 'CRS',
    soy: 'SOY',
    celery: 'CEL',
  }

  // Gestion de l'ajout au panier
  const handleAddToCart = () => {
    addItem({
      id: meal.id,
      name: meal.name,
      price: meal.price,
      image: meal.image,
      quantity: 1,
    })
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  // Troncature de la description
  const truncateDescription = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const inCart = hasItem(meal.id)

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image du plat */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={meal.image || '/placeholder-meal.jpg'}
          alt={meal.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
        {meal.allergens && meal.allergens.length > 0 && (
          <div className="absolute top-2 right-2 bg-white rounded-md px-2 py-1 flex gap-1 shadow-sm">
            {meal.allergens.slice(0, 3).map((allergen, index) => (
              <span key={index} className="text-xs font-semibold text-red-600" title={allergen}>
                {allergenLabels[allergen] || 'ALR'}
              </span>
            ))}
            {meal.allergens.length > 3 && (
              <span className="text-xs text-gray-600 font-semibold">+{meal.allergens.length - 3}</span>
            )}
          </div>
        )}
      </div>

      {/* Contenu de la carte */}
      <div className="p-4">
        {/* Nom du plat */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{meal.name}</h3>

        {/* Description tronquée */}
        <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
          {truncateDescription(meal.description)}
        </p>

        {/* Prix et bouton d'ajout au panier */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">{meal.price.toFixed(2)} €</span>
          
          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              isAdded
                ? 'bg-green-500 text-white'
                : inCart
                ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isAdded ? (
              <>
                <CheckIcon className="w-5 h-5" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <PlusIcon className="w-5 h-5" />
                <span>Ajouter</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default MealCard
