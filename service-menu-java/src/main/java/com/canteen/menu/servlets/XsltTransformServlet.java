package com.canteen.menu.servlets;

import com.canteen.menu.services.XsltService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

/**
 * Servlet pour la transformation XSLT
 * Transforme le XML du menu en HTML
 */
public class XsltTransformServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        try {
            // Lecture du corps de la requete (contenu XML)
            StringBuilder buffer = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                buffer.append(line);
            }
            String xmlContent = buffer.toString();

            if (xmlContent.isEmpty()) {
                response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Contenu XML requis");
                return;
            }

            // Recuperation de la feuille XSLT depuis les ressources
            InputStream xsltStream = getServletContext().getResourceAsStream("/WEB-INF/xslt/menu-to-html.xslt");
            
            if (xsltStream == null) {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                                 "Feuille XSLT non trouvee");
                return;
            }

            // Transformation
            String htmlResult = XsltService.transformWithStream(xmlContent, xsltStream);

            // Reponse
            response.setContentType("text/html");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().print(htmlResult);

        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur de transformation XSLT: " + e.getMessage());
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        // Recuperation du parametre XML depuis l'URL
        String xmlParam = request.getParameter("xml");
        
        if (xmlParam == null || xmlParam.isEmpty()) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, 
                             "Parametre 'xml' requis ou utilisez POST avec le XML dans le corps");
            return;
        }

        try {
            // Recuperation de la feuille XSLT depuis les ressources
            InputStream xsltStream = getServletContext().getResourceAsStream("/WEB-INF/xslt/menu-to-html.xslt");
            
            if (xsltStream == null) {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                                 "Feuille XSLT non trouvee");
                return;
            }

            // Transformation
            String htmlResult = XsltService.transformWithStream(xmlParam, xsltStream);

            // Reponse
            response.setContentType("text/html");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().print(htmlResult);

        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur de transformation XSLT: " + e.getMessage());
        }
    }
}
