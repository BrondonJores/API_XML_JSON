package com.canteen.menu.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.canteen.menu.models.Meal;
import com.canteen.menu.dao.MealDAO;
import com.canteen.menu.services.XmlService;
import com.canteen.menu.services.JsonService;
import com.canteen.menu.utils.ContentNegotiation;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

/**
 * Servlet pour la gestion des plats
 * Supporte XML et JSON selon le header Accept
 * Endpoints: GET /api/meals, GET /api/meals/{id}, POST /api/meals, 
 *           PUT /api/meals/{id}, DELETE /api/meals/{id}
 */
@WebServlet("/api/meals/*")
public class MealServlet extends HttpServlet {
    
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
     * GET - Recuperer tous les plats ou un plat specifique
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                // Recuperer tous les plats
                getAllMeals(request, response);
            } else {
                // Recuperer un plat specifique par ID
                String[] splits = pathInfo.split("/");
                if (splits.length == 2) {
                    int mealId = Integer.parseInt(splits[1]);
                    getMealById(request, response, mealId);
                } else {
                    sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                            "Format d'URL invalide");
                }
            }
        } catch (NumberFormatException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "ID de plat invalide");
        } catch (SQLException e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur de base de donnees: " + e.getMessage());
        }
    }
    
    /**
     * POST - Creer un nouveau plat
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            String contentType = ContentNegotiation.getContentType(request);
            Meal meal;
            
            // Parser le contenu selon le type
            if (contentType.equals(ContentNegotiation.CONTENT_TYPE_XML)) {
                meal = xmlService.unmarshalMeal(request.getReader());
            } else {
                meal = jsonService.parseMeal(request.getReader());
            }
            
            // Creer le plat dans la base de donnees
            Meal createdMeal = mealDAO.createMeal(meal);
            
            // Retourner le plat cree
            response.setStatus(HttpServletResponse.SC_CREATED);
            sendResponse(request, response, createdMeal);
            
        } catch (SQLException e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur lors de la creation du plat: " + e.getMessage());
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "Donnees invalides: " + e.getMessage());
        }
    }
    
    /**
     * PUT - Mettre a jour un plat existant
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "ID de plat requis");
            return;
        }
        
        try {
            String[] splits = pathInfo.split("/");
            if (splits.length != 2) {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                        "Format d'URL invalide");
                return;
            }
            
            int mealId = Integer.parseInt(splits[1]);
            String contentType = ContentNegotiation.getContentType(request);
            Meal meal;
            
            // Parser le contenu selon le type
            if (contentType.equals(ContentNegotiation.CONTENT_TYPE_XML)) {
                meal = xmlService.unmarshalMeal(request.getReader());
            } else {
                meal = jsonService.parseMeal(request.getReader());
            }
            
            meal.setId(mealId);
            
            // Mettre a jour le plat
            Meal updatedMeal = mealDAO.updateMeal(meal);
            
            if (updatedMeal != null) {
                sendResponse(request, response, updatedMeal);
            } else {
                sendError(response, HttpServletResponse.SC_NOT_FOUND, 
                        "Plat non trouve");
            }
            
        } catch (NumberFormatException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "ID de plat invalide");
        } catch (SQLException e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur lors de la mise a jour du plat: " + e.getMessage());
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "Donnees invalides: " + e.getMessage());
        }
    }
    
    /**
     * DELETE - Supprimer un plat
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "ID de plat requis");
            return;
        }
        
        try {
            String[] splits = pathInfo.split("/");
            if (splits.length != 2) {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                        "Format d'URL invalide");
                return;
            }
            
            int mealId = Integer.parseInt(splits[1]);
            boolean deleted = mealDAO.deleteMeal(mealId);
            
            if (deleted) {
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            } else {
                sendError(response, HttpServletResponse.SC_NOT_FOUND, 
                        "Plat non trouve");
            }
            
        } catch (NumberFormatException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "ID de plat invalide");
        } catch (SQLException e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur lors de la suppression du plat: " + e.getMessage());
        }
    }
    
    /**
     * Recuperer tous les plats
     */
    private void getAllMeals(HttpServletRequest request, HttpServletResponse response) 
            throws SQLException, IOException {
        List<Meal> meals = mealDAO.getAllMeals();
        sendResponse(request, response, meals);
    }
    
    /**
     * Recuperer un plat par ID
     */
    private void getMealById(HttpServletRequest request, HttpServletResponse response, int id) 
            throws SQLException, IOException {
        Meal meal = mealDAO.getMealById(id);
        
        if (meal != null) {
            sendResponse(request, response, meal);
        } else {
            sendError(response, HttpServletResponse.SC_NOT_FOUND, 
                    "Plat non trouve");
        }
    }
    
    /**
     * Envoyer une reponse (XML ou JSON)
     */
    private void sendResponse(HttpServletRequest request, HttpServletResponse response, Object data) 
            throws IOException {
        String contentType = ContentNegotiation.getPreferredContentType(request);
        response.setContentType(contentType + ";charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        PrintWriter out = response.getWriter();
        
        try {
            if (contentType.equals(ContentNegotiation.CONTENT_TYPE_XML)) {
                if (data instanceof List) {
                    out.print(xmlService.marshalMealList((List<Meal>) data));
                } else {
                    out.print(xmlService.marshalMeal((Meal) data));
                }
            } else {
                out.print(jsonService.toJson(data));
            }
        } catch (Exception e) {
            throw new IOException("Erreur de serialisation: " + e.getMessage(), e);
        }
        
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
