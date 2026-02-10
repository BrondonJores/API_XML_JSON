import { get, post, put, del } from './api'
import { API_ENDPOINTS } from '../utils/constants'

/**
 * Service de gestion du menu
 */
class MenuService {
  /**
   * Récupération de tous les plats
   * @param {object} params - Paramètres de recherche
   * @returns {Promise} Promesse de récupération
   */
  async getMeals(params = {}) {
    const response = await get(API_ENDPOINTS.MEALS, { params })
    return response.data
  }

  /**
   * Récupération d'un plat par ID
   * @param {number} id - ID du plat
   * @returns {Promise} Promesse de récupération
   */
  async getMealById(id) {
    const response = await get(`${API_ENDPOINTS.MEALS}/${id}`)
    return response.data
  }

  /**
   * Création d'un plat
   * @param {object} mealData - Données du plat
   * @returns {Promise} Promesse de création
   */
  async createMeal(mealData) {
    const response = await post(API_ENDPOINTS.MEALS, mealData)
    return response.data
  }

  /**
   * Mise à jour d'un plat
   * @param {number} id - ID du plat
   * @param {object} mealData - Nouvelles données
   * @returns {Promise} Promesse de mise à jour
   */
  async updateMeal(id, mealData) {
    const response = await put(`${API_ENDPOINTS.MEALS}/${id}`, mealData)
    return response.data
  }

  /**
   * Suppression d'un plat
   * @param {number} id - ID du plat
   * @returns {Promise} Promesse de suppression
   */
  async deleteMeal(id) {
    const response = await del(`${API_ENDPOINTS.MEALS}/${id}`)
    return response.data
  }

  /**
   * Récupération des catégories
   * @returns {Promise} Promesse de récupération
   */
  async getCategories() {
    const response = await get(API_ENDPOINTS.CATEGORIES)
    return response.data
  }

  /**
   * Récupération des allergènes
   * @returns {Promise} Promesse de récupération
   */
  async getAllergens() {
    const response = await get(API_ENDPOINTS.ALLERGENS)
    return response.data
  }

  /**
   * Recherche de plats
   * @param {string} query - Terme de recherche
   * @param {object} filters - Filtres supplémentaires
   * @returns {Promise} Promesse de recherche
   */
  async searchMeals(query, filters = {}) {
    const response = await get(API_ENDPOINTS.MEALS, {
      params: {
        search: query,
        ...filters,
      },
    })
    return response.data
  }

  /**
   * Récupération des plats par catégorie
   * @param {string} category - Catégorie
   * @returns {Promise} Promesse de récupération
   */
  async getMealsByCategory(category) {
    const response = await get(API_ENDPOINTS.MEALS, {
      params: { category },
    })
    return response.data
  }

  /**
   * Récupération des plats populaires
   * @param {number} limit - Nombre de plats
   * @returns {Promise} Promesse de récupération
   */
  async getPopularMeals(limit = 6) {
    const response = await get(API_ENDPOINTS.MEALS, {
      params: { popular: true, limit },
    })
    return response.data
  }

  /**
   * Récupération des nouveaux plats
   * @param {number} limit - Nombre de plats
   * @returns {Promise} Promesse de récupération
   */
  async getNewMeals(limit = 6) {
    const response = await get(API_ENDPOINTS.MEALS, {
      params: { newest: true, limit },
    })
    return response.data
  }
}

export default new MenuService()
