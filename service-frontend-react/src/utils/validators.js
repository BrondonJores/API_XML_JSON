// Valider un email
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Valider un mot de passe
export const validatePassword = (password) => {
  // Au moins 8 caractères, une majuscule, une minuscule, un chiffre
  const minLength = password.length >= 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)

  return {
    isValid: minLength && hasUpperCase && hasLowerCase && hasNumber,
    errors: {
      minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumber,
    }
  }
}

// Valider un numéro de téléphone français
export const validatePhoneNumber = (phone) => {
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/
  return phoneRegex.test(phone)
}

// Valider un code postal français
export const validatePostalCode = (postalCode) => {
  const postalCodeRegex = /^[0-9]{5}$/
  return postalCodeRegex.test(postalCode)
}

// Valider une URL
export const validateUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Valider un prix
export const validatePrice = (price) => {
  const numPrice = parseFloat(price)
  return !isNaN(numPrice) && numPrice >= 0
}

// Valider une quantité
export const validateQuantity = (quantity) => {
  const numQuantity = parseInt(quantity)
  return !isNaN(numQuantity) && numQuantity > 0 && Number.isInteger(numQuantity)
}

// Valider une date
export const validateDate = (date) => {
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj)
}

// Valider une date future
export const validateFutureDate = (date) => {
  const dateObj = new Date(date)
  const now = new Date()
  return validateDate(date) && dateObj > now
}

// Valider un JSON
export const validateJson = (jsonString) => {
  try {
    JSON.parse(jsonString)
    return true
  } catch {
    return false
  }
}

// Valider un XML basique
export const validateXml = (xmlString) => {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(xmlString, 'text/xml')
    return !doc.querySelector('parsererror')
  } catch {
    return false
  }
}

// Valider une carte de crédit (algorithme de Luhn)
export const validateCreditCard = (cardNumber) => {
  const cleaned = cardNumber.replace(/\D/g, '')
  if (cleaned.length < 13 || cleaned.length > 19) return false

  let sum = 0
  let isEven = false

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i])

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

// Valider un nom (lettres, espaces, tirets)
export const validateName = (name) => {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s\-']+$/
  return nameRegex.test(name) && name.length >= 2
}

// Valider une plage de prix
export const validatePriceRange = (min, max) => {
  const numMin = parseFloat(min)
  const numMax = parseFloat(max)
  return validatePrice(min) && validatePrice(max) && numMin <= numMax
}

export default {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  validatePostalCode,
  validateUrl,
  validatePrice,
  validateQuantity,
  validateDate,
  validateFutureDate,
  validateJson,
  validateXml,
  validateCreditCard,
  validateName,
  validatePriceRange,
}
