import useAuthStore from '../store/authStore'

/**
 * Hook personnalisé pour l'authentification
 * @returns {object} État et actions d'authentification
 */
const useAuth = () => {
  const {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
    isAdmin,
    clearError,
  } = useAuthStore()

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    updateProfile,
    refreshProfile,
    isAdmin,
    clearError,
  }
}

export default useAuth
