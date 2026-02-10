function About() {
  return (
    <div className="py-8">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">À propos</h1>
        
        <div className="prose prose-lg">
          <p className="text-gray-700 mb-4">
            Bienvenue sur notre plateforme de gestion de restaurant moderne.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Notre Mission</h2>
          <p className="text-gray-700 mb-4">
            Simplifier l'expérience de commande en ligne tout en offrant des outils
            professionnels pour la gestion de restaurant.
          </p>
          
          <h2 className="text-2xl font-semibold mt-8 mb-4">Technologies</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>React 18 pour une interface moderne et réactive</li>
            <li>Conversion XML/JSON pour l'interopérabilité</li>
            <li>Système de commande en temps réel</li>
            <li>Gestion complète du menu et des allergènes</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default About
