package com.canteen.menu.servlets;

import com.canteen.menu.services.XmlService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;

/**
 * Servlet pour la validation XML contre un schema XSD
 */
public class XmlValidationServlet extends HttpServlet {

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

            // Recuperation du schema XSD depuis les ressources
            InputStream xsdStream = getServletContext().getResourceAsStream("/WEB-INF/schemas/menu.xsd");
            
            if (xsdStream == null) {
                response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                                 "Schema XSD non trouve");
                return;
            }

            // Validation
            boolean isValid = XmlService.validateXmlWithStream(xmlContent, xsdStream);

            // Reponse
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            
            if (isValid) {
                response.getWriter().print("{\"valid\": true, \"message\": \"XML valide\"}");
            } else {
                response.getWriter().print("{\"valid\": false, \"message\": \"XML invalide\"}");
            }

        } catch (org.xml.sax.SAXException e) {
            // Erreur de validation
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.setStatus(HttpServletResponse.SC_OK);
            response.getWriter().print(String.format(
                "{\"valid\": false, \"message\": \"Erreur de validation: %s\"}", 
                e.getMessage().replace("\"", "\\\"")
            ));
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur de validation: " + e.getMessage());
        }
    }
}
