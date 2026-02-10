package com.canteen.menu.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.canteen.menu.models.Meal;
import com.canteen.menu.models.MealList;
import com.canteen.menu.dao.MealDAO;
import com.canteen.menu.services.XmlService;
import com.canteen.menu.services.JsonService;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

/**
 * Servlet pour l'exportation des plats en XML ou JSON
 * Endpoints: GET /api/meals/export/xml, GET /api/meals/export/json
 */
@WebServlet(urlPatterns = {"/api/meals/export/xml", "/api/meals/export/json"})
public class XmlExportServlet extends HttpServlet {
    
    private MealDAO mealDAO;
    private XmlService xmlService;
    private JsonService jsonService;
    
    @Override
    public void init() throws ServletException {
        super.init();
        this.mealDAO = new MealDAO();
        this.xmlService = new XmlService();
        this.jsonService = new JsonService();
    }
    
    /**
     * GET - Exporter tous les plats en XML ou JSON
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String servletPath = request.getServletPath();
        
        try {
            List<Meal> meals = mealDAO.getAllMeals();
            MealList mealList = new MealList();
            mealList.setMeals(meals);
            
            if (servletPath.endsWith("/xml")) {
                exportAsXml(response, mealList);
            } else if (servletPath.endsWith("/json")) {
                exportAsJson(response, meals);
            } else {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                        "Format d'export invalide");
            }
            
        } catch (SQLException e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur de base de donnees: " + e.getMessage());
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur d'exportation: " + e.getMessage());
        }
    }
    
    /**
     * Exporter en XML avec header de telechargement
     */
    private void exportAsXml(HttpServletResponse response, MealList mealList) 
            throws Exception {
        response.setContentType("application/xml;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"meals-export.xml\"");
        
        PrintWriter out = response.getWriter();
        String xml = xmlService.marshal(mealList, MealList.class);
        out.print(xml);
        out.flush();
    }
    
    /**
     * Exporter en JSON avec header de telechargement
     */
    private void exportAsJson(HttpServletResponse response, List<Meal> meals) 
            throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"meals-export.json\"");
        
        PrintWriter out = response.getWriter();
        String json = jsonService.toJson(meals);
        out.print(json);
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
        out.print("{\"erreur\": \"" + message + "\"}");
        out.flush();
    }
}
