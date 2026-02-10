import api from './api'

// Récupérer tous les plats avec filtres
export const getMeals = async (params = {}) => {
  const response = await api.get('/api/menu/meals', { params })
  return response.data
}

// Récupérer un plat par ID
export const getMealById = async (id) => {
  const response = await api.get(`/api/menu/meals/${id}`)
  return response.data
}

// Créer un nouveau plat (admin)
export const createMeal = async (mealData) => {
  const response = await api.post('/api/menu/meals', mealData)
  return response.data
}

// Mettre à jour un plat (admin)
export const updateMeal = async (id, mealData) => {
  const response = await api.put(`/api/menu/meals/${id}`, mealData)
  return response.data
}

// Supprimer un plat (admin)
export const deleteMeal = async (id) => {
  const response = await api.delete(`/api/menu/meals/${id}`)
  return response.data
}

// Récupérer les catégories
export const getCategories = async () => {
  const response = await api.get('/api/menu/categories')
  return response.data
}

// Récupérer les allergènes
export const getAllergens = async () => {
  const response = await api.get('/api/menu/allergens')
  return response.data
}

// Rechercher des plats
export const searchMeals = async (query, filters = {}) => {
  const response = await api.get('/api/menu/search', {
    params: { q: query, ...filters }
  })
  return response.data
}

// Récupérer les plats populaires
export const getPopularMeals = async (limit = 6) => {
  const response = await api.get('/api/menu/meals/popular', {
    params: { limit }
  })
  return response.data
}

// Récupérer les plats recommandés
export const getRecommendedMeals = async (limit = 6) => {
  const response = await api.get('/api/menu/meals/recommended', {
    params: { limit }
  })
  return response.data
}

// Ajouter un plat aux favoris
export const addToFavorites = async (mealId) => {
  const response = await api.post(`/api/menu/meals/${mealId}/favorite`)
  return response.data
}

// Retirer un plat des favoris
export const removeFromFavorites = async (mealId) => {
  const response = await api.delete(`/api/menu/meals/${mealId}/favorite`)
  return response.data
}

// Récupérer les favoris de l'utilisateur
export const getFavorites = async () => {
  const response = await api.get('/api/menu/favorites')
  return response.data
}

export default {
  getMeals,
  getMealById,
  createMeal,
  updateMeal,
  deleteMeal,
  getCategories,
  getAllergens,
  searchMeals,
  getPopularMeals,
  getRecommendedMeals,
  addToFavorites,
  removeFromFavorites,
  getFavorites,
}
