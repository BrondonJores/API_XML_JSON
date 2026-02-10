import { ChartBarIcon, FireIcon, BeakerIcon } from '@heroicons/react/24/outline'

/**
 * Tableau d'affichage des informations nutritionnelles d'un plat
 * @param {object} nutritional - Données nutritionnelles
 * @param {number} nutritional.calories - Calories (kcal)
 * @param {number} nutritional.proteins - Protéines (g)
 * @param {number} nutritional.carbs - Glucides (g)
 * @param {number} nutritional.fats - Lipides (g)
 * @param {number} nutritional.fiber - Fibres (g)
 * @param {number} nutritional.sugar - Sucres (g)
 * @param {number} nutritional.salt - Sel (g)
 * @param {boolean} compact - Affichage compact ou détaillé
 */
const NutritionalTable = ({ nutritional = {}, compact = false }) => {
  // Valeurs par défaut si non fournies
  const defaultNutritional = {
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    fiber: 0,
    sugar: 0,
    salt: 0,
    ...nutritional
  }

  // Données nutritionnelles principales
  const mainNutrients = [
    {
      key: 'calories',
      label: 'Calories',
      value: defaultNutritional.calories,
      unit: 'kcal',
      icon: FireIcon,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      key: 'proteins',
      label: 'Protéines',
      value: defaultNutritional.proteins,
      unit: 'g',
      icon: BeakerIcon,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      key: 'carbs',
      label: 'Glucides',
      value: defaultNutritional.carbs,
      unit: 'g',
      icon: ChartBarIcon,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      key: 'fats',
      label: 'Lipides',
      value: defaultNutritional.fats,
      unit: 'g',
      icon: ChartBarIcon,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    }
  ]

  // Données nutritionnelles secondaires
  const secondaryNutrients = [
    { key: 'fiber', label: 'Fibres', value: defaultNutritional.fiber, unit: 'g' },
    { key: 'sugar', label: 'Sucres', value: defaultNutritional.sugar, unit: 'g' },
    { key: 'salt', label: 'Sel', value: defaultNutritional.salt, unit: 'g' }
  ]

  // Affichage compact - grille de cartes
  if (compact) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {mainNutrients.map((nutrient) => {
          const Icon = nutrient.icon
          return (
            <div
              key={nutrient.key}
              className={`${nutrient.bgColor} rounded-lg p-3 text-center`}
            >
              <Icon className={`w-6 h-6 ${nutrient.color} mx-auto mb-2`} />
              <p className="text-xs text-gray-600 mb-1">{nutrient.label}</p>
              <p className={`text-lg font-bold ${nutrient.color}`}>
                {nutrient.value} {nutrient.unit}
              </p>
            </div>
          )
        })}
      </div>
    )
  }

  // Affichage détaillé - tableau complet
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* En-tête */}
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <ChartBarIcon className="w-5 h-5" />
          Informations nutritionnelles
        </h3>
        <p className="text-xs text-gray-600 mt-1">Pour 100g / 100ml</p>
      </div>

      {/* Tableau principal */}
      <div className="p-4">
        {/* Nutriments principaux avec icônes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          {mainNutrients.map((nutrient) => {
            const Icon = nutrient.icon
            return (
              <div
                key={nutrient.key}
                className={`${nutrient.bgColor} rounded-lg p-4 flex items-center gap-3`}
              >
                <Icon className={`w-8 h-8 ${nutrient.color}`} />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{nutrient.label}</p>
                  <p className={`text-2xl font-bold ${nutrient.color}`}>
                    {nutrient.value} {nutrient.unit}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Séparateur */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Nutriments secondaires */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-gray-700 mb-3">Détails supplémentaires</p>
          {secondaryNutrients.map((nutrient) => (
            <div
              key={nutrient.key}
              className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-700">{nutrient.label}</span>
              <span className="text-sm font-semibold text-gray-900">
                {nutrient.value} {nutrient.unit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Pied de page avec note */}
      <div className="bg-gray-50 px-4 py-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Les valeurs nutritionnelles peuvent varier selon la préparation
        </p>
      </div>
    </div>
  )
}

export default NutritionalTable
