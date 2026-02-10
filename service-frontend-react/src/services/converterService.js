import api from './api'

// Convertir XML vers JSON
export const xmlToJson = async (xmlContent) => {
  const response = await api.post('/api/converter/xml-to-json', {
    xml: xmlContent
  })
  return response.data
}

// Convertir JSON vers XML
export const jsonToXml = async (jsonContent) => {
  const response = await api.post('/api/converter/json-to-xml', {
    json: jsonContent
  })
  return response.data
}

// Valider un XML
export const validateXml = async (xmlContent, schemaType = 'menu') => {
  const response = await api.post('/api/converter/validate-xml', {
    xml: xmlContent,
    schema: schemaType
  })
  return response.data
}

// Valider un JSON
export const validateJson = async (jsonContent, schemaType = 'menu') => {
  const response = await api.post('/api/converter/validate-json', {
    json: jsonContent,
    schema: schemaType
  })
  return response.data
}

// Récupérer les schémas disponibles
export const getSchemas = async () => {
  const response = await api.get('/api/converter/schemas')
  return response.data
}

// Formater XML
export const formatXml = async (xmlContent) => {
  const response = await api.post('/api/converter/format-xml', {
    xml: xmlContent
  })
  return response.data
}

// Formater JSON
export const formatJson = async (jsonContent) => {
  const response = await api.post('/api/converter/format-json', {
    json: jsonContent
  })
  return response.data
}

export default {
  xmlToJson,
  jsonToXml,
  validateXml,
  validateJson,
  getSchemas,
  formatXml,
  formatJson,
}
