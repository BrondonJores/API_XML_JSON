import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import * as authService from '../services/authService'

// Store pour gérer l'authentification
export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Connexion
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const data = await authService.login(credentials)
          localStorage.setItem('accessToken', data.accessToken)
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken)
          }
          set({
            user: data.user,
            accessToken: data.accessToken,
            isAuthenticated: true,
            isLoading: false,
          })
          return data
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Erreur de connexion',
            isLoading: false,
          })
          throw error
        }
      },

      // Inscription
      register: async (userData) => {
        set({ isLoading: true, error: null })
        try {
          const data = await authService.register(userData)
          localStorage.setItem('accessToken', data.accessToken)
          if (data.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken)
          }
          set({
            user: data.user,
            accessToken: data.accessToken,
            isAuthenticated: true,
            isLoading: false,
          })
          return data
        } catch (error) {
          set({
            error: error.response?.data?.message || "Erreur d'inscription",
            isLoading: false,
          })
          throw error
        }
      },

      // Déconnexion
      logout: async () => {
        try {
          await authService.logout()
        } catch (error) {
          console.error('Erreur lors de la déconnexion:', error)
        } finally {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            error: null,
          })
        }
      },

      // Récupérer le profil
      fetchProfile: async () => {
        set({ isLoading: true, error: null })
        try {
          const user = await authService.getProfile()
          set({ user, isLoading: false })
          return user
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Erreur de chargement du profil',
            isLoading: false,
          })
          throw error
        }
      },

      // Mettre à jour le profil
      updateProfile: async (profileData) => {
        set({ isLoading: true, error: null })
        try {
          const user = await authService.updateProfile(profileData)
          set({ user, isLoading: false })
          return user
        } catch (error) {
          set({
            error: error.response?.data?.message || 'Erreur de mise à jour du profil',
            isLoading: false,
          })
          throw error
        }
      },

      // Initialiser l'authentification
      initAuth: () => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          set({ accessToken: token, isAuthenticated: true })
          // Récupérer le profil en arrière-plan
          get().fetchProfile().catch(() => {
            // Si échec, déconnecter
            get().logout()
          })
        }
      },

      // Effacer les erreurs
      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
