import { post } from './api'
import { API_ENDPOINTS, CONVERTER_FORMATS } from '../utils/constants'

/**
 * Service de conversion XML/JSON
 */
class ConverterService {
  /**
   * Conversion de JSON vers XML
   * @param {object} jsonData - Données JSON
   * @returns {Promise} Promesse de conversion
   */
  async jsonToXml(jsonData) {
    const response = await post(`${API_ENDPOINTS.CONVERTER}/json-to-xml`, {
      data: jsonData,
      format: CONVERTER_FORMATS.XML,
    })
    return response.data
  }

  /**
   * Conversion de XML vers JSON
   * @param {string} xmlData - Données XML
   * @returns {Promise} Promesse de conversion
   */
  async xmlToJson(xmlData) {
    const response = await post(`${API_ENDPOINTS.CONVERTER}/xml-to-json`, {
      data: xmlData,
      format: CONVERTER_FORMATS.JSON,
    })
    return response.data
  }

  /**
   * Validation d'un JSON
   * @param {string} jsonString - Chaîne JSON
   * @returns {object} Résultat de validation
   */
  validateJson(jsonString) {
    try {
      JSON.parse(jsonString)
      return { isValid: true, error: null }
    } catch (error) {
      return { isValid: false, error: error.message }
    }
  }

  /**
   * Formatage d'un JSON
   * @param {string} jsonString - Chaîne JSON
   * @param {number} indent - Indentation
   * @returns {string} JSON formaté
   */
  formatJson(jsonString, indent = 2) {
    try {
      const obj = JSON.parse(jsonString)
      return JSON.stringify(obj, null, indent)
    } catch {
      return jsonString
    }
  }

  /**
   * Minification d'un JSON
   * @param {string} jsonString - Chaîne JSON
   * @returns {string} JSON minifié
   */
  minifyJson(jsonString) {
    try {
      const obj = JSON.parse(jsonString)
      return JSON.stringify(obj)
    } catch {
      return jsonString
    }
  }

  /**
   * Validation basique d'un XML
   * @param {string} xmlString - Chaîne XML
   * @returns {object} Résultat de validation
   */
  validateXml(xmlString) {
    try {
      const parser = new DOMParser()
      const doc = parser.parseFromString(xmlString, 'text/xml')
      const parserError = doc.querySelector('parsererror')
      
      if (parserError) {
        return { isValid: false, error: parserError.textContent }
      }
      
      return { isValid: true, error: null }
    } catch (error) {
      return { isValid: false, error: error.message }
    }
  }

  /**
   * Formatage d'un XML
   * @param {string} xmlString - Chaîne XML
   * @param {number} indent - Indentation
   * @returns {string} XML formaté
   */
  formatXml(xmlString, indent = 2) {
    try {
      const PADDING = ' '.repeat(indent)
      const reg = /(>)(<)(\/*)/g
      let formatted = xmlString.replace(reg, '$1\n$2$3')
      let pad = 0
      
      formatted = formatted.split('\n').map((line) => {
        let indent = 0
        if (line.match(/.+<\/\w[^>]*>$/)) {
          indent = 0
        } else if (line.match(/^<\/\w/) && pad > 0) {
          pad -= 1
        } else if (line.match(/^<\w[^>]*[^\/]>.*$/)) {
          indent = 1
        } else {
          indent = 0
        }
        
        const padding = PADDING.repeat(pad)
        pad += indent
        
        return padding + line
      }).join('\n')
      
      return formatted
    } catch {
      return xmlString
    }
  }

  /**
   * Téléchargement d'un fichier
   * @param {string} content - Contenu du fichier
   * @param {string} filename - Nom du fichier
   * @param {string} mimeType - Type MIME
   */
  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  /**
   * Téléchargement d'un JSON
   * @param {string} content - Contenu JSON
   * @param {string} filename - Nom du fichier
   */
  downloadJson(content, filename = 'data.json') {
    this.downloadFile(content, filename, 'application/json')
  }

  /**
   * Téléchargement d'un XML
   * @param {string} content - Contenu XML
   * @param {string} filename - Nom du fichier
   */
  downloadXml(content, filename = 'data.xml') {
    this.downloadFile(content, filename, 'application/xml')
  }
}

export default new ConverterService()
