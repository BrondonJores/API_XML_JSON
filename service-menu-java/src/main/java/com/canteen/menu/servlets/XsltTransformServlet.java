package com.canteen.menu.servlets;

import com.canteen.menu.services.XsltService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.transform.TransformerException;
import java.io.BufferedReader;
import java.io.IOException;

/**
 * Servlet pour la transformation XML via XSLT
 * Transforme des documents XML en utilisant des feuilles de style XSLT
 */
@WebServlet("/api/transform/*")
public class XsltTransformServlet extends HttpServlet {
    
    private XsltService xsltService;
    
    private static final String XSLT_MENU_TO_HTML = "xslt/menu-to-html.xslt";
    private static final String XSLT_MEAL_TO_PDF = "xslt/meal-to-pdf.xslt";
    
    @Override
    public void init() throws ServletException {
        this.xsltService = new XsltService();
    }
    
    /**
     * Gestion des requetes POST pour les transformations XSLT
     * POST /api/transform/menu-to-html - transforme un menu XML en HTML
     * POST /api/transform/meal-to-pdf - transforme un repas XML en format PDF
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                     "Type de transformation requis: /menu-to-html ou /meal-to-pdf");
            return;
        }
        
        try {
            String xmlContent = readRequestBody(request);
            
            if (xmlContent == null || xmlContent.trim().isEmpty()) {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                         "Le contenu XML est requis");
                return;
            }
            
            if (pathInfo.equals("/menu-to-html")) {
                transformMenuToHtml(response, xmlContent);
            } else if (pathInfo.equals("/meal-to-pdf")) {
                transformMealToPdf(response, xmlContent);
            } else {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                         "Type de transformation invalide. Utilisez /menu-to-html ou /meal-to-pdf");
            }
            
        } catch (TransformerException e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                     "Erreur de transformation XSLT: " + e.getMessage());
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                     "Erreur lors de la transformation: " + e.getMessage());
        }
    }
    
    /**
     * Transforme un menu XML en HTML en utilisant la feuille XSLT appropriee
     */
    private void transformMenuToHtml(HttpServletResponse response, String xmlContent) 
            throws TransformerException, IOException {
        
        String htmlOutput = xsltService.transform(xmlContent, XSLT_MENU_TO_HTML);
        
        response.setContentType("text/html; charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(htmlOutput);
    }
    
    /**
     * Transforme un repas XML en format PDF en utilisant la feuille XSLT appropriee
     */
    private void transformMealToPdf(HttpServletResponse response, String xmlContent) 
            throws TransformerException, IOException {
        
        String pdfOutput = xsltService.transform(xmlContent, XSLT_MEAL_TO_PDF);
        
        response.setContentType("application/pdf; charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        response.getWriter().write(pdfOutput);
    }
    
    /**
     * Envoie un message d'erreur au client
     */
    private void sendError(HttpServletResponse response, int status, String message) 
            throws IOException {
        
        response.setStatus(status);
        response.setContentType("text/plain; charset=UTF-8");
        response.getWriter().write(message);
    }
    
    /**
     * Lit le corps de la requete HTTP
     */
    private String readRequestBody(HttpServletRequest request) throws IOException {
        StringBuilder buffer = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        
        return buffer.toString();
    }
}
