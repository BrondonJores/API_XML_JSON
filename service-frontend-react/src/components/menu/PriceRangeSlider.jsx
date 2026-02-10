import { useState, useEffect } from 'react'
import { CurrencyEuroIcon } from '@heroicons/react/24/outline'

/**
 * Slider de fourchette de prix avec valeurs min et max
 * @param {number} minPrice - Prix minimum de la fourchette
 * @param {number} maxPrice - Prix maximum de la fourchette
 * @param {function} onPriceChange - Fonction appelée lors du changement de prix
 * @param {number} absoluteMin - Prix minimum absolu possible
 * @param {number} absoluteMax - Prix maximum absolu possible
 */
const PriceRangeSlider = ({ 
  minPrice = 0, 
  maxPrice = 50, 
  onPriceChange,
  absoluteMin = 0,
  absoluteMax = 100
}) => {
  const [localMin, setLocalMin] = useState(minPrice)
  const [localMax, setLocalMax] = useState(maxPrice)

  // Synchroniser les valeurs locales avec les props
  useEffect(() => {
    setLocalMin(minPrice)
    setLocalMax(maxPrice)
  }, [minPrice, maxPrice])

  // Gestion du changement de prix minimum
  const handleMinChange = (e) => {
    const value = parseFloat(e.target.value)
    if (value <= localMax) {
      setLocalMin(value)
    }
  }

  // Gestion du changement de prix maximum
  const handleMaxChange = (e) => {
    const value = parseFloat(e.target.value)
    if (value >= localMin) {
      setLocalMax(value)
    }
  }

  // Appliquer les changements après relâchement du slider
  const handleApplyChange = () => {
    if (onPriceChange) {
      onPriceChange({ min: localMin, max: localMax })
    }
  }

  // Réinitialiser les valeurs
  const handleReset = () => {
    setLocalMin(absoluteMin)
    setLocalMax(absoluteMax)
    if (onPriceChange) {
      onPriceChange({ min: absoluteMin, max: absoluteMax })
    }
  }

  // Calculer le pourcentage pour la barre de progression
  const minPercent = ((localMin - absoluteMin) / (absoluteMax - absoluteMin)) * 100
  const maxPercent = ((localMax - absoluteMin) / (absoluteMax - absoluteMin)) * 100

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      {/* En-tête */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CurrencyEuroIcon className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">Fourchette de prix</h3>
        </div>
        {(localMin !== absoluteMin || localMax !== absoluteMax) && (
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            Réinitialiser
          </button>
        )}
      </div>

      {/* Affichage des valeurs sélectionnées */}
      <div className="flex items-center justify-between mb-6">
        <div className="bg-gray-50 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">Min</span>
          <p className="text-lg font-bold text-gray-800">{localMin.toFixed(2)} €</p>
        </div>
        <div className="text-gray-400">—</div>
        <div className="bg-gray-50 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">Max</span>
          <p className="text-lg font-bold text-gray-800">{localMax.toFixed(2)} €</p>
        </div>
      </div>

      {/* Container des sliders */}
      <div className="relative mb-6">
        {/* Barre de fond */}
        <div className="h-2 bg-gray-200 rounded-full"></div>
        
        {/* Barre de progression active */}
        <div
          className="absolute h-2 bg-blue-600 rounded-full top-0"
          style={{
            left: `${minPercent}%`,
            right: `${100 - maxPercent}%`,
          }}
        ></div>

        {/* Slider pour le prix minimum */}
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step="0.5"
          value={localMin}
          onChange={handleMinChange}
          onMouseUp={handleApplyChange}
          onTouchEnd={handleApplyChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none top-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
        />

        {/* Slider pour le prix maximum */}
        <input
          type="range"
          min={absoluteMin}
          max={absoluteMax}
          step="0.5"
          value={localMax}
          onChange={handleMaxChange}
          onMouseUp={handleApplyChange}
          onTouchEnd={handleApplyChange}
          className="absolute w-full h-2 appearance-none bg-transparent pointer-events-none top-0 [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-blue-600 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
        />
      </div>

      {/* Étiquettes des limites */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{absoluteMin.toFixed(2)} €</span>
        <span>{absoluteMax.toFixed(2)} €</span>
      </div>
    </div>
  )
}

export default PriceRangeSlider
