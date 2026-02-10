function NutritionalTable({ nutrition }) {
  if (!nutrition) return null

  const rows = [
    { label: 'Calories', value: nutrition.calories, unit: 'kcal' },
    { label: 'Protéines', value: nutrition.protein, unit: 'g' },
    { label: 'Glucides', value: nutrition.carbs, unit: 'g' },
    { label: 'Lipides', value: nutrition.fat, unit: 'g' },
    { label: 'Fibres', value: nutrition.fiber, unit: 'g' },
  ]

  return (
    <div className="card">
      <h3 className="font-semibold text-lg mb-4">Valeurs nutritionnelles</h3>
      <table className="w-full">
        <tbody className="divide-y divide-gray-200">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="py-2 text-gray-700">{row.label}</td>
              <td className="py-2 text-right font-medium">
                {row.value} {row.unit}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default NutritionalTable
