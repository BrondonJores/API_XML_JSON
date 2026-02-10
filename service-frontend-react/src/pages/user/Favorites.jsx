import { useQuery } from '@tanstack/react-query'
import * as menuService from '../../services/menuService'
import MealGrid from '../../components/menu/MealGrid'
import EmptyState from '../../components/common/EmptyState'

function Favorites() {
  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: menuService.getFavorites,
  })

  return (
    <div className="py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">Mes favoris</h1>

        {!favorites || favorites.length === 0 ? (
          <EmptyState
            icon="❤️"
            title="Aucun favori"
            description="Ajoutez des plats à vos favoris"
          />
        ) : (
          <MealGrid meals={favorites} loading={isLoading} />
        )}
      </div>
    </div>
  )
}

export default Favorites
