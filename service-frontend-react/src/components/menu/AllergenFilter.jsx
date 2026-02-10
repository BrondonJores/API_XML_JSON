import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

/**
 * Filtre d'allergènes avec cases à cocher pour exclure les plats
 * @param {array} selectedAllergens - Liste des allergènes actuellement sélectionnés
 * @param {function} onAllergenChange - Fonction appelée lors du changement de sélection
 * @param {array} allergens - Liste des allergènes disponibles
 */
const AllergenFilter = ({ 
  selectedAllergens = [], 
  onAllergenChange,
  allergens = []
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Allergènes par défaut si aucun n'est fourni
  const defaultAllergens = [
    { id: 'gluten', name: 'Gluten', label: 'GLU' },
    { id: 'lactose', name: 'Lactose', label: 'LAC' },
    { id: 'nuts', name: 'Fruits à coque', label: 'NUT' },
    { id: 'eggs', name: 'Oeufs', label: 'EGG' },
    { id: 'fish', name: 'Poisson', label: 'FSH' },
    { id: 'shellfish', name: 'Crustacés', label: 'CRS' },
    { id: 'soy', name: 'Soja', label: 'SOY' },
    { id: 'celery', name: 'Céleri', label: 'CEL' },
  ]

  const allergensToUse = allergens.length > 0 ? allergens : defaultAllergens

  // Gestion du changement de sélection d'un allergène
  const handleAllergenToggle = (allergenId) => {
    const updatedAllergens = selectedAllergens.includes(allergenId)
      ? selectedAllergens.filter(id => id !== allergenId)
      : [...selectedAllergens, allergenId]
    
    onAllergenChange(updatedAllergens)
  }

  // Réinitialiser tous les filtres
  const handleClearAll = () => {
    onAllergenChange([])
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      {/* En-tête avec bouton d'expansion */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">Allergènes à exclure</h3>
          {selectedAllergens.length > 0 && (
            <span className="bg-red-100 text-red-700 text-xs font-medium px-2 py-1 rounded-full">
              {selectedAllergens.length}
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          aria-label={isExpanded ? 'Réduire' : 'Développer'}
        >
          {isExpanded ? (
            <ChevronUpIcon className="w-5 h-5" />
          ) : (
            <ChevronDownIcon className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Contenu extensible */}
      {isExpanded && (
        <div className="space-y-3">
          {/* Grille de cases à cocher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {allergensToUse.map((allergen) => {
              const isChecked = selectedAllergens.includes(allergen.id)

              return (
                <label
                  key={allergen.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    isChecked
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleAllergenToggle(allergen.id)}
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 cursor-pointer"
                  />
                  <span className={`text-xs font-bold px-2 py-1 rounded ${isChecked ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-700'}`}>
                    {allergen.label}
                  </span>
                  <span className={`font-medium ${isChecked ? 'text-red-700' : 'text-gray-700'}`}>
                    {allergen.name}
                  </span>
                </label>
              )
            })}
          </div>

          {/* Bouton de réinitialisation */}
          {selectedAllergens.length > 0 && (
            <button
              onClick={handleClearAll}
              className="w-full mt-3 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Réinitialiser les filtres
            </button>
          )}
        </div>
      )}

      {/* Aperçu compact quand replié */}
      {!isExpanded && selectedAllergens.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedAllergens.map((allergenId) => {
            const allergen = allergensToUse.find(a => a.id === allergenId)
            if (!allergen) return null

            return (
              <span
                key={allergenId}
                className="inline-flex items-center gap-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium"
              >
                <span className="text-xs font-bold">{allergen.label}</span>
                <span>{allergen.name}</span>
              </span>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AllergenFilter
