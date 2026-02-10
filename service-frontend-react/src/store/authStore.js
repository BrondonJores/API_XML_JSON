import { create } from 'zustand'
import authService from '../services/authService'

/**
 * Store d'authentification avec Zustand
 */
const useAuthStore = create((set, get) => ({
  // État
  user: authService.getUser(),
  token: authService.getToken(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,

  // Actions
  /**
   * Connexion
   * @param {object} credentials - Identifiants
   */
  login: async (credentials) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authService.login(credentials)
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      })
      return data
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  /**
   * Inscription
   * @param {object} userData - Données utilisateur
   */
  register: async (userData) => {
    set({ isLoading: true, error: null })
    try {
      const data = await authService.register(userData)
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        isLoading: false,
      })
      return data
    } catch (error) {
      set({ error: error.message, isLoading: false })
      throw error
    }
  },

  /**
   * Déconnexion
   */
  logout: async () => {
    set({ isLoading: true })
    try {
      await authService.logout()
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      set({ isLoading: false })
      throw error
    }
  },

  /**
   * Mise à jour du profil
   * @param {object} userData - Nouvelles données
   */
  updateProfile: (userData) => {
    const updatedUser = { ...get().user, ...userData }
    authService.setUser(updatedUser)
    set({ user: updatedUser })
  },

  /**
   * Rafraîchissement du profil
   */
  refreshProfile: async () => {
    try {
      const user = await authService.getProfile()
      set({ user })
      return user
    } catch (error) {
      throw error
    }
  },

  /**
   * Vérification du rôle admin
   */
  isAdmin: () => {
    const { user } = get()
    return user && (user.role === 'admin' || user.isAdmin)
  },

  /**
   * Réinitialisation de l'erreur
   */
  clearError: () => {
    set({ error: null })
  },
}))

export default useAuthStore
