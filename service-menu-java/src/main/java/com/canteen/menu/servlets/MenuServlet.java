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
import com.canteen.menu.utils.ContentNegotiation;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

/**
 * Servlet pour recuperer le menu du jour
 * Supporte XML et JSON selon le header Accept
 * Endpoint: GET /api/menu/today
 */
@WebServlet("/api/menu/today")
public class MenuServlet extends HttpServlet {
    
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
     * GET - Recuperer le menu du jour
     * Retourne tous les plats disponibles aujourd'hui
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            LocalDate today = LocalDate.now();
            List<Meal> meals = mealDAO.getMealsByDate(today);
            
            String contentType = ContentNegotiation.getPreferredContentType(request);
            response.setContentType(contentType + ";charset=UTF-8");
            response.setCharacterEncoding("UTF-8");
            
            PrintWriter out = response.getWriter();
            
            if (contentType.equals(ContentNegotiation.CONTENT_TYPE_XML)) {
                MealList mealList = new MealList();
                mealList.setMeals(meals);
                out.print(xmlService.marshal(mealList, MealList.class));
            } else {
                out.print(jsonService.toJson(meals));
            }
            
            out.flush();
            
        } catch (SQLException e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur de base de donnees: " + e.getMessage());
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur de serialisation: " + e.getMessage());
        }
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
