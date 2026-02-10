import clsx from 'clsx'
import { MEAL_CATEGORIES, MEAL_CATEGORY_LABELS } from '../../utils/constants'

function CategoryFilter({ selected, onChange }) {
  const categories = [
    { value: 'all', label: 'Tous' },
    ...Object.entries(MEAL_CATEGORIES).map(([key, value]) => ({
      value,
      label: MEAL_CATEGORY_LABELS[value],
    })),
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onChange(category.value)}
          className={clsx(
            'px-4 py-2 rounded-lg font-medium transition',
            selected === category.value
              ? 'bg-primary-600 text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
          )}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
