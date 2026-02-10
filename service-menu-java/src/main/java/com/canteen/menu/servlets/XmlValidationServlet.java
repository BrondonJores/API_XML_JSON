package com.canteen.menu.servlets;

import com.canteen.menu.services.JsonService;
import com.canteen.menu.services.XmlService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * Servlet pour la validation de documents XML contre un schema XSD
 * Valide le XML recu contre le schema meal.xsd
 */
@WebServlet("/api/validate/xml")
public class XmlValidationServlet extends HttpServlet {
    
    private XmlService xmlService;
    private JsonService jsonService;
    
    private static final String XSD_PATH = "xsd/meal.xsd";
    
    @Override
    public void init() throws ServletException {
        this.xmlService = new XmlService();
        this.jsonService = new JsonService();
    }
    
    /**
     * Gestion des requetes POST pour la validation XML
     * POST /api/validate/xml - valide un document XML contre le schema XSD
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            String xmlContent = readRequestBody(request);
            
            if (xmlContent == null || xmlContent.trim().isEmpty()) {
                sendValidationResponse(response, false, "Le contenu XML est vide");
                return;
            }
            
            boolean isValid = xmlService.validate(xmlContent, XSD_PATH);
            
            if (isValid) {
                sendValidationResponse(response, true, "Le document XML est valide");
            } else {
                sendValidationResponse(response, false, 
                                      "Le document XML n'est pas valide selon le schema XSD");
            }
            
        } catch (Exception e) {
            sendValidationResponse(response, false, 
                                  "Erreur lors de la validation: " + e.getMessage());
        }
    }
    
    /**
     * Envoie une reponse JSON avec le resultat de la validation
     */
    private void sendValidationResponse(HttpServletResponse response, boolean valid, String message) 
            throws IOException {
        
        Map<String, Object> result = new HashMap<>();
        result.put("valid", valid);
        result.put("message", message);
        
        String jsonResponse = jsonService.toJson(result);
        
        response.setContentType("application/json; charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(jsonResponse);
    }
    
    /**
     * Lit le corps de la requete HTTP
     */
    private String readRequestBody(HttpServletRequest request) throws IOException {
        StringBuilder buffer = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        
        while ((line = reader.readLine()) != null) {
            buffer.append(line).append("\n");
        }
        
        return buffer.toString();
    }
}
