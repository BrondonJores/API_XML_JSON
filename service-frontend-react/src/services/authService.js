import { get, post } from './api'
import { API_ENDPOINTS, STORAGE_KEYS } from '../utils/constants'

/**
 * Service d'authentification
 */
class AuthService {
  /**
   * Connexion utilisateur
   * @param {object} credentials - Identifiants (email, password)
   * @returns {Promise} Promesse de connexion
   */
  async login(credentials) {
    const response = await post(API_ENDPOINTS.LOGIN, credentials)
    if (response.data.token) {
      this.setToken(response.data.token)
      this.setUser(response.data.user)
    }
    return response.data
  }

  /**
   * Inscription utilisateur
   * @param {object} userData - Données utilisateur
   * @returns {Promise} Promesse d'inscription
   */
  async register(userData) {
    const response = await post(API_ENDPOINTS.REGISTER, userData)
    if (response.data.token) {
      this.setToken(response.data.token)
      this.setUser(response.data.user)
    }
    return response.data
  }

  /**
   * Déconnexion utilisateur
   * @returns {Promise} Promesse de déconnexion
   */
  async logout() {
    try {
      await post(API_ENDPOINTS.LOGOUT)
    } finally {
      this.clearAuth()
    }
  }

  /**
   * Rafraîchissement du token
   * @returns {Promise} Promesse de rafraîchissement
   */
  async refreshToken() {
    const response = await post(API_ENDPOINTS.REFRESH)
    if (response.data.token) {
      this.setToken(response.data.token)
    }
    return response.data
  }

  /**
   * Mot de passe oublié
   * @param {string} email - Email de l'utilisateur
   * @returns {Promise} Promesse d'envoi d'email
   */
  async forgotPassword(email) {
    const response = await post(API_ENDPOINTS.FORGOT_PASSWORD, { email })
    return response.data
  }

  /**
   * Réinitialisation du mot de passe
   * @param {object} data - Token et nouveau mot de passe
   * @returns {Promise} Promesse de réinitialisation
   */
  async resetPassword(data) {
    const response = await post(API_ENDPOINTS.RESET_PASSWORD, data)
    return response.data
  }

  /**
   * Récupération du profil utilisateur
   * @returns {Promise} Promesse de récupération du profil
   */
  async getProfile() {
    const response = await get(API_ENDPOINTS.PROFILE)
    this.setUser(response.data)
    return response.data
  }

  /**
   * Stockage du token
   * @param {string} token - Token d'authentification
   */
  setToken(token) {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token)
  }

  /**
   * Récupération du token
   * @returns {string|null} Token d'authentification
   */
  getToken() {
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  }

  /**
   * Stockage des données utilisateur
   * @param {object} user - Données utilisateur
   */
  setUser(user) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user))
  }

  /**
   * Récupération des données utilisateur
   * @returns {object|null} Données utilisateur
   */
  getUser() {
    const user = localStorage.getItem(STORAGE_KEYS.USER)
    return user ? JSON.parse(user) : null
  }

  /**
   * Vérification de l'authentification
   * @returns {boolean} État de l'authentification
   */
  isAuthenticated() {
    return !!this.getToken()
  }

  /**
   * Vérification du rôle admin
   * @returns {boolean} État du rôle admin
   */
  isAdmin() {
    const user = this.getUser()
    return user && (user.role === 'admin' || user.isAdmin)
  }

  /**
   * Nettoyage des données d'authentification
   */
  clearAuth() {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
  }
}

export default new AuthService()
