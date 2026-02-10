import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import menuService from '../../services/menuService'
import SearchBar from '../../components/common/SearchBar'
import CategoryFilter from '../../components/menu/CategoryFilter'
import AllergenFilter from '../../components/menu/AllergenFilter'
import PriceRangeSlider from '../../components/menu/PriceRangeSlider'
import MealGrid from '../../components/menu/MealGrid'
import useDebounce from '../../hooks/useDebounce'

/**
 * Page du menu avec barre de recherche, filtres de catégorie,
 * filtres d'allergènes, slider de prix et grille de plats
 */
const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  
  // États pour les filtres
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'Tous')
  const [selectedAllergens, setSelectedAllergens] = useState([])
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 })

  // Debounce de la recherche pour éviter trop de requêtes
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  // Récupération des catégories disponibles
  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => menuService.getCategories(),
  })

  // Récupération des allergènes disponibles
  const { data: allergens } = useQuery({
    queryKey: ['allergens'],
    queryFn: () => menuService.getAllergens(),
  })

  // Construction des paramètres de recherche
  const searchFilters = {
    search: debouncedSearchTerm || undefined,
    category: selectedCategory !== 'Tous' ? selectedCategory : undefined,
    excludeAllergens: selectedAllergens.length > 0 ? selectedAllergens.join(',') : undefined,
    minPrice: priceRange.min,
    maxPrice: priceRange.max,
  }

  // Récupération des plats avec filtres
  const { data: meals, isLoading } = useQuery({
    queryKey: ['meals', searchFilters],
    queryFn: () => menuService.getMeals(searchFilters),
  })

  // Mise à jour des paramètres d'URL
  useEffect(() => {
    const params = {}
    if (debouncedSearchTerm) params.search = debouncedSearchTerm
    if (selectedCategory !== 'Tous') params.category = selectedCategory
    setSearchParams(params)
  }, [debouncedSearchTerm, selectedCategory, setSearchParams])

  // Gestion du changement de recherche
  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }

  // Gestion du changement de catégorie
  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
  }

  // Gestion du changement d'allergènes
  const handleAllergenChange = (allergens) => {
    setSelectedAllergens(allergens)
  }

  // Gestion du changement de prix
  const handlePriceChange = (range) => {
    setPriceRange(range)
  }

  // Réinitialisation de tous les filtres
  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('Tous')
    setSelectedAllergens([])
    setPriceRange({ min: 0, max: 100 })
    setSearchParams({})
  }

  // Vérifier si des filtres sont actifs
  const hasActiveFilters =
    searchTerm ||
    selectedCategory !== 'Tous' ||
    selectedAllergens.length > 0 ||
    priceRange.min !== 0 ||
    priceRange.max !== 100

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Notre Menu</h1>
          <p className="text-lg text-gray-600">
            Découvrez notre sélection de plats délicieux préparés avec soin
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-6">
          <SearchBar
            placeholder="Rechercher un plat, un ingrédient..."
            onSearch={handleSearchChange}
            defaultValue={searchTerm}
            className="w-full"
          />
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Panneau de filtres latéral */}
          <aside className="lg:col-span-1 space-y-6">
            {/* Bouton de réinitialisation des filtres */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="w-full px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
              >
                Réinitialiser tous les filtres
              </button>
            )}

            {/* Filtre de catégories */}
            <CategoryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              categories={
                categories?.map((cat) => ({
                  id: cat.id || cat.name.toLowerCase(),
                  name: cat.name,
                })) || []
              }
            />

            {/* Filtre d'allergènes */}
            <AllergenFilter
              selectedAllergens={selectedAllergens}
              onAllergenChange={handleAllergenChange}
              allergens={
                allergens?.map((allergen) => ({
                  id: allergen.id || allergen.name.toLowerCase(),
                  name: allergen.name,
                  label: allergen.label || allergen.name.substring(0, 3).toUpperCase(),
                })) || []
              }
            />

            {/* Slider de fourchette de prix */}
            <PriceRangeSlider
              minPrice={priceRange.min}
              maxPrice={priceRange.max}
              onPriceChange={handlePriceChange}
              absoluteMin={0}
              absoluteMax={100}
            />

            {/* Informations sur les résultats */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-800">
                  {isLoading ? '...' : meals?.length || 0}
                </span>{' '}
                plat{meals?.length !== 1 ? 's' : ''} trouvé{meals?.length !== 1 ? 's' : ''}
              </p>
            </div>
          </aside>

          {/* Grille des plats */}
          <main className="lg:col-span-3">
            {/* Indicateur de filtres actifs */}
            {hasActiveFilters && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Filtres actifs :</span>
                  {searchTerm && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 bg-blue-100 rounded text-xs">
                      Recherche : &quot;{searchTerm}&quot;
                    </span>
                  )}
                  {selectedCategory !== 'Tous' && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 bg-blue-100 rounded text-xs">
                      Catégorie : {selectedCategory}
                    </span>
                  )}
                  {selectedAllergens.length > 0 && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 bg-blue-100 rounded text-xs">
                      {selectedAllergens.length} allergène{selectedAllergens.length !== 1 ? 's' : ''} exclu
                      {selectedAllergens.length !== 1 ? 's' : ''}
                    </span>
                  )}
                  {(priceRange.min !== 0 || priceRange.max !== 100) && (
                    <span className="ml-2 inline-flex items-center px-2 py-1 bg-blue-100 rounded text-xs">
                      Prix : {priceRange.min}€ - {priceRange.max}€
                    </span>
                  )}
                </p>
              </div>
            )}

            {/* Grille de plats */}
            <MealGrid
              meals={meals}
              loading={isLoading}
              emptyMessage={
                hasActiveFilters
                  ? 'Aucun plat ne correspond à vos critères. Essayez de modifier les filtres.'
                  : 'Aucun plat disponible pour le moment.'
              }
            />
          </main>
        </div>
      </div>
    </div>
  )
}

export default Menu
