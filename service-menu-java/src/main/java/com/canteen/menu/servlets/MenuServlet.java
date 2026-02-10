package com.canteen.menu.servlets;

import com.canteen.menu.dao.CategoryDAO;
import com.canteen.menu.dao.MealDAO;
import com.canteen.menu.models.Category;
import com.canteen.menu.models.Meal;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Servlet pour la gestion du menu du jour via l'API REST
 * Retourne les repas disponibles groupes par categorie
 */
@WebServlet("/api/menu/today")
public class MenuServlet extends HttpServlet {
    
    private MealDAO mealDAO;
    private CategoryDAO categoryDAO;
    private XmlService xmlService;
    private JsonService jsonService;
    
    /**
     * Classe pour representer une categorie avec ses repas
     */
    @XmlRootElement(name = "categoryMenu")
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class CategoryMenu {
        @XmlElement
        private Integer categoryId;
        
        @XmlElement
        private String categoryName;
        
        @XmlElement
        private String categoryDescription;
        
        @XmlElement(name = "meal")
        private List<Meal> meals;
        
        public CategoryMenu() {}
        
        public CategoryMenu(Integer categoryId, String categoryName, String categoryDescription, List<Meal> meals) {
            this.categoryId = categoryId;
            this.categoryName = categoryName;
            this.categoryDescription = categoryDescription;
            this.meals = meals;
        }
        
        public Integer getCategoryId() {
            return categoryId;
        }
        
        public void setCategoryId(Integer categoryId) {
            this.categoryId = categoryId;
        }
        
        public String getCategoryName() {
            return categoryName;
        }
        
        public void setCategoryName(String categoryName) {
            this.categoryName = categoryName;
        }
        
        public String getCategoryDescription() {
            return categoryDescription;
        }
        
        public void setCategoryDescription(String categoryDescription) {
            this.categoryDescription = categoryDescription;
        }
        
        public List<Meal> getMeals() {
            return meals;
        }
        
        public void setMeals(List<Meal> meals) {
            this.meals = meals;
        }
    }
    
    /**
     * Classe wrapper pour la serialisation XML du menu complet
     */
    @XmlRootElement(name = "menu")
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class MenuWrapper {
        @XmlElement(name = "categoryMenu")
        private List<CategoryMenu> categories;
        
        public MenuWrapper() {}
        
        public MenuWrapper(List<CategoryMenu> categories) {
            this.categories = categories;
        }
        
        public List<CategoryMenu> getCategories() {
            return categories;
        }
        
        public void setCategories(List<CategoryMenu> categories) {
            this.categories = categories;
        }
    }
    
    @Override
    public void init() throws ServletException {
        this.mealDAO = new MealDAO();
        this.categoryDAO = new CategoryDAO();
        this.xmlService = new XmlService();
        this.jsonService = new JsonService();
    }
    
    /**
     * Gestion des requetes GET
     * GET /api/menu/today - retourne les repas disponibles aujourd'hui groupes par categorie
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            List<Meal> availableMeals = mealDAO.findAvailableMeals();
            List<Category> categories = categoryDAO.findAll();
            
            Map<Integer, Category> categoryMap = new HashMap<>();
            for (Category category : categories) {
                categoryMap.put(category.getId(), category);
            }
            
            Map<Integer, List<Meal>> mealsByCategory = new HashMap<>();
            for (Meal meal : availableMeals) {
                mealsByCategory.computeIfAbsent(meal.getCategoryId(), k -> new ArrayList<>()).add(meal);
            }
            
            List<CategoryMenu> categoryMenus = new ArrayList<>();
            for (Map.Entry<Integer, List<Meal>> entry : mealsByCategory.entrySet()) {
                Integer categoryId = entry.getKey();
                List<Meal> meals = entry.getValue();
                Category category = categoryMap.get(categoryId);
                
                if (category != null) {
                    CategoryMenu categoryMenu = new CategoryMenu(
                        categoryId, 
                        category.getName(), 
                        category.getDescription(), 
                        meals
                    );
                    categoryMenus.add(categoryMenu);
                }
            }
            
            if (ContentNegotiation.isXmlRequested(request)) {
                ContentNegotiation.setXmlResponse(response);
                try {
                    MenuWrapper wrapper = new MenuWrapper(categoryMenus);
                    String xml = xmlService.marshal(wrapper, MenuWrapper.class);
                    response.getWriter().write(xml);
                } catch (JAXBException e) {
                    sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                             "Erreur de serialisation XML: " + e.getMessage());
                    return;
                }
            } else {
                ContentNegotiation.setJsonResponse(response);
                String json = jsonService.toJson(categoryMenus);
                response.getWriter().write(json);
            }
            
            response.setStatus(HttpServletResponse.SC_OK);
            
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
