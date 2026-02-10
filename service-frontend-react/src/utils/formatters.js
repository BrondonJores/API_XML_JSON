import { format, formatDistance, formatDistanceToNow, parseISO } from 'date-fns'
import { fr } from 'date-fns/locale'

/**
 * Formate un prix en euros
 * @param {number} price - Prix à formater
 * @returns {string} Prix formaté
 */
export const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(price)
}

/**
 * Formate une date
 * @param {string|Date} date - Date à formater
 * @param {string} formatStr - Format de sortie
 * @returns {string} Date formatée
 */
export const formatDate = (date, formatStr = 'dd/MM/yyyy') => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, formatStr, { locale: fr })
}

/**
 * Formate une date et heure
 * @param {string|Date} date - Date à formater
 * @returns {string} Date et heure formatées
 */
export const formatDateTime = (date) => {
  return formatDate(date, 'dd/MM/yyyy à HH:mm')
}

/**
 * Formate une durée relative
 * @param {string|Date} date - Date de référence
 * @returns {string} Durée formatée
 */
export const formatRelativeTime = (date) => {
  if (!date) return ''
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: fr })
}

/**
 * Formate un numéro de téléphone
 * @param {string} phone - Numéro de téléphone
 * @returns {string} Numéro formaté
 */
export const formatPhone = (phone) => {
  if (!phone) return ''
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/)
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]} ${match[4]} ${match[5]}`
  }
  return phone
}

/**
 * Formate un nombre
 * @param {number} number - Nombre à formater
 * @param {number} decimals - Nombre de décimales
 * @returns {string} Nombre formaté
 */
export const formatNumber = (number, decimals = 0) => {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(number)
}

/**
 * Tronque un texte
 * @param {string} text - Texte à tronquer
 * @param {number} maxLength - Longueur maximale
 * @returns {string} Texte tronqué
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Capitalise la première lettre
 * @param {string} text - Texte à capitaliser
 * @returns {string} Texte capitalisé
 */
export const capitalize = (text) => {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Génère des initiales à partir d'un nom
 * @param {string} name - Nom complet
 * @returns {string} Initiales
 */
export const getInitials = (name) => {
  if (!name) return ''
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2)
}

/**
 * Formate un tableau d'allergènes
 * @param {Array} allergens - Liste d'allergènes
 * @returns {string} Allergènes formatés
 */
export const formatAllergens = (allergens) => {
  if (!allergens || allergens.length === 0) return 'Aucun'
  return allergens.join(', ')
}

/**
 * Calcule la note moyenne
 * @param {Array} ratings - Liste de notes
 * @returns {number} Note moyenne
 */
export const calculateAverageRating = (ratings) => {
  if (!ratings || ratings.length === 0) return 0
  const sum = ratings.reduce((acc, rating) => acc + rating, 0)
  return Math.round((sum / ratings.length) * 10) / 10
}

/**
 * Formate la taille d'un fichier
 * @param {number} bytes - Taille en octets
 * @returns {string} Taille formatée
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Octets'
  const k = 1024
  const sizes = ['Octets', 'Ko', 'Mo', 'Go']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
