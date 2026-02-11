import {
  SparklesIcon,
  ShieldCheckIcon,
  HeartIcon,
  LightBulbIcon,
  CodeBracketIcon,
  ServerIcon,
  CpuChipIcon,
  CloudIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

function About() {
  const values = [
    {
      icon: SparklesIcon,
      title: 'Excellence',
      description: 'Nous visons la perfection dans chaque plat et chaque interaction avec nos clients.'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Confiance',
      description: 'Sécurité et transparence sont au cœur de notre engagement envers vous.'
    },
    {
      icon: HeartIcon,
      title: 'Passion',
      description: 'L\'amour de la gastronomie guide chacune de nos décisions.'
    },
    {
      icon: LightBulbIcon,
      title: 'Innovation',
      description: 'Nous combinons tradition culinaire et technologies modernes.'
    }
  ]

  const techStack = [
    { name: 'React 18', category: 'Frontend', color: 'bg-blue-100 text-blue-700' },
    { name: 'Laravel', category: 'Backend', color: 'bg-red-100 text-red-700' },
    { name: 'Python', category: 'Services', color: 'bg-yellow-100 text-yellow-700' },
    { name: 'Java Spring', category: 'Menu API', color: 'bg-orange-100 text-orange-700' },
    { name: 'Docker', category: 'DevOps', color: 'bg-sky-100 text-sky-700' },
    { name: 'PostgreSQL', category: 'Database', color: 'bg-indigo-100 text-indigo-700' },
    { name: 'Redis', category: 'Cache', color: 'bg-rose-100 text-rose-700' },
    { name: 'Tailwind CSS', category: 'Design', color: 'bg-cyan-100 text-cyan-700' }
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white py-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="flex items-center text-sm font-medium">
                <SparklesIcon className="w-4 h-4 mr-2" />
                À propos de nous
              </span>
            </div>
            <h1 className="text-6xl font-extrabold mb-6 leading-tight">
              Notre Histoire,
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Votre Expérience
              </span>
            </h1>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto leading-relaxed">
              Découvrez comment nous combinons passion culinaire et innovation technologique 
              pour vous offrir la meilleure expérience de restauration en ligne.
            </p>
          </div>
        </div>
      </section>

      {/* Section Mission */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                Simplifier l'expérience de commande en ligne tout en offrant des outils 
                professionnels pour la gestion de restaurant moderne.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Nous croyons que la technologie peut améliorer l'expérience culinaire sans 
                jamais compromettre la qualité ou le goût. C'est pourquoi nous avons créé 
                une plateforme qui met en avant les plats tout en offrant une expérience 
                utilisateur exceptionnelle.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-primary-200 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-5 h-5 text-primary-700" />
                  </div>
                  <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
                    <HeartIcon className="w-5 h-5 text-green-700" />
                  </div>
                  <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center">
                    <ShieldCheckIcon className="w-5 h-5 text-blue-700" />
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">1,200+</span> clients satisfaits
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                  <CodeBracketIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">5,000+</h3>
                <p className="text-gray-600">Commandes livrées</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl mt-6">
                <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
                <p className="text-gray-600">Satisfaction client</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl -mt-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <ServerIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
                <p className="text-gray-600">Plats au menu</p>
              </div>
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
                <div className="w-12 h-12 bg-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">24/7</h3>
                <p className="text-gray-600">Service disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Valeurs */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Les principes qui guident notre travail au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center">
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Stack Technique */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-6">
              <CpuChipIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technologies Utilisées
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Une architecture moderne basée sur les microservices
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className={`${tech.color} rounded-xl px-4 py-3 text-center font-semibold text-sm hover:scale-105 transition-transform`}
                >
                  {tech.name}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <CodeBracketIcon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Frontend React</h3>
                <p className="text-sm text-gray-600">
                  Interface moderne et réactive avec React 18, Tailwind CSS et React Query
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4">
                  <ServerIcon className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Gateway Laravel</h3>
                <p className="text-sm text-gray-600">
                  API Gateway centralisée avec authentification JWT et gestion des sessions
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <CloudIcon className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Microservices</h3>
                <p className="text-sm text-gray-600">
                  Architecture découplée avec services Java (Menu) et Python (Commandes)
                </p>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <SparklesIcon className="w-5 h-5 text-primary-600 mr-2" />
                Fonctionnalités Clés
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                <li className="flex items-center">
                  <ShieldCheckIcon className="w-4 h-4 text-green-600 mr-2" />
                  Conversion XML/JSON pour l'interopérabilité
                </li>
                <li className="flex items-center">
                  <ShieldCheckIcon className="w-4 h-4 text-green-600 mr-2" />
                  Système de commande en temps réel
                </li>
                <li className="flex items-center">
                  <ShieldCheckIcon className="w-4 h-4 text-green-600 mr-2" />
                  Gestion complète du menu et des allergènes
                </li>
                <li className="flex items-center">
                  <ShieldCheckIcon className="w-4 h-4 text-green-600 mr-2" />
                  Dashboard administrateur avancé
                </li>
                <li className="flex items-center">
                  <ShieldCheckIcon className="w-4 h-4 text-green-600 mr-2" />
                  Authentification sécurisée JWT
                </li>
                <li className="flex items-center">
                  <ShieldCheckIcon className="w-4 h-4 text-green-600 mr-2" />
                  API RESTful documentées
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA Contact */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container-custom text-center">
          <EnvelopeIcon className="w-16 h-16 mx-auto mb-6 text-primary-200" />
          <h2 className="text-4xl font-bold mb-6">
            Une Question ? Contactez-nous !
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            Notre équipe est là pour vous aider et répondre à toutes vos questions
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                Nous contacter
              </Button>
            </Link>
            <Link to="/menu">
              <Button size="lg" variant="outline" className="!text-white !border-white hover:!bg-white/10 shadow-xl">
                Découvrir le menu
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
