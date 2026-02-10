import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { ArrowRightIcon, SparklesIcon, ClockIcon, TruckIcon } from '@heroicons/react/24/outline'
import menuService from '../../services/menuService'
import MealCard from '../../components/menu/MealCard'
import Button from '../../components/ui/Button'
import Loader from '../../components/ui/Loader'

/**
 * Page d'accueil avec section hero, carrousel de plats populaires,
 * aperçu des catégories et sections CTA
 */
const Home = () => {
  // Récupération des plats populaires
  const { data: popularMeals, isLoading: popularLoading } = useQuery({
    queryKey: ['popularMeals'],
    queryFn: () => menuService.getPopularMeals(6),
  })

  // Récupération des nouveaux plats
  const { data: newMeals, isLoading: newLoading } = useQuery({
    queryKey: ['newMeals'],
    queryFn: () => menuService.getNewMeals(6),
  })

  // Catégories principales
  const categories = [
    {
      id: 'entrees',
      name: 'Entrées',
      image: 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=400',
      description: 'Commencez votre repas en beauté',
    },
    {
      id: 'plats',
      name: 'Plats principaux',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
      description: 'Des saveurs inoubliables',
    },
    {
      id: 'desserts',
      name: 'Desserts',
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
      description: 'Une touche sucrée pour finir',
    },
    {
      id: 'boissons',
      name: 'Boissons',
      image: 'https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400',
      description: 'Rafraîchissements et cocktails',
    },
  ]

  // Avantages du service
  const features = [
    {
      icon: SparklesIcon,
      title: 'Ingrédients frais',
      description: 'Des produits de qualité sélectionnés quotidiennement',
    },
    {
      icon: ClockIcon,
      title: 'Service rapide',
      description: 'Commandez en ligne et récupérez rapidement',
    },
    {
      icon: TruckIcon,
      title: 'Livraison disponible',
      description: 'Profitez de nos plats chez vous',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Section Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Contenu texte */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Savourez l&apos;excellence culinaire
              </h1>
              <p className="text-xl text-blue-100">
                Découvrez notre sélection de plats préparés avec passion et des ingrédients de qualité.
                Commandez maintenant et régalez-vous.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/menu">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                    Voir le menu
                    <ArrowRightIcon className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="secondary" className="bg-blue-700 hover:bg-blue-600">
                    À propos
                  </Button>
                </Link>
              </div>
            </div>

            {/* Image hero */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800"
                alt="Plat gastronomique"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-800 p-6 rounded-lg shadow-xl">
                <p className="text-4xl font-bold text-blue-600">100+</p>
                <p className="text-sm text-gray-600">Plats délicieux</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section des plats populaires */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos plats populaires</h2>
            <p className="text-lg text-gray-600">Les préférés de nos clients</p>
          </div>

          {popularLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {popularMeals?.slice(0, 6).map((meal) => (
                <Link key={meal.id} to={`/menu/${meal.id}`}>
                  <MealCard meal={meal} />
                </Link>
              ))}
            </div>
          )}

          <div className="text-center">
            <Link to="/menu">
              <Button size="lg">
                Voir tous les plats
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Section des catégories */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Explorez nos catégories</h2>
            <p className="text-lg text-gray-600">Une variété pour tous les goûts</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/menu?category=${category.id}`}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-200">{category.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section des nouveautés */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nouveautés</h2>
            <p className="text-lg text-gray-600">Découvrez nos dernières créations</p>
          </div>

          {newLoading ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newMeals?.slice(0, 3).map((meal) => (
                <Link key={meal.id} to={`/menu/${meal.id}`}>
                  <MealCard meal={meal} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Section des avantages */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="text-center p-8 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section CTA finale */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à commander ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Parcourez notre menu complet et trouvez vos plats préférés
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/menu">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                Voir le menu complet
                <ArrowRightIcon className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="bg-blue-700 hover:bg-blue-600">
                Nous contacter
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
