import { Link } from 'react-router-dom'
import {
  HeartIcon,
  SparklesIcon,
  UserGroupIcon,
  TrophyIcon,
  ClockIcon,
  StarIcon,
} from '@heroicons/react/24/outline'
import Button from '../../components/ui/Button'

/**
 * Page À propos avec l'histoire du restaurant,
 * présentation de l'équipe et valeurs de l'entreprise
 */
const About = () => {
  // Valeurs de l'entreprise
  const values = [
    {
      icon: HeartIcon,
      title: 'Passion',
      description:
        'Nous mettons tout notre cœur dans chaque plat que nous préparons. Notre passion pour la cuisine est notre moteur.',
    },
    {
      icon: SparklesIcon,
      title: 'Qualité',
      description:
        'Seuls les meilleurs ingrédients entrent dans notre cuisine. Nous sélectionnons nos produits avec le plus grand soin.',
    },
    {
      icon: UserGroupIcon,
      title: 'Convivialité',
      description:
        'Nous créons une atmosphère chaleureuse où chaque client se sent comme à la maison. Votre satisfaction est notre priorité.',
    },
    {
      icon: TrophyIcon,
      title: 'Excellence',
      description:
        'Nous visons l&apos;excellence dans tout ce que nous faisons, de la préparation à la présentation de nos plats.',
    },
  ]

  // Membres de l'équipe
  const team = [
    {
      name: 'Jean Dupont',
      role: 'Chef exécutif',
      image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400',
      description: '15 ans d&apos;expérience dans la gastronomie française',
    },
    {
      name: 'Marie Martin',
      role: 'Chef pâtissière',
      image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400',
      description: 'Spécialiste des desserts raffinés et créatifs',
    },
    {
      name: 'Pierre Bernard',
      role: 'Sous-chef',
      image: 'https://images.unsplash.com/photo-1560087637-bf797bc7796a?w=400',
      description: 'Expert en cuisine méditerranéenne et fusion',
    },
    {
      name: 'Sophie Dubois',
      role: 'Responsable du service',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      description: 'Garantit une expérience client exceptionnelle',
    },
  ]

  // Statistiques
  const stats = [
    { icon: ClockIcon, value: '20+', label: 'Années d&apos;expérience' },
    { icon: UserGroupIcon, value: '50000+', label: 'Clients satisfaits' },
    { icon: StarIcon, value: '4.8/5', label: 'Note moyenne' },
    { icon: TrophyIcon, value: '15+', label: 'Récompenses' },
  ]

  return (
    <div className="min-h-screen">
      {/* Section Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">À propos de nous</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Une histoire de passion culinaire et d&apos;excellence au service de votre plaisir
          </p>
        </div>
      </section>

      {/* Section Histoire */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800"
                alt="Notre restaurant"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl">
                <p className="text-4xl font-bold text-blue-600">20+</p>
                <p className="text-sm text-gray-600">Ans d&apos;histoire</p>
              </div>
            </div>

            {/* Contenu texte */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800">Notre Histoire</h2>
              <p className="text-gray-700 leading-relaxed">
                Fondé en 2004, notre restaurant est né d&apos;une passion commune pour la gastronomie et le
                désir de partager des moments culinaires exceptionnels. Ce qui a commencé comme un petit
                établissement familial est devenu une référence dans la région.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Au fil des années, nous avons perfectionné notre art, enrichi notre menu et agrandi notre
                équipe, tout en gardant notre philosophie intacte : servir des plats de qualité préparés
                avec amour et des ingrédients frais sélectionnés avec soin.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Aujourd&apos;hui, nous sommes fiers de servir des milliers de clients satisfaits chaque année
                et de continuer à innover tout en respectant les traditions culinaires qui font notre
                réputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Statistiques */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <p className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nos Valeurs</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Les principes qui guident chacune de nos actions et décisions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Notre Équipe</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Des professionnels passionnés qui travaillent ensemble pour créer des expériences
              culinaires inoubliables
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
              >
                {/* Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Informations */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Mission */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl shadow-2xl p-12 text-white text-center">
            <h2 className="text-4xl font-bold mb-6">Notre Mission</h2>
            <p className="text-xl text-blue-100 leading-relaxed mb-8">
              Offrir à nos clients une expérience gastronomique exceptionnelle en combinant des
              ingrédients de qualité supérieure, un savoir-faire culinaire expert et un service
              attentionné. Nous nous engageons à créer des moments mémorables autour de la table et à
              promouvoir une cuisine responsable et durable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/menu">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  Découvrir notre menu
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="secondary" className="bg-blue-700 hover:bg-blue-600">
                  Nous contacter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section Engagement */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Notre Engagement</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Ce que nous promettons à chacun de nos clients
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Fraîcheur garantie</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous travaillons avec des producteurs locaux et sélectionnons nos ingrédients chaque
                jour pour vous garantir des plats frais et savoureux.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Cuisine responsable</h3>
              <p className="text-gray-600 leading-relaxed">
                Nous privilégions les circuits courts, réduisons le gaspillage alimentaire et
                utilisons des emballages écologiques.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Satisfaction client</h3>
              <p className="text-gray-600 leading-relaxed">
                Votre satisfaction est notre priorité absolue. Nous sommes à votre écoute et nous
                nous efforçons de dépasser vos attentes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
