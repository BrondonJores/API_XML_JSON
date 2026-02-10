package com.canteen.menu.servlets;

import com.canteen.menu.dao.MealDAO;
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
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * Servlet pour la gestion des repas via l'API REST
 * Supporte les operations CRUD sur les repas
 */
@WebServlet("/api/meals/*")
public class MealServlet extends HttpServlet {
    
    private MealDAO mealDAO;
    private XmlService xmlService;
    private JsonService jsonService;
    
    /**
     * Classe wrapper pour la serialisation XML d'une liste de repas
     */
    @XmlRootElement(name = "meals")
    @XmlAccessorType(XmlAccessType.FIELD)
    public static class MealsWrapper {
        @XmlElement(name = "meal")
        private List<Meal> meals;
        
        public MealsWrapper() {}
        
        public MealsWrapper(List<Meal> meals) {
            this.meals = meals;
        }
        
        public List<Meal> getMeals() {
            return meals;
        }
        
        public void setMeals(List<Meal> meals) {
            this.meals = meals;
        }
    }
    
    @Override
    public void init() throws ServletException {
        this.mealDAO = new MealDAO();
        this.xmlService = new XmlService();
        this.jsonService = new JsonService();
    }
    
    /**
     * Gestion des requetes GET
     * GET /api/meals - liste tous les repas
     * GET /api/meals/{id} - recupere un repas specifique
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        
        try {
            if (pathInfo == null || pathInfo.equals("/")) {
                listAllMeals(request, response);
            } else {
                String[] pathParts = pathInfo.split("/");
                if (pathParts.length >= 2) {
                    int mealId = Integer.parseInt(pathParts[1]);
                    getMealById(mealId, request, response);
                } else {
                    sendError(response, HttpServletResponse.SC_BAD_REQUEST, "ID du repas requis");
                }
            }
        } catch (NumberFormatException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, "ID du repas invalide");
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                     "Erreur interne du serveur: " + e.getMessage());
        }
    }
    
    /**
     * Gestion des requetes POST
     * POST /api/meals - cree un nouveau repas
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        try {
            String body = readRequestBody(request);
            Meal meal;
            
            if (ContentNegotiation.isXmlRequested(request)) {
                meal = xmlService.unmarshal(body, Meal.class);
            } else {
                meal = jsonService.fromJson(body, Meal.class);
            }
            
            int newId = mealDAO.save(meal);
            
            if (newId > 0) {
                meal.setId(newId);
                sendResponse(response, HttpServletResponse.SC_CREATED, meal, request);
            } else {
                sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                         "Echec de la creation du repas");
            }
            
        } catch (JAXBException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                     "Erreur de parsing XML: " + e.getMessage());
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                     "Erreur interne du serveur: " + e.getMessage());
        }
    }
    
    /**
     * Gestion des requetes PUT
     * PUT /api/meals/{id} - met a jour un repas existant
     */
    @Override
    protected void doPut(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, "ID du repas requis");
            return;
        }
        
        try {
            String[] pathParts = pathInfo.split("/");
            if (pathParts.length < 2) {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, "ID du repas requis");
                return;
            }
            
            int mealId = Integer.parseInt(pathParts[1]);
            String body = readRequestBody(request);
            Meal meal;
            
            if (ContentNegotiation.isXmlRequested(request)) {
                meal = xmlService.unmarshal(body, Meal.class);
            } else {
                meal = jsonService.fromJson(body, Meal.class);
            }
            
            meal.setId(mealId);
            
            boolean updated = mealDAO.update(meal);
            
            if (updated) {
                sendResponse(response, HttpServletResponse.SC_OK, meal, request);
            } else {
                sendError(response, HttpServletResponse.SC_NOT_FOUND, 
                         "Repas non trouve avec l'ID: " + mealId);
            }
            
        } catch (NumberFormatException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, "ID du repas invalide");
        } catch (JAXBException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, 
                     "Erreur de parsing XML: " + e.getMessage());
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                     "Erreur interne du serveur: " + e.getMessage());
        }
    }
    
    /**
     * Gestion des requetes DELETE
     * DELETE /api/meals/{id} - supprime un repas
     */
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        String pathInfo = request.getPathInfo();
        
        if (pathInfo == null || pathInfo.equals("/")) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, "ID du repas requis");
            return;
        }
        
        try {
            String[] pathParts = pathInfo.split("/");
            if (pathParts.length < 2) {
                sendError(response, HttpServletResponse.SC_BAD_REQUEST, "ID du repas requis");
                return;
            }
            
            int mealId = Integer.parseInt(pathParts[1]);
            
            boolean deleted = mealDAO.delete(mealId);
            
            if (deleted) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("Repas supprime avec succes");
            } else {
                sendError(response, HttpServletResponse.SC_NOT_FOUND, 
                         "Repas non trouve avec l'ID: " + mealId);
            }
            
        } catch (NumberFormatException e) {
            sendError(response, HttpServletResponse.SC_BAD_REQUEST, "ID du repas invalide");
        } catch (Exception e) {
            sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                     "Erreur interne du serveur: " + e.getMessage());
        }
    }
    
    /**
     * Liste tous les repas
     */
    private void listAllMeals(HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        
        List<Meal> meals = mealDAO.findAll();
        
        response.setStatus(HttpServletResponse.SC_OK);
        
        if (ContentNegotiation.isXmlRequested(request)) {
            ContentNegotiation.setXmlResponse(response);
            try {
                MealsWrapper wrapper = new MealsWrapper(meals);
                String xml = xmlService.marshal(wrapper, MealsWrapper.class);
                response.getWriter().write(xml);
            } catch (JAXBException e) {
                sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                         "Erreur de serialisation XML: " + e.getMessage());
            }
        } else {
            ContentNegotiation.setJsonResponse(response);
            String json = jsonService.toJson(meals);
            response.getWriter().write(json);
        }
    }
    
    /**
     * Recupere un repas par son ID
     */
    private void getMealById(int mealId, HttpServletRequest request, HttpServletResponse response) 
            throws IOException {
        
        Meal meal = mealDAO.findById(mealId);
        
        if (meal == null) {
            sendError(response, HttpServletResponse.SC_NOT_FOUND, 
                     "Repas non trouve avec l'ID: " + mealId);
            return;
        }
        
        sendResponse(response, HttpServletResponse.SC_OK, meal, request);
    }
    
    /**
     * Envoie une reponse avec un objet Meal
     */
    private void sendResponse(HttpServletResponse response, int status, Meal meal, 
                             HttpServletRequest request) throws IOException {
        
        response.setStatus(status);
        
        if (ContentNegotiation.isXmlRequested(request)) {
            ContentNegotiation.setXmlResponse(response);
            try {
                String xml = xmlService.marshal(meal, Meal.class);
                response.getWriter().write(xml);
            } catch (JAXBException e) {
                sendError(response, HttpServletResponse.SC_INTERNAL_SERVER_ERROR, 
                         "Erreur de serialisation XML: " + e.getMessage());
            }
        } else {
            ContentNegotiation.setJsonResponse(response);
            String json = jsonService.toJson(meal);
            response.getWriter().write(json);
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
    
    /**
     * Lit le corps de la requete HTTP
     */
    private String readRequestBody(HttpServletRequest request) throws IOException {
        StringBuilder buffer = new StringBuilder();
        BufferedReader reader = request.getReader();
        String line;
        
        while ((line = reader.readLine()) != null) {
            buffer.append(line);
        }
        
        return buffer.toString();
    }
}
