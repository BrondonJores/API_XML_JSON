import { Link } from 'react-router-dom'

// Composant Footer
function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* À propos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">À propos</h3>
            <p className="text-gray-400 text-sm">
              Application de gestion de restaurant avec système de commande en ligne et conversion XML/JSON.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/menu" className="text-gray-400 hover:text-white transition">
                  Menu
                </Link>
              </li>
              <li>
                <Link to="/converter" className="text-gray-400 hover:text-white transition">
                  Convertisseur
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Compte */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Compte</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/auth/login" className="text-gray-400 hover:text-white transition">
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="text-gray-400 hover:text-white transition">
                  Inscription
                </Link>
              </li>
              <li>
                <Link to="/user/orders" className="text-gray-400 hover:text-white transition">
                  Mes commandes
                </Link>
              </li>
              <li>
                <Link to="/user/profile" className="text-gray-400 hover:text-white transition">
                  Mon profil
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Email: contact@restaurant.fr</li>
              <li>Tél: 01 23 45 67 89</li>
              <li>Adresse: 123 Rue Example, Paris</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Restaurant API. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
