package com.canteen.menu.services;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.StringReader;
import java.io.StringWriter;

/**
 * Service pour la serialisation/deserialisation JSON
 */
public class JsonService {
    private static final Gson gson = new GsonBuilder()
            .setPrettyPrinting()
            .serializeNulls()
            .create();

    /**
     * Convertit un objet en JSON
     * @param object Objet a serialiser
     * @return Chaine JSON
     */
    public static String toJson(Object object) {
        return gson.toJson(object);
    }

    /**
     * Convertit une chaine JSON en objet
     * @param json Chaine JSON
     * @param clazz Classe de l'objet cible
     * @return Objet deserialise
     */
    public static <T> T fromJson(String json, Class<T> clazz) {
        return gson.fromJson(json, clazz);
    }
}
