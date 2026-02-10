import MealCard from './MealCard'
import Skeleton from '../ui/Skeleton'

function MealGrid({ meals, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card p-0 overflow-hidden">
            <Skeleton variant="rect" height="12rem" className="rounded-t-lg" />
            <div className="p-4 space-y-3">
              <Skeleton variant="title" />
              <Skeleton count={2} />
              <div className="flex justify-between">
                <Skeleton width="4rem" />
                <Skeleton width="5rem" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucun plat trouvé</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {meals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
    </div>
  )
}

export default MealGrid
