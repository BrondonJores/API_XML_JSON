import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const Sidebar = () => {
  const location = useLocation();

  // Configuration des liens de navigation pour l'admin
  const navigationLinks = [
    {
      name: 'Dashboard',
      path: '/admin',
      icon: HomeIcon,
    },
    {
      name: 'Meals',
      path: '/admin/meals',
      icon: ShoppingBagIcon,
    },
    {
      name: 'Users',
      path: '/admin/users',
      icon: UsersIcon,
    },
    {
      name: 'Analytics',
      path: '/admin/analytics',
      icon: ChartBarIcon,
    },
  ];

  // Vérification si le lien est actif
  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto">
      {/* Logo de l'application */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-indigo-400">FoodApp</span>
        </Link>
        <p className="text-xs text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Navigation principale */}
      <nav className="p-4">
        <ul className="space-y-2">
          {navigationLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.path);

            return (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  <span className="font-medium">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Section des paramètres supplémentaires */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
        <Link
          to="/admin/settings"
          className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
