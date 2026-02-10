// URLs de base pour l'API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8003'

// Endpoints API
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Menu
  MEALS: '/menu/meals',
  CATEGORIES: '/menu/categories',
  ALLERGENS: '/menu/allergens',
  
  // Orders
  ORDERS: '/orders',
  MY_ORDERS: '/orders/my-orders',
  QUEUE: '/orders/queue',
  
  // Users
  USERS: '/users',
  PROFILE: '/users/profile',
  
  // Analytics
  ANALYTICS: '/analytics',
  STATS: '/analytics/stats',
  
  // Converter
  CONVERTER: '/converter',
}

// Statuts de commande
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'En attente',
  [ORDER_STATUS.CONFIRMED]: 'Confirmée',
  [ORDER_STATUS.PREPARING]: 'En préparation',
  [ORDER_STATUS.READY]: 'Prête',
  [ORDER_STATUS.DELIVERED]: 'Livrée',
  [ORDER_STATUS.CANCELLED]: 'Annulée',
}

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.CONFIRMED]: 'info',
  [ORDER_STATUS.PREPARING]: 'primary',
  [ORDER_STATUS.READY]: 'success',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'error',
}

// Rôles utilisateur
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  STAFF: 'staff',
}

// Catégories de menu
export const MEAL_CATEGORIES = [
  'Entrées',
  'Plats principaux',
  'Desserts',
  'Boissons',
  'Spécialités',
]

// Allergènes
export const ALLERGENS = [
  'Gluten',
  'Crustacés',
  'Oeufs',
  'Poissons',
  'Arachides',
  'Soja',
  'Lait',
  'Fruits à coque',
  'Céleri',
  'Moutarde',
  'Sésame',
  'Sulfites',
  'Lupin',
  'Mollusques',
]

// Plages de prix
export const PRICE_RANGES = [
  { label: 'Moins de 10€', min: 0, max: 10 },
  { label: '10€ - 20€', min: 10, max: 20 },
  { label: '20€ - 30€', min: 20, max: 30 },
  { label: 'Plus de 30€', min: 30, max: 1000 },
]

// Configuration de pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  PAGE_SIZE_OPTIONS: [12, 24, 48],
}

// Configuration de validation
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 30,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^(\+33|0)[1-9](\d{2}){4}$/,
}

// Formats de conversion
export const CONVERTER_FORMATS = {
  JSON: 'json',
  XML: 'xml',
}

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion au serveur',
  UNAUTHORIZED: 'Session expirée, veuillez vous reconnecter',
  FORBIDDEN: "Vous n'avez pas les permissions nécessaires",
  NOT_FOUND: 'Ressource introuvable',
  SERVER_ERROR: 'Erreur serveur, veuillez réessayer',
  VALIDATION_ERROR: 'Veuillez vérifier les champs du formulaire',
}

// Délais
export const DEBOUNCE_DELAY = 300 // ms
export const TOAST_DURATION = 4000 // ms

// Clés de stockage local
export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  CART: 'cart_data',
  FAVORITES: 'favorites_data',
}
