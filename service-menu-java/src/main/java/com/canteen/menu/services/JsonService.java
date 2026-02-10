package com.canteen.menu.services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonSyntaxException;

import java.io.Reader;
import java.io.Writer;

/**
 * Service pour la serialisation et deserialisation JSON avec Gson
 */
public class JsonService {
    
    private final Gson gson;
    private final Gson gsonPretty;
    
    /**
     * Constructeur initialisant les instances Gson
     */
    public JsonService() {
        this.gson = new GsonBuilder()
                .serializeNulls()
                .create();
        
        this.gsonPretty = new GsonBuilder()
                .setPrettyPrinting()
                .serializeNulls()
                .create();
    }
    
    /**
     * Convertir un objet Java en JSON
     * @param object L'objet a convertir
     * @return String JSON
     */
    public String toJson(Object object) {
        return gson.toJson(object);
    }
    
    /**
     * Convertir un objet Java en JSON formate (pretty print)
     * @param object L'objet a convertir
     * @return String JSON formatee
     */
    public String toJsonPretty(Object object) {
        return gsonPretty.toJson(object);
    }
    
    /**
     * Convertir un objet Java en JSON vers un Writer
     * @param object L'objet a convertir
     * @param writer Le writer de sortie
     */
    public void toJson(Object object, Writer writer) {
        gson.toJson(object, writer);
    }
    
    /**
     * Convertir un objet Java en JSON formate vers un Writer
     * @param object L'objet a convertir
     * @param writer Le writer de sortie
     */
    public void toJsonPretty(Object object, Writer writer) {
        gsonPretty.toJson(object, writer);
    }
    
    /**
     * Convertir un JSON en objet Java
     * @param json Le contenu JSON
     * @param clazz La classe cible
     * @param <T> Type generique
     * @return L'objet deserialise
     * @throws JsonSyntaxException Si le JSON est invalide
     */
    public <T> T fromJson(String json, Class<T> clazz) throws JsonSyntaxException {
        return gson.fromJson(json, clazz);
    }
    
    /**
     * Convertir un JSON depuis un Reader en objet Java
     * @param reader Le reader contenant le JSON
     * @param clazz La classe cible
     * @param <T> Type generique
     * @return L'objet deserialise
     * @throws JsonSyntaxException Si le JSON est invalide
     */
    public <T> T fromJson(Reader reader, Class<T> clazz) throws JsonSyntaxException {
        return gson.fromJson(reader, clazz);
    }
    
    /**
     * Valider si une chaine est un JSON valide
     * @param json Le contenu JSON a valider
     * @return true si valide, false sinon
     */
    public boolean isValidJson(String json) {
        try {
            gson.fromJson(json, Object.class);
            return true;
        } catch (JsonSyntaxException e) {
            return false;
        }
    }
    
    /**
     * Obtenir l'instance Gson standard
     * @return Instance Gson
     */
    public Gson getGson() {
        return gson;
    }
    
    /**
     * Obtenir l'instance Gson avec formatage
     * @return Instance Gson avec pretty print
     */
    public Gson getGsonPretty() {
        return gsonPretty;
    }
    
    /**
     * Parser un JSON vers un objet Meal
     * Methode helper pour faciliter l'utilisation
     */
    public com.canteen.menu.models.Meal parseMeal(Reader reader) throws JsonSyntaxException {
        return fromJson(reader, com.canteen.menu.models.Meal.class);
    }
}
