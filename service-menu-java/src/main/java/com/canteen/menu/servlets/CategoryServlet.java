package com.canteen.menu.servlets;

import com.canteen.menu.dao.CategoryDAO;
import com.canteen.menu.models.Category;
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
 * Servlet pour la gestion des categories
 */
public class CategoryServlet extends HttpServlet {
    private CategoryDAO categoryDAO;

    @Override
    public void init() throws ServletException {
        categoryDAO = new CategoryDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String pathInfo = request.getPathInfo();

        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                // Liste de toutes les categories
                getAllCategories(request, response);
            } else {
                // Recuperation d'une categorie specifique
                String[] splits = pathInfo.split("/");
                if (splits.length == 2) {
                    int categoryId = Integer.parseInt(splits[1]);
                    getCategoryById(categoryId, request, response);
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
            Category category;

            // Lecture du corps de la requete
            StringBuilder buffer = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                buffer.append(line);
            }
            String body = buffer.toString();

            // Deserialisation selon le type de contenu
            if ("json".equals(contentType)) {
                category = JsonService.fromJson(body, Category.class);
            } else {
                category = XmlService.fromXml(body, Category.class);
            }

            // Creation de la categorie
            int id = categoryDAO.create(category);
            category.setId(id);

            // Reponse
            response.setStatus(HttpServletResponse.SC_CREATED);
            sendResponse(category, request, response);

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
            int categoryId = Integer.parseInt(splits[1]);

            String contentType = ContentNegotiation.getRequestContentType(request);
            Category category;

            // Lecture du corps de la requete
            StringBuilder buffer = new StringBuilder();
            String line;
            while ((line = request.getReader().readLine()) != null) {
                buffer.append(line);
            }
            String body = buffer.toString();

            // Deserialisation selon le type de contenu
            if ("json".equals(contentType)) {
                category = JsonService.fromJson(body, Category.class);
            } else {
                category = XmlService.fromXml(body, Category.class);
            }

            category.setId(categoryId);

            // Mise a jour
            boolean updated = categoryDAO.update(category);

            if (updated) {
                sendResponse(category, request, response);
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Categorie non trouvee");
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
            int categoryId = Integer.parseInt(splits[1]);

            boolean deleted = categoryDAO.delete(categoryId);

            if (deleted) {
                response.setStatus(HttpServletResponse.SC_NO_CONTENT);
            } else {
                response.sendError(HttpServletResponse.SC_NOT_FOUND, "Categorie non trouvee");
            }

        } catch (NumberFormatException e) {
            response.sendError(HttpServletResponse.SC_BAD_REQUEST, "ID invalide");
        } catch (SQLException e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur base de donnees: " + e.getMessage());
        }
    }

    private void getAllCategories(HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        List<Category> categories = categoryDAO.findAll();
        sendResponse(categories, request, response);
    }

    private void getCategoryById(int id, HttpServletRequest request, HttpServletResponse response)
            throws SQLException, IOException {
        Category category = categoryDAO.findById(id);

        if (category != null) {
            sendResponse(category, request, response);
        } else {
            response.sendError(HttpServletResponse.SC_NOT_FOUND, "Categorie non trouvee");
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
