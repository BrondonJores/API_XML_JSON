import { useAuthStore } from '../store/authStore'

// Hook personnalisé pour gérer l'authentification
export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    clearError,
  } = useAuthStore()

  // Vérifier si l'utilisateur est admin
  const isAdmin = user?.role === 'admin' || user?.role === 'ADMIN'

  // Vérifier si l'utilisateur est connecté et vérifié
  const isVerified = isAuthenticated && user?.emailVerified

  return {
    user,
    isAuthenticated,
    isAdmin,
    isVerified,
    isLoading,
    error,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    clearError,
  }
}
