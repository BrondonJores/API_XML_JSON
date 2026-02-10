import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

/**
 * Route protégée nécessitant un rôle admin
 * @param {object} props - Props du composant
 * @returns {JSX.Element} Route admin
 */
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!isAdmin()) {
    return <Navigate to="/" replace />
  }

  return children
}

export default AdminRoute
