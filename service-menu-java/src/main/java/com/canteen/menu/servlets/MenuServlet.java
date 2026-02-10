package com.canteen.menu.servlets;

import com.canteen.menu.dao.MealDAO;
import com.canteen.menu.models.Meal;
import com.canteen.menu.services.JsonService;
import com.canteen.menu.services.XmlService;
import com.canteen.menu.utils.ContentNegotiation;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.List;

/**
 * Servlet pour la gestion du menu complet
 * Endpoints: /menu, /menu/available, /menu/category/{id}
 */
public class MenuServlet extends HttpServlet {
    private MealDAO mealDAO;

    @Override
    public void init() throws ServletException {
        mealDAO = new MealDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String pathInfo = request.getPathInfo();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                // Menu complet
                getFullMenu(request, response);
            } else if (pathInfo.equals("/available")) {
                // Plats disponibles uniquement
                getAvailableMeals(request, response);
            } else if (pathInfo.startsWith("/category/")) {
                // Plats par categorie
                String[] splits = pathInfo.split("/");
                if (splits.length == 3) {
                    int categoryId = Integer.parseInt(splits[2]);
                    getMealsByCategory(categoryId, request, response);
                } else {
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Format d'URL invalide");
                }
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Endpoint non trouve");
            }
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID invalide");
        } catch (SQLException e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur base de donnees: " + e.getMessage());
        }
    }

    private void getFullMenu(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        List<Meal> meals = mealDAO.findAll();
        sendResponse(meals, request, response);
    }

    private void getAvailableMeals(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        List<Meal> meals = mealDAO.findAvailable();
        sendResponse(meals, request, response);
    }

    private void getMealsByCategory(int categoryId, HttpServletRequest request, 
                                    HttpServletResponse response)
            throws SQLException, IOException {
        List<Meal> meals = mealDAO.findByCategory(categoryId);
        sendResponse(meals, request, response);
    }

    private void sendResponse(Object data, HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        String format = ContentNegotiation.getPreferredContentType(request);
        PrintWriter out = response.getWriter();

        try {
            if ("json".equals(format)) {
                response.setContentType("application/json");
                response.setCharacterEncoding("UTF-8");
                out.print(JsonService.toJson(data));
            } else {
                response.setContentType("application/xml");
                response.setCharacterEncoding("UTF-8");
                out.print(XmlService.toXml(data, data.getClass()));
            }
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur de serialisation: " + e.getMessage());
        }
    }
}
