import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import * as menuService from '../../services/menuService'
import Button from '../../components/ui/Button'
import MealCard from '../../components/menu/MealCard'
import Loader from '../../components/ui/Loader'
import StatsCard from '../../components/charts/StatsCard'
import {
  RectangleStackIcon,
  RocketLaunchIcon,
  CreditCardIcon,
  ShoppingBagIcon,
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon,
  StarIcon
} from '@heroicons/react/24/outline'

// Composant pour les fonctionnalités
function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center transform hover:scale-110 transition-transform">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{title}</h3>
      <p className="text-gray-600 text-center leading-relaxed">{description}</p>
    </div>
  )
}

// Composant pour les témoignages
function TestimonialCard({ name, comment, rating }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <div className="flex items-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">"{comment}"</p>
      <p className="font-semibold text-gray-900">{name}</p>
    </div>
  )
}

function Home() {
  const { data: popularMeals, isLoading } = useQuery({
    queryKey: ['popularMeals'],
    queryFn: () => menuService.getPopularMeals(6),
  })

  return (
    <div>
      {/* Hero Section Moderne */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-24 overflow-hidden">
        {/* Formes décoratives */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="flex items-center text-sm font-medium">
                <SparklesIcon className="w-4 h-4 mr-2" />
                Bienvenue dans votre restaurant préféré
              </span>
            </div>
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              Savourez l'Excellence
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                À Chaque Bouchée
              </span>
            </h1>
            <p className="text-xl mb-10 text-primary-100 max-w-2xl mx-auto leading-relaxed">
              Découvrez notre sélection de plats gastronomiques préparés avec passion 
              et des ingrédients de première qualité. Commandez en ligne facilement.
            </p>
            <div className="flex justify-center space-x-4 flex-wrap gap-4">
              <Link to="/menu">
                <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                  <RectangleStackIcon className="w-5 h-5 mr-2" />
                  Explorer le menu
                </Button>
              </Link>
              <Link to="/converter">
                <Button size="lg" variant="outline" className="!text-white !border-white hover:!bg-white/10 shadow-xl">
                  <SparklesIcon className="w-5 h-5 mr-2" />
                  Convertisseur XML/JSON
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Stats / KPIs */}
      <section className="py-12 bg-gray-50 -mt-12 relative z-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
              title="Plats disponibles"
              value="50+"
              icon={RectangleStackIcon}
              color="primary"
            />
            <StatsCard
              title="Clients satisfaits"
              value="1,200+"
              icon={HeartIcon}
              color="success"
            />
            <StatsCard
              title="Commandes livrées"
              value="5,000+"
              icon={ShoppingBagIcon}
              color="warning"
            />
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Pourquoi nous choisir ?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une expérience culinaire exceptionnelle combinée à la technologie moderne
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={RectangleStackIcon}
              title="Menu Varié"
              description="Large sélection de plats pour tous les goûts, des entrées aux desserts, avec des options végétariennes et sans allergènes."
            />
            <FeatureCard
              icon={RocketLaunchIcon}
              title="Livraison Express"
              description="Commande prête en quelques minutes avec un système de suivi en temps réel pour une expérience optimale."
            />
            <FeatureCard
              icon={CreditCardIcon}
              title="Paiement Sécurisé"
              description="Transactions 100% sécurisées et protégées avec cryptage SSL pour votre tranquillité d'esprit."
            />
          </div>
        </div>
      </section>

      {/* Section Plats Populaires */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Plats Populaires
            </h2>
            <p className="text-xl text-gray-600">
              Découvrez les plats préférés de nos clients
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader size="lg" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {popularMeals?.map((meal) => (
                  <MealCard key={meal.id} meal={meal} />
                ))}
              </div>
              <div className="text-center">
                <Link to="/menu">
                  <Button size="lg" className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                    <RectangleStackIcon className="w-5 h-5 mr-2" />
                    Voir tout le menu
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-600">
              Des milliers de clients satisfaits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              name="Marie Dupont"
              rating={5}
              comment="Des plats délicieux et une livraison ultra rapide ! Je recommande vivement ce restaurant."
            />
            <TestimonialCard
              name="Jean Martin"
              rating={5}
              comment="Interface très intuitive et menu varié. C'est devenu mon restaurant préféré pour commander en ligne."
            />
            <TestimonialCard
              name="Sophie Laurent"
              rating={5}
              comment="Qualité exceptionnelle, portions généreuses et service impeccable. Bravo à toute l'équipe !"
            />
          </div>
        </div>
      </section>

      {/* Section CTA Finale */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <ShieldCheckIcon className="w-16 h-16 mx-auto mb-6 text-primary-200" />
          <h2 className="text-4xl font-bold mb-6">
            Prêt à commander ?
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Rejoignez des milliers de clients satisfaits et découvrez notre menu dès maintenant
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/menu">
              <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                <RectangleStackIcon className="w-5 h-5 mr-2" />
                Commander maintenant
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="!text-white !border-white hover:!bg-white/10 shadow-xl">
                En savoir plus
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
