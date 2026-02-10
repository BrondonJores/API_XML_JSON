package com.canteen.menu.services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Service pour la gestion des operations JSON
 * Utilise Gson pour la serialisation et deserialisation
 */
public class JsonService {
    
    private static final Logger logger = LoggerFactory.getLogger(JsonService.class);
    private static final String DATE_FORMAT = "yyyy-MM-dd'T'HH:mm:ss";
    
    private final Gson gson;
    
    /**
     * Constructeur initialisant le Gson avec la configuration appropriee
     */
    public JsonService() {
        this.gson = new GsonBuilder()
                .setDateFormat(DATE_FORMAT)
                .setPrettyPrinting()
                .create();
    }
    
    /**
     * Convertit un objet Java en chaine JSON
     * 
     * @param obj L'objet a convertir
     * @return La representation JSON sous forme de chaine
     */
    public String toJson(Object obj) {
        try {
            String json = gson.toJson(obj);
            logger.info("Objet converti en JSON avec succes: {}", obj.getClass().getSimpleName());
            return json;
            
        } catch (Exception e) {
            logger.error("Erreur lors de la conversion en JSON: {}", e.getMessage());
            throw e;
        }
    }
    
    /**
     * Convertit une chaine JSON en objet Java
     * 
     * @param json La chaine JSON a convertir
     * @param clazz La classe cible
     * @return L'objet Java deserialise
     * @throws JsonSyntaxException Si le JSON est mal forme
     */
    public <T> T fromJson(String json, Class<T> clazz) throws JsonSyntaxException {
        try {
            T result = gson.fromJson(json, clazz);
            logger.info("JSON converti en objet avec succes: {}", clazz.getSimpleName());
            return result;
            
        } catch (JsonSyntaxException e) {
            logger.error("Erreur lors de la conversion du JSON: {}", e.getMessage());
            throw e;
        }
    }
}
