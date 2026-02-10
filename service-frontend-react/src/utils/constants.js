// Constantes de l'application

// Statuts de commande
export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  READY: 'ready',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
}

// Labels des statuts de commande
export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: 'En attente',
  [ORDER_STATUS.CONFIRMED]: 'Confirmée',
  [ORDER_STATUS.PREPARING]: 'En préparation',
  [ORDER_STATUS.READY]: 'Prête',
  [ORDER_STATUS.DELIVERED]: 'Livrée',
  [ORDER_STATUS.CANCELLED]: 'Annulée',
}

// Couleurs des statuts de commande
export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'yellow',
  [ORDER_STATUS.CONFIRMED]: 'blue',
  [ORDER_STATUS.PREPARING]: 'orange',
  [ORDER_STATUS.READY]: 'green',
  [ORDER_STATUS.DELIVERED]: 'gray',
  [ORDER_STATUS.CANCELLED]: 'red',
}

// Rôles utilisateur
export const USER_ROLES = {
  USER: 'user',
  ADMIN: 'admin',
}

// Catégories de plats
export const MEAL_CATEGORIES = {
  STARTER: 'starter',
  MAIN: 'main',
  DESSERT: 'dessert',
  DRINK: 'drink',
  SIDE: 'side',
}

// Labels des catégories
export const MEAL_CATEGORY_LABELS = {
  [MEAL_CATEGORIES.STARTER]: 'Entrée',
  [MEAL_CATEGORIES.MAIN]: 'Plat principal',
  [MEAL_CATEGORIES.DESSERT]: 'Dessert',
  [MEAL_CATEGORIES.DRINK]: 'Boisson',
  [MEAL_CATEGORIES.SIDE]: 'Accompagnement',
}

// Allergènes communs
export const COMMON_ALLERGENS = [
  'gluten',
  'crustaces',
  'oeufs',
  'poisson',
  'arachides',
  'soja',
  'lait',
  'fruits_a_coque',
  'celeri',
  'moutarde',
  'sesame',
  'sulfites',
  'lupin',
  'mollusques',
]

// Labels des allergènes
export const ALLERGEN_LABELS = {
  gluten: 'Gluten',
  crustaces: 'Crustacés',
  oeufs: 'Œufs',
  poisson: 'Poisson',
  arachides: 'Arachides',
  soja: 'Soja',
  lait: 'Lait',
  fruits_a_coque: 'Fruits à coque',
  celeri: 'Céleri',
  moutarde: 'Moutarde',
  sesame: 'Sésame',
  sulfites: 'Sulfites',
  lupin: 'Lupin',
  mollusques: 'Mollusques',
}

// Périodes pour les statistiques
export const STATS_PERIODS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
}

// Labels des périodes
export const STATS_PERIOD_LABELS = {
  [STATS_PERIODS.DAY]: "Aujourd'hui",
  [STATS_PERIODS.WEEK]: 'Cette semaine',
  [STATS_PERIODS.MONTH]: 'Ce mois',
  [STATS_PERIODS.YEAR]: 'Cette année',
}

// Pagination
export const DEFAULT_PAGE_SIZE = 12
export const PAGE_SIZE_OPTIONS = [12, 24, 48, 96]

// Plages de prix
export const PRICE_RANGES = [
  { min: 0, max: 10, label: 'Moins de 10€' },
  { min: 10, max: 20, label: '10€ - 20€' },
  { min: 20, max: 30, label: '20€ - 30€' },
  { min: 30, max: 50, label: '30€ - 50€' },
  { min: 50, max: Infinity, label: 'Plus de 50€' },
]

// Temps de préparation estimés
export const PREP_TIME_RANGES = [
  { min: 0, max: 15, label: 'Moins de 15 min' },
  { min: 15, max: 30, label: '15-30 min' },
  { min: 30, max: 45, label: '30-45 min' },
  { min: 45, max: 60, label: '45-60 min' },
  { min: 60, max: Infinity, label: 'Plus de 60 min' },
]

// Types de formats pour le convertisseur
export const CONVERTER_FORMATS = {
  XML: 'xml',
  JSON: 'json',
}

// Types de schémas
export const SCHEMA_TYPES = {
  MENU: 'menu',
  ORDER: 'order',
  USER: 'user',
}

// Messages d'erreur
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Veuillez vérifier votre connexion Internet.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  UNAUTHORIZED: 'Vous devez être connecté pour effectuer cette action.',
  FORBIDDEN: "Vous n'avez pas les permissions nécessaires.",
  NOT_FOUND: 'Ressource introuvable.',
  VALIDATION_ERROR: 'Les données fournies sont invalides.',
  UNKNOWN_ERROR: 'Une erreur inattendue est survenue.',
}

// Messages de succès
export const SUCCESS_MESSAGES = {
  LOGIN: 'Connexion réussie',
  REGISTER: 'Inscription réussie',
  LOGOUT: 'Déconnexion réussie',
  ORDER_CREATED: 'Commande créée avec succès',
  ORDER_CANCELLED: 'Commande annulée',
  PROFILE_UPDATED: 'Profil mis à jour',
  PASSWORD_CHANGED: 'Mot de passe modifié',
}

// Durée des notifications (ms)
export const NOTIFICATION_DURATION = 5000

// Délai de debounce pour la recherche (ms)
export const SEARCH_DEBOUNCE_DELAY = 500

// Taille maximale des fichiers (bytes)
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Types de fichiers acceptés
export const ACCEPTED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
}

// URLs par défaut
export const DEFAULT_AVATAR = '/assets/default-avatar.png'
export const DEFAULT_MEAL_IMAGE = '/assets/default-meal.png'

export default {
  ORDER_STATUS,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_COLORS,
  USER_ROLES,
  MEAL_CATEGORIES,
  MEAL_CATEGORY_LABELS,
  COMMON_ALLERGENS,
  ALLERGEN_LABELS,
  STATS_PERIODS,
  STATS_PERIOD_LABELS,
  DEFAULT_PAGE_SIZE,
  PAGE_SIZE_OPTIONS,
  PRICE_RANGES,
  PREP_TIME_RANGES,
  CONVERTER_FORMATS,
  SCHEMA_TYPES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  NOTIFICATION_DURATION,
  SEARCH_DEBOUNCE_DELAY,
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES,
  DEFAULT_AVATAR,
  DEFAULT_MEAL_IMAGE,
}
