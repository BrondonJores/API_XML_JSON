package com.canteen.menu.utils;

import javax.servlet.http.HttpServletRequest;

/**
 * Classe utilitaire pour la negociation de contenu (XML/JSON)
 */
public class ContentNegotiation {
    
    /**
     * Determine si le client accepte XML
     * @param request Requete HTTP
     * @return true si XML est accepte
     */
    public static boolean acceptsXml(HttpServletRequest request) {
        String accept = request.getHeader("Accept");
        if (accept != null) {
            return accept.contains("application/xml") || accept.contains("text/xml");
        }
        return false;
    }

    /**
     * Determine si le client accepte JSON
     * @param request Requete HTTP
     * @return true si JSON est accepte
     */
    public static boolean acceptsJson(HttpServletRequest request) {
        String accept = request.getHeader("Accept");
        if (accept != null) {
            return accept.contains("application/json");
        }
        return false;
    }

    /**
     * Determine le type de contenu prefere (XML par defaut)
     * @param request Requete HTTP
     * @return "xml" ou "json"
     */
    public static String getPreferredContentType(HttpServletRequest request) {
        String accept = request.getHeader("Accept");
        
        if (accept == null) {
            return "xml";
        }
        
        // Verification de l'ordre de preference
        int xmlIndex = accept.indexOf("application/xml");
        if (xmlIndex == -1) xmlIndex = accept.indexOf("text/xml");
        int jsonIndex = accept.indexOf("application/json");
        
        if (jsonIndex >= 0 && (xmlIndex == -1 || jsonIndex < xmlIndex)) {
            return "json";
        }
        
        return "xml";
    }

    /**
     * Determine le type de contenu de la requete
     * @param request Requete HTTP
     * @return "xml", "json" ou null
     */
    public static String getRequestContentType(HttpServletRequest request) {
        String contentType = request.getContentType();
        if (contentType != null) {
            if (contentType.contains("application/xml") || contentType.contains("text/xml")) {
                return "xml";
            } else if (contentType.contains("application/json")) {
                return "json";
            }
        }
        return null;
    }
}
