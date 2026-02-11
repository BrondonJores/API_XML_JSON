/**
 * Utilitaires de stockage securise pour l'authentification
 * IMPORTANT: En production, les tokens doivent etre stockes dans des cookies httpOnly
 * Cette implementation utilise localStorage comme fallback pour le developpement
 */

/**
 * Note de securite:
 * L'utilisation de localStorage pour les tokens JWT presente des risques XSS.
 * En production, il est recommande d'utiliser des cookies httpOnly definis par le serveur.
 * Cette implementation est un compromis pour le developpement.
 */

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

/**
 * Stocker le token d'authentification
 * @param {string} token - Token JWT
 */
export const setToken = (token) => {
  if (!token) {
    console.warn('Tentative de stockage d\'un token vide');
    return;
  }
  
  try {
    // En developpement: localStorage
    // En production: Le serveur doit definir un cookie httpOnly
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Erreur lors du stockage du token:', error);
  }
};

/**
 * Recuperer le token d'authentification
 * @returns {string|null} - Token JWT ou null
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Erreur lors de la recuperation du token:', error);
    return null;
  }
};

/**
 * Supprimer le token d'authentification
 */
export const removeToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Erreur lors de la suppression du token:', error);
  }
};

/**
 * Stocker les informations utilisateur
 * @param {object} user - Informations utilisateur
 */
export const setUser = (user) => {
  if (!user) {
    console.warn('Tentative de stockage d\'un utilisateur vide');
    return;
  }
  
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Erreur lors du stockage de l\'utilisateur:', error);
  }
};

/**
 * Recuperer les informations utilisateur
 * @returns {object|null} - Informations utilisateur ou null
 */
export const getUser = () => {
  try {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Erreur lors de la recuperation de l\'utilisateur:', error);
    return null;
  }
};

/**
 * Verifier si l'utilisateur est authentifie
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  const token = getToken();
  
  if (!token) {
    return false;
  }
  
  // Verifier si le token est expire
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convertir en millisecondes
    
    if (Date.now() >= expirationTime) {
      removeToken();
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Erreur lors de la verification du token:', error);
    removeToken();
    return false;
  }
};

/**
 * Obtenir le header Authorization pour les requetes API
 * @returns {object} - Headers avec Authorization
 */
export const getAuthHeaders = () => {
  const token = getToken();
  
  if (!token) {
    return {};
  }
  
  return {
    Authorization: `Bearer ${token}`
  };
};

/**
 * Decoder le token JWT (sans verification de signature)
 * ATTENTION: Ne pas se fier a ces donnees pour la securite
 * @param {string} token - Token JWT
 * @returns {object|null} - Payload decode ou null
 */
export const decodeToken = (token) => {
  if (!token) {
    return null;
  }
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Erreur lors du decodage du token:', error);
    return null;
  }
};

export default {
  setToken,
  getToken,
  removeToken,
  setUser,
  getUser,
  isAuthenticated,
  getAuthHeaders,
  decodeToken
};
