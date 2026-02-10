package com.canteen.menu.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.canteen.menu.services.XsltService;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

/**
 * Servlet pour les transformations XSLT
 * Endpoints: POST /api/transform/menu-to-html, POST /api/transform/meal-to-pdf
 * Body: XML a transformer
 */
@WebServlet(urlPatterns = {"/api/transform/menu-to-html", "/api/transform/meal-to-pdf"})
public class XsltTransformServlet extends HttpServlet {
    
    private XsltService xsltService;
    
    @Override
    public void init() throws ServletException {
        super.init();
        this.xsltService = new XsltService();
    }
    
    /**
     * POST - Transformer un XML avec XSLT
     * Body: Le contenu XML a transformer
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String servletPath = request.getServletPath();
        
        try {
            String xmlContent = readRequestBody(request);
            
            if (xmlContent == null || xmlContent.trim().isEmpty()) {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                        "Corps XML vide");
                return;
            }
            
            if (servletPath.endsWith("/menu-to-html")) {
                transformToHtml(response, xmlContent);
            } else if (servletPath.endsWith("/meal-to-pdf")) {
                transformToPdf(response, xmlContent);
            } else {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                        "Endpoint de transformation invalide");
            }
            
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur de transformation: " + e.getMessage());
        }
    }
    
    /**
     * Transformer le menu en HTML
     */
    private void transformToHtml(HttpServletResponse response, String xmlContent) 
            throws Exception {
        String htmlResult = xsltService.transform(xmlContent, "xslt/menu-to-html.xslt");
        
        response.setContentType("text/html;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        PrintWriter out = response.getWriter();
        out.print(htmlResult);
        out.flush();
    }
    
    /**
     * Transformer le plat en format pour PDF
     * Note: Cette transformation genere du HTML/XSL-FO qui peut etre converti en PDF
     */
    private void transformToPdf(HttpServletResponse response, String xmlContent) 
            throws Exception {
        String result = xsltService.transform(xmlContent, "xslt/order-to-invoice.xslt");
        
        response.setContentType("application/xml;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"invoice.xml\"");
        
        PrintWriter out = response.getWriter();
        out.print(result);
        out.flush();
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
     * Envoyer une erreur
     */
    private void sendError(HttpServletResponse response, int status, String message) 
            throws IOException {
        response.setStatus(status);
        response.setContentType("application/json;charset=UTF-8");
        PrintWriter out = response.getWriter();
        out.print("{\"erreur\": \"" + message.replace("\"", "\\\"") + "\"}");
        out.flush();
    }
}
