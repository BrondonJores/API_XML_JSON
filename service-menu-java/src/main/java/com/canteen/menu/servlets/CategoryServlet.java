package com.canteen.menu.servlets;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.canteen.menu.models.Category;
import com.canteen.menu.models.CategoryList;
import com.canteen.menu.models.Meal;
import com.canteen.menu.models.MealList;
import com.canteen.menu.dao.CategoryDAO;
import com.canteen.menu.dao.MealDAO;
import com.canteen.menu.services.XmlService;
import com.canteen.menu.services.JsonService;
import com.canteen.menu.utils.ContentNegotiation;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

/**
 * Servlet pour la gestion des categories
 * Supporte XML et JSON selon le header Accept
 * Endpoints: GET /api/categories, GET /api/meals/category/{id}
 */
@WebServlet(urlPatterns = {"/api/categories", "/api/categories/*", "/api/meals/category/*"})
public class CategoryServlet extends HttpServlet {
    
    private CategoryDAO categoryDAO;
    private MealDAO mealDAO;
    private XmlService xmlService;
    private JsonService jsonService;
    
    @Override
    public void init() throws ServletException {
        super.init();
        this.categoryDAO = new CategoryDAO();
        this.mealDAO = new MealDAO();
        this.xmlService = new XmlService();
        this.jsonService = new JsonService();
    }
    
    /**
     * GET - Recuperer toutes les categories ou les plats d'une categorie
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        String servletPath = request.getServletPath();
        
        try {
            if (servletPath.equals("/api/meals/category")) {
                handleMealsByCategory(request, response, pathInfo);
            } else if (pathInfo == null || pathInfo.equals("/")) {
                getAllCategories(request, response);
            } else {
                String[] splits = pathInfo.split("/");
                if (splits.length == 2) {
                    int categoryId = Integer.parseInt(splits[1]);
                    getCategoryById(request, response, categoryId);
                } else {
                    sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                            "Format d'URL invalide");
                }
            }
        } catch (NumberFormatException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "ID de categorie invalide");
        } catch (SQLException e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur de base de donnees: " + e.getMessage());
        }
    }
    
    /**
     * Recuperer toutes les categories
     */
    private void getAllCategories(HttpServletRequest request, HttpServletResponse response) 
            throws SQLException, IOException {
        List<Category> categories = categoryDAO.getAllCategories();
        
        String contentType = ContentNegotiation.getPreferredContentType(request);
        response.setContentType(contentType + ";charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        PrintWriter out = response.getWriter();
        
        try {
            if (contentType.equals(ContentNegotiation.CONTENT_TYPE_XML)) {
                CategoryList categoryList = new CategoryList();
                categoryList.setCategories(categories);
                out.print(xmlService.marshal(categoryList, CategoryList.class));
            } else {
                out.print(jsonService.toJson(categories));
            }
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur de serialisation: " + e.getMessage());
        }
        
        out.flush();
    }
    
    /**
     * Recuperer une categorie par ID
     */
    private void getCategoryById(HttpServletRequest request, HttpServletResponse response, int id) 
            throws SQLException, IOException {
        Category category = categoryDAO.getCategoryById(id);
        
        if (category == null) {
            sendError(response, HttpServletResponse.SC_NOT_FOUND, 
                    "Categorie non trouvee");
            return;
        }
        
        String contentType = ContentNegotiation.getPreferredContentType(request);
        response.setContentType(contentType + ";charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        
        PrintWriter out = response.getWriter();
        
        try {
            if (contentType.equals(ContentNegotiation.CONTENT_TYPE_XML)) {
                out.print(xmlService.marshal(category, Category.class));
            } else {
                out.print(jsonService.toJson(category));
            }
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                    "Erreur de serialisation: " + e.getMessage());
        }
        
        out.flush();
    }
    
    /**
     * Recuperer les plats d'une categorie
     */
    private void handleMealsByCategory(HttpServletRequest request, HttpServletResponse response, String pathInfo) 
            throws SQLException, IOException {
        
        if (pathInfo == null || pathInfo.equals("/")) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "ID de categorie requis");
            return;
        }
        
        String[] splits = pathInfo.split("/");
        if (splits.length != 2) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "Format d'URL invalide");
            return;
        }
        
        try {
            int categoryId = Integer.parseInt(splits[1]);
            List<Meal> meals = mealDAO.getMealsByCategory(categoryId);
            
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
            
        } catch (NumberFormatException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                    "ID de categorie invalide");
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
