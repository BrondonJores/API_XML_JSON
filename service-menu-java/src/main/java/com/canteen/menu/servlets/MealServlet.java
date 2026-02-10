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
 * Servlet pour la gestion des plats individuels
 */
public class MealServlet extends HttpServlet {
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
                // Liste de tous les plats
                getAllMeals(request, response);
            } else {
                // Recuperation d'un plat specifique
                String[] splits = pathInfo.split("/");
                if (splits.length == 2) {
                    int mealId = Integer.parseInt(splits[1]);
                    getMealById(mealId, request, response);
                } else {
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Format d'URL invalide");
                }
            }
        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID invalide");
        } catch (SQLException e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur base de donnees: " + e.getMessage());
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            String contentType = ContentNegotiation.getRequestContentType(request);
            Meal meal;

            // Lecture du corps de la requete
            StringBuilder buffer = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                buffer.append(line);
            }
            String body = buffer.toString();

            // Deserialisation selon le type de contenu
            if ("json".equals(contentType)) {
                meal = JsonService.fromJson(body, Meal.class);
            } else {
                meal = XmlService.fromXml(body, Meal.class);
            }

            // Creation du plat
            int id = mealDAO.create(meal);
            meal.setId(id);

            // Reponse
            response.setStatus(HttpServletResponse.SC_CREATED);
            sendResponse(meal, request, response);

        } catch (SQLException e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur base de donnees: " + e.getMessage());
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST,
                             "Erreur de traitement: " + e.getMessage());
        }
    }

    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID requis pour la mise a jour");
            return;
        }

        try {
            String[] splits = pathInfo.split("/");
            int mealId = Integer.parseInt(splits[1]);

            String contentType = ContentNegotiation.getRequestContentType(request);
            Meal meal;

            // Lecture du corps de la requete
            StringBuilder buffer = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                buffer.append(line);
            }
            String body = buffer.toString();

            // Deserialisation selon le type de contenu
            if ("json".equals(contentType)) {
                meal = JsonService.fromJson(body, Meal.class);
            } else {
                meal = XmlService.fromXml(body, Meal.class);
            }

            meal.setId(mealId);

            // Mise a jour
            boolean updated = mealDAO.update(meal);

            if (updated) {
                // Recharger le plat mis a jour avec tous ses details
                meal = mealDAO.findById(mealId);
                sendResponse(meal, request, response);
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Plat non trouve");
            }

        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID invalide");
        } catch (SQLException e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur base de donnees: " + e.getMessage());
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST,
                             "Erreur de traitement: " + e.getMessage());
        }
    }

    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String pathInfo = request.getPathInfo();

        if (pathInfo == null || pathInfo.equals("/")) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID requis pour la suppression");
            return;
        }

        try {
            String[] splits = pathInfo.split("/");
            int mealId = Integer.parseInt(splits[1]);

            boolean deleted = mealDAO.delete(mealId);

            if (deleted) {
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Plat non trouve");
            }

        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID invalide");
        } catch (SQLException e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur base de donnees: " + e.getMessage());
        }
    }

    private void getAllMeals(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        List<Meal> meals = mealDAO.findAll();
        sendResponse(meals, request, response);
    }

    private void getMealById(int id, HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        Meal meal = mealDAO.findById(id);

        if (meal != null) {
            sendResponse(meal, request, response);
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Plat non trouve");
        }
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
