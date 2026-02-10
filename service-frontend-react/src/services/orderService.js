import api from './api'

// Créer une nouvelle commande
export const createOrder = async (orderData) => {
  const response = await api.post('/api/orders', orderData)
  return response.data
}

// Récupérer toutes les commandes de l'utilisateur
export const getMyOrders = async (params = {}) => {
  const response = await api.get('/api/orders/my-orders', { params })
  return response.data
}

// Récupérer une commande par ID
export const getOrderById = async (id) => {
  const response = await api.get(`/api/orders/${id}`)
  return response.data
}

// Mettre à jour le statut d'une commande (admin)
export const updateOrderStatus = async (id, status) => {
  const response = await api.patch(`/api/orders/${id}/status`, { status })
  return response.data
}

// Annuler une commande
export const cancelOrder = async (id) => {
  const response = await api.patch(`/api/orders/${id}/cancel`)
  return response.data
}

// Récupérer toutes les commandes (admin)
export const getAllOrders = async (params = {}) => {
  const response = await api.get('/api/orders', { params })
  return response.data
}

// Récupérer les statistiques des commandes (admin)
export const getOrderStats = async (period = 'week') => {
  const response = await api.get('/api/orders/stats', {
    params: { period }
  })
  return response.data
}

// Récupérer la position dans la file d'attente
export const getQueuePosition = async (orderId) => {
  const response = await api.get(`/api/orders/${orderId}/queue-position`)
  return response.data
}

// Récupérer le temps d'attente estimé
export const getEstimatedWaitTime = async (orderId) => {
  const response = await api.get(`/api/orders/${orderId}/estimated-time`)
  return response.data
}

// Récupérer l'historique de la commande
export const getOrderHistory = async (orderId) => {
  const response = await api.get(`/api/orders/${orderId}/history`)
  return response.data
}

// Évaluer une commande
export const rateOrder = async (orderId, rating, comment = '') => {
  const response = await api.post(`/api/orders/${orderId}/rating`, {
    rating,
    comment
  })
  return response.data
}

// Récupérer le QR code d'une commande
export const getOrderQRCode = async (orderId) => {
  const response = await api.get(`/api/orders/${orderId}/qr-code`)
  return response.data
}

export default {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getAllOrders,
  getOrderStats,
  getQueuePosition,
  getEstimatedWaitTime,
  getOrderHistory,
  rateOrder,
  getOrderQRCode,
}
