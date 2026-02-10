import axios from 'axios'
import { API_BASE_URL, ERROR_MESSAGES, STORAGE_KEYS } from '../utils/constants'
import toast from 'react-hot-toast'

// Création de l'instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepteur de requêtes - Ajout du token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur de réponses - Gestion des erreurs
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          // Session expirée
          localStorage.removeItem(STORAGE_KEYS.TOKEN)
          localStorage.removeItem(STORAGE_KEYS.USER)
          toast.error(ERROR_MESSAGES.UNAUTHORIZED)
          if (window.location.pathname !== '/login') {
            window.location.href = '/login'
          }
          break
          
        case 403:
          toast.error(ERROR_MESSAGES.FORBIDDEN)
          break
          
        case 404:
          toast.error(data.message || ERROR_MESSAGES.NOT_FOUND)
          break
          
        case 422:
          // Erreurs de validation
          if (data.errors) {
            Object.values(data.errors).forEach((errorArray) => {
              if (Array.isArray(errorArray)) {
                errorArray.forEach((msg) => toast.error(msg))
              }
            })
          } else {
            toast.error(data.message || ERROR_MESSAGES.VALIDATION_ERROR)
          }
          break
          
        case 500:
          toast.error(ERROR_MESSAGES.SERVER_ERROR)
          break
          
        default:
          toast.error(data.message || 'Une erreur est survenue')
      }
    } else if (error.request) {
      // Erreur réseau
      toast.error(ERROR_MESSAGES.NETWORK_ERROR)
    } else {
      toast.error('Une erreur est survenue')
    }
    
    return Promise.reject(error)
  }
)

/**
 * Requête GET
 * @param {string} url - URL de la requête
 * @param {object} config - Configuration axios
 * @returns {Promise} Promesse de la requête
 */
export const get = (url, config = {}) => {
  return api.get(url, config)
}

/**
 * Requête POST
 * @param {string} url - URL de la requête
 * @param {object} data - Données à envoyer
 * @param {object} config - Configuration axios
 * @returns {Promise} Promesse de la requête
 */
export const post = (url, data = {}, config = {}) => {
  return api.post(url, data, config)
}

/**
 * Requête PUT
 * @param {string} url - URL de la requête
 * @param {object} data - Données à envoyer
 * @param {object} config - Configuration axios
 * @returns {Promise} Promesse de la requête
 */
export const put = (url, data = {}, config = {}) => {
  return api.put(url, data, config)
}

/**
 * Requête PATCH
 * @param {string} url - URL de la requête
 * @param {object} data - Données à envoyer
 * @param {object} config - Configuration axios
 * @returns {Promise} Promesse de la requête
 */
export const patch = (url, data = {}, config = {}) => {
  return api.patch(url, data, config)
}

/**
 * Requête DELETE
 * @param {string} url - URL de la requête
 * @param {object} config - Configuration axios
 * @returns {Promise} Promesse de la requête
 */
export const del = (url, config = {}) => {
  return api.delete(url, config)
}

/**
 * Upload de fichier
 * @param {string} url - URL de la requête
 * @param {FormData} formData - Données du formulaire
 * @param {Function} onProgress - Callback de progression
 * @returns {Promise} Promesse de la requête
 */
export const upload = (url, formData, onProgress) => {
  return api.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        onProgress(percentCompleted)
      }
    },
  })
}

export default api
