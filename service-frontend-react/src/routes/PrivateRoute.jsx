import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

/**
 * Route protégée nécessitant une authentification
 * @param {object} props - Props du composant
 * @returns {JSX.Element} Route protégée
 */
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default PrivateRoute
