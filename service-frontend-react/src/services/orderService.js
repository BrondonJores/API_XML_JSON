import { get, post, put, patch, del } from './api'
import { API_ENDPOINTS } from '../utils/constants'

/**
 * Service de gestion des commandes
 */
class OrderService {
  /**
   * Création d'une commande
   * @param {object} orderData - Données de la commande
   * @returns {Promise} Promesse de création
   */
  async createOrder(orderData) {
    const response = await post(API_ENDPOINTS.ORDERS, orderData)
    return response.data
  }

  /**
   * Récupération de toutes les commandes
   * @param {object} params - Paramètres de recherche
   * @returns {Promise} Promesse de récupération
   */
  async getOrders(params = {}) {
    const response = await get(API_ENDPOINTS.ORDERS, { params })
    return response.data
  }

  /**
   * Récupération des commandes de l'utilisateur
   * @returns {Promise} Promesse de récupération
   */
  async getMyOrders() {
    const response = await get(API_ENDPOINTS.MY_ORDERS)
    return response.data
  }

  /**
   * Récupération d'une commande par ID
   * @param {number} id - ID de la commande
   * @returns {Promise} Promesse de récupération
   */
  async getOrderById(id) {
    const response = await get(`${API_ENDPOINTS.ORDERS}/${id}`)
    return response.data
  }

  /**
   * Mise à jour du statut d'une commande
   * @param {number} id - ID de la commande
   * @param {string} status - Nouveau statut
   * @returns {Promise} Promesse de mise à jour
   */
  async updateOrderStatus(id, status) {
    const response = await patch(`${API_ENDPOINTS.ORDERS}/${id}/status`, { status })
    return response.data
  }

  /**
   * Annulation d'une commande
   * @param {number} id - ID de la commande
   * @returns {Promise} Promesse d'annulation
   */
  async cancelOrder(id) {
    const response = await patch(`${API_ENDPOINTS.ORDERS}/${id}/cancel`)
    return response.data
  }

  /**
   * Suppression d'une commande
   * @param {number} id - ID de la commande
   * @returns {Promise} Promesse de suppression
   */
  async deleteOrder(id) {
    const response = await del(`${API_ENDPOINTS.ORDERS}/${id}`)
    return response.data
  }

  /**
   * Récupération de la file d'attente
   * @returns {Promise} Promesse de récupération
   */
  async getQueue() {
    const response = await get(API_ENDPOINTS.QUEUE)
    return response.data
  }

  /**
   * Récupération de la position dans la file
   * @param {number} orderId - ID de la commande
   * @returns {Promise} Promesse de récupération
   */
  async getQueuePosition(orderId) {
    const response = await get(`${API_ENDPOINTS.QUEUE}/${orderId}`)
    return response.data
  }

  /**
   * Calcul du montant total d'une commande
   * @param {Array} items - Articles de la commande
   * @returns {number} Montant total
   */
  calculateTotal(items) {
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }

  /**
   * Récupération des statistiques de commandes
   * @param {object} params - Paramètres
   * @returns {Promise} Promesse de récupération
   */
  async getOrderStats(params = {}) {
    const response = await get(`${API_ENDPOINTS.ORDERS}/stats`, { params })
    return response.data
  }
}

export default new OrderService()
