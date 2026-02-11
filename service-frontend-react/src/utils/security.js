/**
 * Utilitaires de securite pour l'application
 * Protection contre XSS et autres vulnerabilites
 */
import DOMPurify from 'dompurify';

/**
 * Sanitize HTML content pour prevenir les attaques XSS
 * @param {string} dirty - Contenu HTML potentiellement dangereux
 * @param {object} config - Configuration DOMPurify optionnelle
 * @returns {string} - Contenu HTML nettoye
 */
export const sanitizeHtml = (dirty, config = {}) => {
  if (!dirty) return '';
  
  const defaultConfig = {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    ...config
  };
  
  return DOMPurify.sanitize(dirty, defaultConfig);
};

/**
 * Sanitize text content (supprime tous les tags HTML)
 * @param {string} text - Texte potentiellement dangereux
 * @returns {string} - Texte nettoye
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

/**
 * Escape HTML special characters
 * @param {string} text - Texte a echapper
 * @returns {string} - Texte echappe
 */
export const escapeHtml = (text) => {
  if (!text) return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return text.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Valider et nettoyer une URL
 * @param {string} url - URL a valider
 * @param {array} allowedProtocols - Protocoles autorises
 * @returns {string|null} - URL nettoyee ou null si invalide
 */
export const sanitizeUrl = (url, allowedProtocols = ['http:', 'https:', 'mailto:']) => {
  if (!url) return null;
  
  try {
    const parsedUrl = new URL(url);
    
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      console.warn(`Protocol non autorise: ${parsedUrl.protocol}`);
      return null;
    }
    
    return parsedUrl.href;
  } catch (error) {
    console.warn('URL invalide:', url);
    return null;
  }
};

/**
 * Configuration de DOMPurify pour l'application
 */
export const configureDOMPurify = () => {
  // Bloquer les protocoles dangereux
  DOMPurify.addHook('afterSanitizeAttributes', (node) => {
    if ('target' in node) {
      node.setAttribute('target', '_blank');
      node.setAttribute('rel', 'noopener noreferrer');
    }
  });
  
  // Supprimer les liens javascript:
  DOMPurify.addHook('uponSanitizeElement', (node, data) => {
    if (data.tagName === 'a') {
      const href = node.getAttribute('href');
      if (href && href.toLowerCase().startsWith('javascript:')) {
        node.remove();
      }
    }
  });
};

export default {
  sanitizeHtml,
  sanitizeText,
  escapeHtml,
  sanitizeUrl,
  configureDOMPurify
};
