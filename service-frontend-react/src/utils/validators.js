import { VALIDATION } from './constants'

/**
 * Valide une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean} Validité de l'email
 */
export const validateEmail = (email) => {
  if (!email) return false
  return VALIDATION.EMAIL_REGEX.test(email)
}

/**
 * Valide un mot de passe
 * @param {string} password - Mot de passe à valider
 * @returns {object} Résultat de validation
 */
export const validatePassword = (password) => {
  const errors = []
  
  if (!password) {
    errors.push('Le mot de passe est requis')
    return { isValid: false, errors }
  }
  
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    errors.push(`Le mot de passe doit contenir au moins ${VALIDATION.PASSWORD_MIN_LENGTH} caractères`)
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une minuscule')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une majuscule')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Valide un nom d'utilisateur
 * @param {string} username - Nom d'utilisateur à valider
 * @returns {object} Résultat de validation
 */
export const validateUsername = (username) => {
  const errors = []
  
  if (!username) {
    errors.push("Le nom d'utilisateur est requis")
    return { isValid: false, errors }
  }
  
  if (username.length < VALIDATION.USERNAME_MIN_LENGTH) {
    errors.push(`Le nom d'utilisateur doit contenir au moins ${VALIDATION.USERNAME_MIN_LENGTH} caractères`)
  }
  
  if (username.length > VALIDATION.USERNAME_MAX_LENGTH) {
    errors.push(`Le nom d'utilisateur ne doit pas dépasser ${VALIDATION.USERNAME_MAX_LENGTH} caractères`)
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    errors.push("Le nom d'utilisateur ne peut contenir que des lettres, chiffres, tirets et underscores")
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Valide un numéro de téléphone
 * @param {string} phone - Numéro de téléphone à valider
 * @returns {boolean} Validité du numéro
 */
export const validatePhone = (phone) => {
  if (!phone) return true // Le téléphone peut être optionnel
  return VALIDATION.PHONE_REGEX.test(phone)
}

/**
 * Valide un prix
 * @param {number} price - Prix à valider
 * @returns {boolean} Validité du prix
 */
export const validatePrice = (price) => {
  if (price === undefined || price === null) return false
  return typeof price === 'number' && price >= 0
}

/**
 * Valide une quantité
 * @param {number} quantity - Quantité à valider
 * @returns {boolean} Validité de la quantité
 */
export const validateQuantity = (quantity) => {
  if (quantity === undefined || quantity === null) return false
  return Number.isInteger(quantity) && quantity > 0
}

/**
 * Valide un champ requis
 * @param {any} value - Valeur à valider
 * @returns {boolean} Validité du champ
 */
export const validateRequired = (value) => {
  if (value === undefined || value === null) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  return true
}

/**
 * Valide une longueur minimale
 * @param {string} value - Valeur à valider
 * @param {number} minLength - Longueur minimale
 * @returns {boolean} Validité de la longueur
 */
export const validateMinLength = (value, minLength) => {
  if (!value) return false
  return value.length >= minLength
}

/**
 * Valide une longueur maximale
 * @param {string} value - Valeur à valider
 * @param {number} maxLength - Longueur maximale
 * @returns {boolean} Validité de la longueur
 */
export const validateMaxLength = (value, maxLength) => {
  if (!value) return true
  return value.length <= maxLength
}

/**
 * Valide une URL
 * @param {string} url - URL à valider
 * @returns {boolean} Validité de l'URL
 */
export const validateURL = (url) => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Valide un formulaire de commande
 * @param {object} orderData - Données de commande
 * @returns {object} Résultat de validation
 */
export const validateOrderForm = (orderData) => {
  const errors = {}
  
  if (!orderData.items || orderData.items.length === 0) {
    errors.items = 'Le panier est vide'
  }
  
  if (!validateRequired(orderData.deliveryAddress)) {
    errors.deliveryAddress = 'L\'adresse de livraison est requise'
  }
  
  if (!validatePhone(orderData.phone)) {
    errors.phone = 'Le numéro de téléphone est invalide'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Valide un formulaire de plat
 * @param {object} mealData - Données du plat
 * @returns {object} Résultat de validation
 */
export const validateMealForm = (mealData) => {
  const errors = {}
  
  if (!validateRequired(mealData.name)) {
    errors.name = 'Le nom est requis'
  }
  
  if (!validateRequired(mealData.description)) {
    errors.description = 'La description est requise'
  }
  
  if (!validatePrice(mealData.price)) {
    errors.price = 'Le prix est invalide'
  }
  
  if (!validateRequired(mealData.category)) {
    errors.category = 'La catégorie est requise'
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}
