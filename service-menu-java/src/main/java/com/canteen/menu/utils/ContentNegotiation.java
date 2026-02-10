package com.canteen.menu.utils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Classe utilitaire pour gérer la négociation de contenu entre XML et JSON.
 * Permet de déterminer le format de réponse souhaité par le client.
 */
public class ContentNegotiation {
    
    // Types MIME pour XML et JSON
    private static final String CONTENT_TYPE_XML = "application/xml";
    private static final String CONTENT_TYPE_JSON = "application/json";
    private static final String CHARSET_UTF8 = "charset=UTF-8";
    
    /**
     * Détermine si le client demande une réponse au format XML.
     * Vérifie l'en-tête Accept de la requête HTTP.
     * 
     * @param request la requête HTTP
     * @return true si XML est demandé, false sinon
     */
    public static boolean isXmlRequested(HttpServletRequest request) {
        String acceptHeader = request.getHeader("Accept");
        
        if (acceptHeader == null || acceptHeader.isEmpty()) {
            // Par défaut, retourner false si aucun en-tête Accept
            return false;
        }
        
        // Normalisation en minuscules pour comparaison
        acceptHeader = acceptHeader.toLowerCase();
        
        // Vérifier si XML est explicitement demandé
        if (acceptHeader.contains("application/xml") || acceptHeader.contains("text/xml")) {
            return true;
        }
        
        // Vérifier si */* est présent (accepte tout)
        if (acceptHeader.contains("*/*")) {
            return false; // Par défaut JSON si accepte tout
        }
        
        return false;
    }
    
    /**
     * Détermine si le client demande une réponse au format JSON.
     * Vérifie l'en-tête Accept de la requête HTTP.
     * 
     * @param request la requête HTTP
     * @return true si JSON est demandé, false sinon
     */
    public static boolean isJsonRequested(HttpServletRequest request) {
        String acceptHeader = request.getHeader("Accept");
        
        if (acceptHeader == null || acceptHeader.isEmpty()) {
            // Par défaut, retourner JSON si aucun en-tête Accept
            return true;
        }
        
        // Normalisation en minuscules pour comparaison
        acceptHeader = acceptHeader.toLowerCase();
        
        // Vérifier si JSON est explicitement demandé
        if (acceptHeader.contains("application/json")) {
            return true;
        }
        
        // Vérifier si */* est présent (accepte tout)
        if (acceptHeader.contains("*/*")) {
            return true; // Par défaut JSON si accepte tout
        }
        
        // Si XML est spécifiquement demandé, ne pas retourner JSON
        if (acceptHeader.contains("application/xml") || acceptHeader.contains("text/xml")) {
            return false;
        }
        
        return false;
    }
    
    /**
     * Configure la réponse HTTP pour renvoyer du XML.
     * Définit le Content-Type approprié avec l'encodage UTF-8.
     * 
     * @param response la réponse HTTP à configurer
     */
    public static void setXmlResponse(HttpServletResponse response) {
        response.setContentType(CONTENT_TYPE_XML + "; " + CHARSET_UTF8);
        response.setCharacterEncoding("UTF-8");
    }
    
    /**
     * Configure la réponse HTTP pour renvoyer du JSON.
     * Définit le Content-Type approprié avec l'encodage UTF-8.
     * 
     * @param response la réponse HTTP à configurer
     */
    public static void setJsonResponse(HttpServletResponse response) {
        response.setContentType(CONTENT_TYPE_JSON + "; " + CHARSET_UTF8);
        response.setCharacterEncoding("UTF-8");
    }
}
