import { Routes, Route } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import AdminLayout from '../components/layout/AdminLayout'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'

// Pages publiques
import Home from '../pages/public/Home'
import Menu from '../pages/public/Menu'
import MealDetail from '../pages/public/MealDetail'
import About from '../pages/public/About'
import Contact from '../pages/public/Contact'

// Pages d'authentification
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ForgotPassword from '../pages/auth/ForgotPassword'
import ResetPassword from '../pages/auth/ResetPassword'

// Pages utilisateur
import Order from '../pages/user/Order'
import MyOrders from '../pages/user/MyOrders'
import OrderDetail from '../pages/user/OrderDetail'
import Profile from '../pages/user/Profile'
import ProfileEdit from '../pages/user/ProfileEdit'
import QueueStatus from '../pages/user/QueueStatus'
import Favorites from '../pages/user/Favorites'

// Pages admin
import Dashboard from '../pages/admin/Dashboard'
import MealManagement from '../pages/admin/MealManagement'
import UsersManagement from '../pages/admin/UsersManagement'
import Analytics from '../pages/admin/Analytics'

// Pages outils
import XmlConverter from '../pages/tools/XmlConverter'

/**
 * Configuration des routes de l'application
 * @returns {JSX.Element} Routes configurées
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Routes publiques avec MainLayout */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="menu" element={<Menu />} />
        <Route path="menu/:id" element={<MealDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="converter" element={<XmlConverter />} />
      </Route>

      {/* Routes d'authentification sans layout */}
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />

      {/* Routes utilisateur protégées avec MainLayout */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route path="order" element={<Order />} />
        <Route path="my-orders" element={<MyOrders />} />
        <Route path="my-orders/:id" element={<OrderDetail />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/edit" element={<ProfileEdit />} />
        <Route path="queue" element={<QueueStatus />} />
        <Route path="favorites" element={<Favorites />} />
      </Route>

      {/* Routes admin protégées avec AdminLayout */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="meals" element={<MealManagement />} />
        <Route path="users" element={<UsersManagement />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>

      {/* Route 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

// Composant 404 simple
const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Page non trouvée</p>
        <a href="/" className="btn btn-primary">
          Retour à l'accueil
        </a>
      </div>
    </div>
  )
}

export default AppRoutes
