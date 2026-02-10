package com.canteen.menu.servlets;

import com.canteen.menu.dao.MealDAO;
import com.canteen.menu.models.Meal;
import com.canteen.menu.services.XmlService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.Marshaller;
import java.io.IOException;
import java.io.StringWriter;
import java.sql.SQLException;
import java.util.List;

/**
 * Servlet pour l'export XML du menu
 */
public class XmlExportServlet extends HttpServlet {
    private MealDAO mealDAO;

    @Override
    public void init() throws ServletException {
        mealDAO = new MealDAO();
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            List<Meal> meals = mealDAO.findAll();

            // Creation du wrapper XML pour la liste
            String xml = generateMenuXml(meals);

            // Configuration de la reponse
            response.setContentType("application/xml");
            response.setCharacterEncoding("UTF-8");
            response.setHeader("Content-Disposition", "attachment; filename=menu.xml");

            // Envoi du XML
            response.getWriter().print(xml);

        } catch (SQLException e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur base de donnees: " + e.getMessage());
        } catch (Exception e) {
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                             "Erreur d'export XML: " + e.getMessage());
        }
    }

    /**
     * Genere le XML complet du menu avec tous les plats
     */
    private String generateMenuXml(List<Meal> meals) throws Exception {
        StringBuilder xml = new StringBuilder();
        xml.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n");
        xml.append("<menu>\n");
        xml.append("  <meals>\n");

        for (Meal meal : meals) {
            // Serialisation de chaque plat
            String mealXml = XmlService.toXml(meal, Meal.class);
            
            // Suppression de la declaration XML de chaque plat
            mealXml = mealXml.replaceFirst("<\\?xml[^>]*\\?>\\s*", "");
            
            // Indentation
            String[] lines = mealXml.split("\n");
            for (String line : lines) {
                if (!line.trim().isEmpty()) {
                    xml.append("    ").append(line).append("\n");
                }
            }
        }

        xml.append("  </meals>\n");
        xml.append("</menu>");

        return xml.toString();
    }
}
