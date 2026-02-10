package com.canteen.menu.servlets;

import com.canteen.menu.dao.MealDAO;
import com.canteen.menu.models.Meal;
import com.canteen.menu.services.JsonService;
import com.canteen.menu.services.XmlService;
import com.canteen.menu.servlets.MealServlet.MealsWrapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.util.List;

/**
 * Servlet pour l'exportation des repas en XML ou JSON
 * Permet le telechargement de tous les repas dans le format souhaite
 */
@WebServlet("/api/meals/export/*")
public class XmlExportServlet extends HttpServlet {
    
    private MealDAO mealDAO;
    private XmlService xmlService;
    private JsonService jsonService;
    
    @Override
    public void init() throws ServletException {
        this.mealDAO = new MealDAO();
        this.xmlService = new XmlService();
        this.jsonService = new JsonService();
    }
    
    /**
     * Gestion des requetes GET pour l'exportation
     * GET /api/meals/export/xml - exporte tous les repas en XML
     * GET /api/meals/export/json - exporte tous les repas en JSON
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                     "Format d'exportation requis: /xml ou /json");
            return;
        }
        
        try {
            List<Meal> meals = mealDAO.findAll();
            
            if (pathInfo.equals("/xml")) {
                exportAsXml(response, meals);
            } else if (pathInfo.equals("/json")) {
                exportAsJson(response, meals);
            } else {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                         "Format invalide. Utilisez /xml ou /json");
            }
            
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                     "Erreur lors de l'exportation: " + e.getMessage());
        }
    }
    
    /**
     * Exporte les repas au format XML avec telechargement automatique
     */
    private void exportAsXml(HttpServletResponse response, List<Meal> meals) 
            throws IOException, JAXBException {
        
        MealsWrapper wrapper = new MealsWrapper(meals);
        String xmlContent = xmlService.marshal(wrapper, MealsWrapper.class);
        
        response.setContentType("application/xml; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"meals.xml\"");
        response.setStatus(HttpServletResponse.SC_OK);
        
        response.getWriter().write(xmlContent);
    }
    
    /**
     * Exporte les repas au format JSON avec telechargement automatique
     */
    private void exportAsJson(HttpServletResponse response, List<Meal> meals) 
            throws IOException {
        
        String jsonContent = jsonService.toJson(meals);
        
        response.setContentType("application/json; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"meals.json\"");
        response.setStatus(HttpServletResponse.SC_OK);
        
        response.getWriter().write(jsonContent);
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
}
