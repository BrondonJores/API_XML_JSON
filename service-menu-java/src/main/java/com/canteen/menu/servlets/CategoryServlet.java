package com.canteen.menu.servlets;

import com.canteen.menu.dao.CategoryDAO;
import com.canteen.menu.models.Category;
import com.canteen.menu.services.JsonService;
import com.canteen.menu.services.XmlService;
import com.canteen.menu.utils.ContentNegotiation;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBException;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import java.io.IOException;
import java.util.List;

/**
 * Servlet pour la gestion des categories via l'API REST
 * Gere la recuperation de toutes les categories
 */
@WebServlet("/api/categories")
public class CategoryServlet extends HttpServlet {
    
    private CategoryDAO categoryDAO;
    private XmlService xmlService;
    private JsonService jsonService;
    
    /**
     * Classe wrapper pour la serialisation XML d'une liste de categories
     */
    @XmlRootElement(name = "categories")
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class CategoriesWrapper {
        @XmlElement(name = "category")
        private List<Category> categories;
        
        public CategoriesWrapper() {}
        
        public CategoriesWrapper(List<Category> categories) {
            this.categories = categories;
        }
        
        public List<Category> getCategories() {
            return categories;
        }
        
        public void setCategories(List<Category> categories) {
            this.categories = categories;
        }
    }
    
    @Override
    public void init() throws ServletException {
        this.categoryDAO = new CategoryDAO();
        this.xmlService = new XmlService();
        this.jsonService = new JsonService();
    }
    
    /**
     * Gestion des requetes GET
     * GET /api/categories - liste toutes les categories
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            List<Category> categories = categoryDAO.findAll();
            
            response.setStatus(HttpServletResponse.SC_OK);
            
            if (ContentNegotiation.isXmlRequested(request)) {
                ContentNegotiation.setXmlResponse(response);
                try {
                    CategoriesWrapper wrapper = new CategoriesWrapper(categories);
                    String xml = xmlService.marshal(wrapper, CategoriesWrapper.class);
                    response.getWriter().write(xml);
                } catch (JAXBException e) {
                    sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                             "Erreur de serialisation XML: " + e.getMessage());
                    return;
                }
            } else {
                ContentNegotiation.setJsonResponse(response);
                String json = jsonService.toJson(categories);
                response.getWriter().write(json);
            }
            
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                     "Erreur interne du serveur: " + e.getMessage());
        }
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
