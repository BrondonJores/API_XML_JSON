package com.canteen.menu.utils;

import jakarta.servlet.http.HttpServletRequest;

/**
 * Classe utilitaire pour gerer la negociation de contenu (XML/JSON)
 */
public class ContentNegotiation {
    
    public static final String CONTENT_TYPE_JSON = "application/json";
    public static final String CONTENT_TYPE_XML = "application/xml";
    public static final String CONTENT_TYPE_TEXT_XML = "text/xml";
    
    /**
     * Determiner le type de contenu prefere base sur le header Accept
     * @param request La requete HTTP
     * @return Le type de contenu (JSON par defaut)
     */
    public static String getPreferredContentType(HttpServletRequest request) {
        String acceptHeader = request.getHeader("Accept");
        
        if (acceptHeader == null || acceptHeader.isEmpty()) {
            return CONTENT_TYPE_JSON;
        }
        
        // Verifier si XML est demande
        if (acceptHeader.contains("application/xml") || acceptHeader.contains("text/xml")) {
            return CONTENT_TYPE_XML;
        }
        
        // Par defaut, retourner JSON
        return CONTENT_TYPE_JSON;
    }
    
    /**
     * Verifier si le client accepte le format XML
     * @param request La requete HTTP
     * @return true si XML est accepte
     */
    public static boolean acceptsXml(HttpServletRequest request) {
        String acceptHeader = request.getHeader("Accept");
        return acceptHeader != null && 
               (acceptHeader.contains("application/xml") || acceptHeader.contains("text/xml"));
    }
    
    /**
     * Verifier si le client accepte le format JSON
     * @param request La requete HTTP
     * @return true si JSON est accepte
     */
    public static boolean acceptsJson(HttpServletRequest request) {
        String acceptHeader = request.getHeader("Accept");
        return acceptHeader == null || acceptHeader.isEmpty() || 
               acceptHeader.contains("application/json");
    }
    
    /**
     * Obtenir le type de contenu depuis le header Content-Type
     * @param request La requete HTTP
     * @return Le type de contenu
     */
    public static String getContentType(HttpServletRequest request) {
        String contentType = request.getContentType();
        
        if (contentType == null) {
            return CONTENT_TYPE_JSON;
        }
        
        if (contentType.contains("application/xml") || contentType.contains("text/xml")) {
            return CONTENT_TYPE_XML;
        }
        
        return CONTENT_TYPE_JSON;
    }
}
