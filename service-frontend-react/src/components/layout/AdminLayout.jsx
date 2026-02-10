import { Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';

const AdminLayout = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Barre latérale de navigation */}
      <Sidebar />
      
      {/* Contenu principal avec marge pour la sidebar */}
      <div className="flex-1 ml-64">
        {/* Barre supérieure avec informations utilisateur */}
        <header className="bg-white shadow-sm sticky top-0 z-40">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">
                Gérez votre application et vos données
              </p>
            </div>
            
            {/* Informations utilisateur */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Profil utilisateur */}
              <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase() || 'A'}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.name || 'Administrator'}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@foodapp.com'}</p>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Zone de contenu principal */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
