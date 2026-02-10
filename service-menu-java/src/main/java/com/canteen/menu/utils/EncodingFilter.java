package com.canteen.menu.utils;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import java.io.IOException;

/**
 * Filtre d'encodage pour garantir l'utilisation de UTF-8
 * Configure l'encodage UTF-8 pour les requêtes et les réponses
 */
public class EncodingFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        // Initialisation du filtre
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        // Définir l'encodage UTF-8 pour la requête
        request.setCharacterEncoding("UTF-8");
        
        // Définir l'encodage UTF-8 pour la réponse
        response.setCharacterEncoding("UTF-8");
        
        // Continuer la chaine de filtres
        chain.doFilter(request, response);
    }

    @Override
    public void destroy() {
        // Nettoyage des ressources
    }
}
