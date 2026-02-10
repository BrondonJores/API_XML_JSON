import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  CheckIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/24/outline'
import menuService from '../../services/menuService'
import useCart from '../../hooks/useCart'
import NutritionalTable from '../../components/menu/NutritionalTable'
import RatingStars from '../../components/common/RatingStars'
import Button from '../../components/ui/Button'
import Loader from '../../components/ui/Loader'
import Badge from '../../components/ui/Badge'

/**
 * Page de détail d'un plat avec image, nom, description complète,
 * prix, tableau nutritionnel, allergènes, notation et ajout au panier
 */
const MealDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem, hasItem, getItemQuantity, updateQuantity } = useCart()

  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  // Récupération des détails du plat
  const { data: meal, isLoading, error } = useQuery({
    queryKey: ['meal', id],
    queryFn: () => menuService.getMealById(id),
    retry: 1,
  })

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
    if (!meal) return

    if (hasItem(meal.id)) {
      const currentQuantity = getItemQuantity(meal.id)
      updateQuantity(meal.id, currentQuantity + quantity)
    } else {
      addItem({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        image: meal.image,
        quantity: quantity,
      })
    }

    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  // Gestion du retour en arrière
  const handleGoBack = () => {
    navigate(-1)
  }

  // Augmenter la quantité
  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  // Diminuer la quantité
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // État de chargement
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  // Gestion des erreurs
  if (error || !meal) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Plat introuvable</h2>
          <p className="text-gray-600 mb-6">
            Le plat que vous recherchez n&apos;existe pas ou n&apos;est plus disponible.
          </p>
          <Link to="/menu">
            <Button>
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Retour au menu
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const inCart = hasItem(meal.id)
  const cartQuantity = getItemQuantity(meal.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Bouton retour */}
        <button
          onClick={handleGoBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span className="font-medium">Retour</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Section image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src={meal.image || '/placeholder-meal.jpg'}
                alt={meal.name}
                className="w-full h-[500px] object-cover"
              />
              {/* Badge catégorie */}
              {meal.category && (
                <div className="absolute top-4 left-4">
                  <Badge variant="primary" className="text-lg px-4 py-2">
                    {meal.category}
                  </Badge>
                </div>
              )}
            </div>

            {/* Allergènes */}
            {meal.allergens && meal.allergens.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Allergènes</h3>
                <div className="flex flex-wrap gap-2">
                  {meal.allergens.map((allergen, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm font-medium"
                      title={allergen}
                    >
                      <span className="font-bold">{allergenLabels[allergen] || 'ALR'}</span>
                      <span>{allergen}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Section informations */}
          <div className="space-y-6">
            {/* Nom et notation */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{meal.name}</h1>
              <div className="flex items-center gap-4">
                <RatingStars rating={meal.rating || 4.5} readonly showCount maxRating={5} size="lg" />
                <span className="text-gray-600">({meal.reviewCount || 0} avis)</span>
              </div>
            </div>

            {/* Description complète */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {meal.description || 'Aucune description disponible pour ce plat.'}
              </p>
            </div>

            {/* Prix */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Prix</p>
                  <p className="text-4xl font-bold text-green-600">{meal.price.toFixed(2)} €</p>
                </div>
                {meal.discountPrice && (
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-1">Prix réduit</p>
                    <p className="text-2xl font-bold text-red-600 line-through">
                      {meal.discountPrice.toFixed(2)} €
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Sélecteur de quantité et ajout au panier */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-gray-700 font-medium">Quantité :</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1}
                    className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <MinusIcon className="w-5 h-5" />
                  </button>
                  <span className="px-6 py-2 bg-gray-50 text-xl font-semibold text-gray-800 rounded-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="p-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Prix total */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Total :</span>
                  <span className="text-2xl font-bold text-gray-800">
                    {(meal.price * quantity).toFixed(2)} €
                  </span>
                </div>
              </div>

              {/* Bouton d'ajout au panier */}
              <Button
                onClick={handleAddToCart}
                size="lg"
                className={`w-full ${
                  isAdded
                    ? 'bg-green-500 hover:bg-green-600'
                    : inCart
                    ? 'bg-blue-500 hover:bg-blue-600'
                    : ''
                }`}
              >
                {isAdded ? (
                  <>
                    <CheckIcon className="w-5 h-5 mr-2" />
                    Ajouté au panier
                  </>
                ) : inCart ? (
                  <>
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    Ajouter plus ({cartQuantity} déjà dans le panier)
                  </>
                ) : (
                  <>
                    <ShoppingCartIcon className="w-5 h-5 mr-2" />
                    Ajouter au panier
                  </>
                )}
              </Button>
            </div>

            {/* Informations supplémentaires */}
            {meal.preparationTime && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Informations supplémentaires
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Temps de préparation</span>
                    <span className="font-semibold text-gray-800">{meal.preparationTime} min</span>
                  </div>
                  {meal.servings && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Portions</span>
                      <span className="font-semibold text-gray-800">{meal.servings}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tableau nutritionnel */}
        {meal.nutritional && (
          <div className="mt-12">
            <NutritionalTable nutritional={meal.nutritional} />
          </div>
        )}

        {/* Section CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Découvrez d&apos;autres plats</h2>
          <p className="text-blue-100 mb-6">
            Explorez notre menu complet et trouvez vos plats préférés
          </p>
          <Link to="/menu">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              Voir le menu complet
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MealDetail
