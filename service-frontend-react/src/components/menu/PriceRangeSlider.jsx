import { useState } from 'react'

function PriceRangeSlider({ min = 0, max = 100, value, onChange }) {
  const [localValue, setLocalValue] = useState(value || [min, max])

  const handleChange = (index, newValue) => {
    const updated = [...localValue]
    updated[index] = Number(newValue)
    setLocalValue(updated)
    onChange?.(updated)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-gray-900">Prix</h3>
      <div className="flex items-center space-x-4">
        <input
          type="number"
          value={localValue[0]}
          onChange={(e) => handleChange(0, e.target.value)}
          min={min}
          max={localValue[1]}
          className="input w-20"
        />
        <span className="text-gray-500">-</span>
        <input
          type="number"
          value={localValue[1]}
          onChange={(e) => handleChange(1, e.target.value)}
          min={localValue[0]}
          max={max}
          className="input w-20"
        />
        <span className="text-gray-500">€</span>
      </div>
    </div>
  )
}

export default PriceRangeSlider
