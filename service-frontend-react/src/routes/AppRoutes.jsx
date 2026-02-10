import { Routes, Route, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import PrivateRoute from './PrivateRoute'
import AdminRoute from './AdminRoute'
import MainLayout from '../components/layout/MainLayout'
import AdminLayout from '../components/layout/AdminLayout'
import Loader from '../components/ui/Loader'

// Lazy loading des pages
const Home = lazy(() => import('../pages/public/Home'))
const Menu = lazy(() => import('../pages/public/Menu'))
const MealDetail = lazy(() => import('../pages/public/MealDetail'))
const About = lazy(() => import('../pages/public/About'))
const Contact = lazy(() => import('../pages/public/Contact'))

const Login = lazy(() => import('../pages/auth/Login'))
const Register = lazy(() => import('../pages/auth/Register'))
const ForgotPassword = lazy(() => import('../pages/auth/ForgotPassword'))
const ResetPassword = lazy(() => import('../pages/auth/ResetPassword'))

const Order = lazy(() => import('../pages/user/Order'))
const MyOrders = lazy(() => import('../pages/user/MyOrders'))
const OrderDetail = lazy(() => import('../pages/user/OrderDetail'))
const Profile = lazy(() => import('../pages/user/Profile'))
const ProfileEdit = lazy(() => import('../pages/user/ProfileEdit'))
const QueueStatus = lazy(() => import('../pages/user/QueueStatus'))
const Favorites = lazy(() => import('../pages/user/Favorites'))

const Dashboard = lazy(() => import('../pages/admin/Dashboard'))
const MealManagement = lazy(() => import('../pages/admin/MealManagement'))
const UsersManagement = lazy(() => import('../pages/admin/UsersManagement'))
const Analytics = lazy(() => import('../pages/admin/Analytics'))

const XmlConverter = lazy(() => import('../pages/tools/XmlConverter'))

// Composant de chargement
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <Loader size="lg" />
  </div>
)

function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Routes publiques */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="menu/:id" element={<MealDetail />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="converter" element={<XmlConverter />} />
        </Route>

        {/* Routes d'authentification */}
        <Route path="/auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* Routes utilisateur protégées */}
        <Route path="/user" element={<PrivateRoute><MainLayout /></PrivateRoute>}>
          <Route path="order" element={<Order />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/:id" element={<OrderDetail />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<ProfileEdit />} />
          <Route path="queue/:orderId" element={<QueueStatus />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>

        {/* Routes admin protégées */}
        <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="meals" element={<MealManagement />} />
          <Route path="users" element={<UsersManagement />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

        {/* Route 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
