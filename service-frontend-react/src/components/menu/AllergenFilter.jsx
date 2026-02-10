import Checkbox from '../forms/Checkbox'
import { COMMON_ALLERGENS, ALLERGEN_LABELS } from '../../utils/constants'

function AllergenFilter({ selected = [], onChange }) {
  const handleToggle = (allergen) => {
    const newSelected = selected.includes(allergen)
      ? selected.filter(a => a !== allergen)
      : [...selected, allergen]
    onChange(newSelected)
  }

  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900 mb-3">Exclure les allergènes</h3>
      {COMMON_ALLERGENS.map((allergen) => (
        <Checkbox
          key={allergen}
          label={ALLERGEN_LABELS[allergen]}
          checked={selected.includes(allergen)}
          onChange={() => handleToggle(allergen)}
        />
      ))}
    </div>
  )
}

export default AllergenFilter
