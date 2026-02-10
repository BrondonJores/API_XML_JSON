import { Squares2X2Icon } from '@heroicons/react/24/outline'

/**
 * Filtre de catégories de plats avec boutons sélectionnables
 * @param {string} selectedCategory - Catégorie actuellement sélectionnée
 * @param {function} onCategoryChange - Fonction appelée lors du changement de catégorie
 * @param {array} categories - Liste des catégories disponibles
 */
const CategoryFilter = ({ 
  selectedCategory = 'Tous', 
  onCategoryChange,
  categories = []
}) => {
  // Catégories par défaut si aucune n'est fournie
  const defaultCategories = [
    { id: 'tous', name: 'Tous', icon: Squares2X2Icon },
    { id: 'entrees', name: 'Entrées', icon: null },
    { id: 'plats', name: 'Plats principaux', icon: null },
    { id: 'desserts', name: 'Desserts', icon: null },
    { id: 'boissons', name: 'Boissons', icon: null },
    { id: 'specialites', name: 'Spécialités', icon: null },
  ]

  const categoriesToUse = categories.length > 0 ? categories : defaultCategories

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Catégories</h3>
      
      {/* Grille de boutons de catégories */}
      <div className="flex flex-wrap gap-2">
        {categoriesToUse.map((category) => {
          const isSelected = selectedCategory.toLowerCase() === category.id || 
                           selectedCategory === category.name
          const Icon = category.icon

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.name)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {Icon && <Icon className="w-5 h-5" />}
              <span>{category.name}</span>
            </button>
          )
        })}
      </div>

      {/* Version mobile - Select dropdown */}
      <div className="md:hidden mt-4">
        <label htmlFor="category-select" className="block text-sm font-medium text-gray-700 mb-2">
          Sélectionner une catégorie
        </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {categoriesToUse.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default CategoryFilter
