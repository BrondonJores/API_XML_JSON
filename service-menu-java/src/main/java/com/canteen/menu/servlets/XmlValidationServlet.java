package com.canteen.menu.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.canteen.menu.services.XmlService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Servlet pour la validation de XML contre un schema XSD
 * Endpoint: POST /api/validate/xml
 * Body: XML a valider
 * Query param: schema (meal, menu, order)
 */
@WebServlet("/api/validate/xml")
public class XmlValidationServlet extends HttpServlet {
    
    private XmlService xmlService;
    
    @Override
    public void init() throws ServletException {
        super.init();
        this.xmlService = new XmlService();
    }
    
    /**
     * POST - Valider un XML contre un schema XSD
     * Parametres:
     * - schema: Type de schema (meal, menu, order)
     * - Body: Le contenu XML a valider
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String schemaType = request.getParameter("schema");
        
        if (schemaType == null || schemaType.trim().isEmpty()) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "Parametre 'schema' requis (meal, menu, ou order)");
            return;
        }
        
        String xsdPath = getXsdPath(schemaType);
        if (xsdPath == null) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "Type de schema invalide. Valeurs acceptees: meal, menu, order");
            return;
        }
        
        try {
            String xmlContent = readRequestBody(request);
            
            if (xmlContent == null || xmlContent.trim().isEmpty()) {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                        "Corps XML vide");
                return;
            }
            
            xmlService.validateXmlAgainstXsd(xmlContent, xsdPath);
            
            sendSuccess(response, "XML valide selon le schema " + schemaType);
            
        } catch (org.xml.sax.SAXException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "Validation XML echouee: " + e.getMessage());
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur de validation: " + e.getMessage());
        }
    }
    
    /**
     * Obtenir le chemin du schema XSD en fonction du type
     */
    private String getXsdPath(String schemaType) {
        switch (schemaType.toLowerCase()) {
            case "meal":
                return "xsd/meal.xsd";
            case "menu":
                return "xsd/menu.xsd";
            case "order":
                return "xsd/order.xsd";
            default:
                return null;
        }
    }
    
    /**
     * Lire le corps de la requete
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
    
    /**
     * Envoyer une reponse de succes
     */
    private void sendSuccess(HttpServletResponse response, String message) 
            throws IOException {
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.print("{\"valide\": true, \"message\": \"" + message + "\"}");
        out.flush();
    }
    
    /**
     * Envoyer une erreur
     */
    private void sendError(HttpServletResponse response, int status, String message) 
            throws IOException {
        response.setStatus(status);
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.print("{\"valide\": false, \"erreur\": \"" + message.replace("\"", "\\\"") + "\"}");
        out.flush();
    }
}
