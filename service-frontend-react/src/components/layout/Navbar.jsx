import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import Button from '../ui/Button'

// Composant Navbar
function Navbar() {
  const { isAuthenticated, isAdmin, user, logout } = useAuth()
  const { itemCount } = useCart()
  const navigate = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/auth/login')
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-40">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Restaurant</span>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              Accueil
            </Link>
            <Link to="/menu" className="text-gray-700 hover:text-primary-600 transition">
              Menu
            </Link>
            <Link to="/converter" className="text-gray-700 hover:text-primary-600 transition">
              Convertisseur
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition">
              À propos
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition">
              Contact
            </Link>
          </div>

          {/* Actions Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Panier */}
                <Link to="/user/order" className="relative">
                  <svg className="w-6 h-6 text-gray-700 hover:text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>

                {/* Menu utilisateur */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                    <span>{user?.firstName || 'Profil'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <Link to="/user/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Mon profil
                    </Link>
                    <Link to="/user/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Mes commandes
                    </Link>
                    <Link to="/user/favorites" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      Mes favoris
                    </Link>
                    {isAdmin && (
                      <>
                        <div className="border-t border-gray-200 my-2" />
                        <Link to="/admin" className="block px-4 py-2 text-primary-600 hover:bg-gray-100">
                          Administration
                        </Link>
                      </>
                    )}
                    <div className="border-t border-gray-200 my-2" />
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Déconnexion
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outline" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button size="sm">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Bouton menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600">
                Accueil
              </Link>
              <Link to="/menu" className="text-gray-700 hover:text-primary-600">
                Menu
              </Link>
              <Link to="/converter" className="text-gray-700 hover:text-primary-600">
                Convertisseur
              </Link>
              {isAuthenticated ? (
                <>
                  <Link to="/user/profile" className="text-gray-700 hover:text-primary-600">
                    Mon profil
                  </Link>
                  <Link to="/user/orders" className="text-gray-700 hover:text-primary-600">
                    Mes commandes
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" className="text-primary-600">
                      Administration
                    </Link>
                  )}
                  <button onClick={handleLogout} className="text-left text-red-600">
                    Déconnexion
                  </button>
                </>
              ) : (
                <>
                  <Link to="/auth/login" className="text-gray-700">
                    Connexion
                  </Link>
                  <Link to="/auth/register" className="text-gray-700">
                    Inscription
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
