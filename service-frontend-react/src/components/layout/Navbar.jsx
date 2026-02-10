import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';

const Navbar = () => {
  // Gestion de l'état pour le menu mobile et le menu utilisateur
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  // Calcul du nombre total d'articles dans le panier
  const cartItemCount = items?.reduce((total, item) => total + item.quantity, 0) || 0;

  // Gestionnaire de recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  // Gestionnaire de déconnexion
  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo et liens de navigation principaux */}
          <div className="flex">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">FoodApp</span>
            </Link>
            
            {/* Liens de navigation - cachés sur mobile */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link to="/" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600 transition-colors">
                Home
              </Link>
              <Link to="/menu" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600 transition-colors">
                Menu
              </Link>
              <Link to="/about" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600 transition-colors">
                About
              </Link>
              <Link to="/contact" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600 transition-colors">
                Contact
              </Link>
              <Link to="/converter" className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600 transition-colors">
                Converter
              </Link>
            </div>
          </div>

          {/* Barre de recherche, panier et menu utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Barre de recherche - cachée sur mobile */}
            <form onSubmit={handleSearch} className="hidden md:flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Icône du panier */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-indigo-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Menu utilisateur */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Menu déroulant utilisateur */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-200">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                Login
              </Link>
            )}

            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/converter"
              className="block px-3 py-2 rounded-md text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Converter
            </Link>
            
            {/* Barre de recherche mobile */}
            <form onSubmit={handleSearch} className="px-3 py-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
