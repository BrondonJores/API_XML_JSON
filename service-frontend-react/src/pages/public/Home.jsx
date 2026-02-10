import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import * as menuService from '../../services/menuService'
import Button from '../../components/ui/Button'
import MealCard from '../../components/menu/MealCard'
import Loader from '../../components/ui/Loader'

function Home() {
  const { data: popularMeals, isLoading } = useQuery({
    queryKey: ['popularMeals'],
    queryFn: () => menuService.getPopularMeals(6),
  })

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Bienvenue au Restaurant
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              Découvrez notre menu de plats délicieux et passez commande en ligne facilement.
            </p>
            <div className="flex space-x-4">
              <Link to="/menu">
                <Button size="lg" variant="secondary">
                  Voir le menu
                </Button>
              </Link>
              <Link to="/converter">
                <Button size="lg" variant="outline" className="!text-white !border-white hover:!bg-white/10">
                  Convertisseur XML/JSON
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Plats populaires */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Plats populaires
            </h2>
            <p className="text-gray-600">
              Découvrez les plats préférés de nos clients
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader size="lg" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {popularMeals?.map((meal) => (
                <MealCard key={meal.id} meal={meal} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/menu">
              <Button>Voir tout le menu</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2">Menu varié</h3>
              <p className="text-gray-600">
                Large sélection de plats pour tous les goûts
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2">Livraison rapide</h3>
              <p className="text-gray-600">
                Commande prête en quelques minutes
              </p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💳</div>
              <h3 className="text-xl font-semibold mb-2">Paiement sécurisé</h3>
              <p className="text-gray-600">
                Transactions sécurisées et protégées
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
