import api from './api'

// Connexion utilisateur
export const login = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials)
  return response.data
}

// Inscription utilisateur
export const register = async (userData) => {
  const response = await api.post('/api/auth/register', userData)
  return response.data
}

// Déconnexion
export const logout = async () => {
  const response = await api.post('/api/auth/logout')
  return response.data
}

// Récupérer le profil utilisateur
export const getProfile = async () => {
  const response = await api.get('/api/auth/profile')
  return response.data
}

// Mettre à jour le profil
export const updateProfile = async (profileData) => {
  const response = await api.put('/api/auth/profile', profileData)
  return response.data
}

// Demander un reset de mot de passe
export const forgotPassword = async (email) => {
  const response = await api.post('/api/auth/forgot-password', { email })
  return response.data
}

// Réinitialiser le mot de passe
export const resetPassword = async (token, password) => {
  const response = await api.post('/api/auth/reset-password', { token, password })
  return response.data
}

// Changer le mot de passe
export const changePassword = async (passwords) => {
  const response = await api.put('/api/auth/change-password', passwords)
  return response.data
}

// Vérifier si l'email existe
export const checkEmail = async (email) => {
  const response = await api.post('/api/auth/check-email', { email })
  return response.data
}

export default {
  login,
  register,
  logout,
  getProfile,
  updateProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  checkEmail,
}
