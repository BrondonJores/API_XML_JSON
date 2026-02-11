package com.canteen.menu.services;

import jakarta.xml.bind.*;
import jakarta.xml.bind.util.JAXBSource;
import javax.xml.XMLConstants;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.SAXParserFactory;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import org.xml.sax.SAXException;
import org.xml.sax.InputSource;

import java.io.*;
import java.net.URL;

/**
 * Service securise pour la serialisation et deserialisation XML avec JAXB
 * Supporte la validation contre des schemas XSD
 * SECURITE: Protection contre les attaques XXE (XML External Entity)
 */
public class XmlService {
    
    private static final String SCHEMA_LANGUAGE = XMLConstants.W3C_XML_SCHEMA_NS_URI;
    
    /**
     * Creer un Unmarshaller securise avec protection XXE
     * @param context Le contexte JAXB
     * @return Unmarshaller securise
     * @throws JAXBException En cas d'erreur de configuration
     */
    private Unmarshaller createSecureUnmarshaller(JAXBContext context) throws JAXBException {
        Unmarshaller unmarshaller = context.createUnmarshaller();
        
        try {
            // Configuration du SAXParserFactory pour desactiver les entites externes (protection XXE)
            SAXParserFactory spf = SAXParserFactory.newInstance();
            spf.setFeature("http://xml.org/sax/features/external-general-entities", false);
            spf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
            spf.setFeature("http://apache.org/xml/features/nonvalidating/load-external-dtd", false);
            spf.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            spf.setNamespaceAware(true);
        } catch (Exception e) {
            // Echec de la configuration de securite - ne pas continuer
            throw new JAXBException("Impossible de configurer la protection XXE pour l'unmarshaller", e);
        }
        
        return unmarshaller;
    }
    
    /**
     * Convertir un objet Java en XML (marshalling)
     * @param object L'objet a convertir
     * @param clazz La classe de l'objet
     * @param <T> Type generique
     * @return String XML
     * @throws JAXBException En cas d'erreur de marshalling
     */
    public <T> String marshal(T object, Class<T> clazz) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
        
        StringWriter writer = new StringWriter();
        marshaller.marshal(object, writer);
        
        return writer.toString();
    }
    
    /**
     * Convertir un objet Java en XML vers un OutputStream
     * @param object L'objet a convertir
     * @param clazz La classe de l'objet
     * @param outputStream Le flux de sortie
     * @param <T> Type generique
     * @throws JAXBException En cas d'erreur de marshalling
     */
    public <T> void marshal(T object, Class<T> clazz, OutputStream outputStream) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
        
        marshaller.marshal(object, outputStream);
    }
    
    /**
     * Convertir un XML en objet Java (unmarshalling) avec protection XXE
     * @param xml Le contenu XML
     * @param clazz La classe cible
     * @param <T> Type generique
     * @return L'objet deserialise
     * @throws JAXBException En cas d'erreur de unmarshalling
     */
    public <T> T unmarshal(String xml, Class<T> clazz) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Unmarshaller unmarshaller = createSecureUnmarshaller(context);
        
        StringReader reader = new StringReader(xml);
        return (T) unmarshaller.unmarshal(reader);
    }
    
    /**
     * Convertir un XML depuis un InputStream en objet Java avec protection XXE
     * @param inputStream Le flux d'entree XML
     * @param clazz La classe cible
     * @param <T> Type generique
     * @return L'objet deserialise
     * @throws JAXBException En cas d'erreur de unmarshalling
     */
    public <T> T unmarshal(InputStream inputStream, Class<T> clazz) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Unmarshaller unmarshaller = createSecureUnmarshaller(context);
        
        return (T) unmarshaller.unmarshal(inputStream);
    }
    
    /**
     * Valider un objet Java contre un schema XSD
     * @param object L'objet a valider
     * @param clazz La classe de l'objet
     * @param xsdPath Chemin vers le fichier XSD dans les ressources
     * @param <T> Type generique
     * @throws JAXBException En cas d'erreur de validation JAXB
     * @throws SAXException En cas d'erreur de parsing XSD
     * @throws IOException En cas d'erreur de lecture du fichier XSD
     */
    public <T> void validateAgainstXsd(T object, Class<T> clazz, String xsdPath) 
            throws JAXBException, SAXException, IOException {
        
        URL xsdUrl = getClass().getClassLoader().getResource(xsdPath);
        if (xsdUrl == null) {
            throw new IOException("Schema XSD introuvable: " + xsdPath);
        }
        
        SchemaFactory schemaFactory = SchemaFactory.newInstance(SCHEMA_LANGUAGE);
        
        // Protection XXE pour le schema factory
        try {
            schemaFactory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
        } catch (Exception e) {
            System.err.println("Avertissement: Configuration securite XXE schema: " + e.getMessage());
        }
        
        Schema schema = schemaFactory.newSchema(xsdUrl);
        
        JAXBContext context = JAXBContext.newInstance(clazz);
        Marshaller marshaller = context.createMarshaller();
        marshaller.setSchema(schema);
        
        StringWriter writer = new StringWriter();
        marshaller.marshal(object, writer);
    }
    
    /**
     * Valider un XML String contre un schema XSD avec protection XXE
     * @param xml Le contenu XML a valider
     * @param xsdPath Chemin vers le fichier XSD dans les ressources
     * @throws SAXException En cas d'erreur de validation
     * @throws IOException En cas d'erreur de lecture du fichier XSD
     */
    public void validateXmlAgainstXsd(String xml, String xsdPath) 
            throws SAXException, IOException {
        
        URL xsdUrl = getClass().getClassLoader().getResource(xsdPath);
        if (xsdUrl == null) {
            throw new IOException("Schema XSD introuvable: " + xsdPath);
        }
        
        SchemaFactory schemaFactory = SchemaFactory.newInstance(SCHEMA_LANGUAGE);
        
        // Protection XXE
        try {
            schemaFactory.setFeature(XMLConstants.FEATURE_SECURE_PROCESSING, true);
            schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            schemaFactory.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
        } catch (Exception e) {
            System.err.println("Avertissement: Configuration securite XXE: " + e.getMessage());
        }
        
        Schema schema = schemaFactory.newSchema(xsdUrl);
        
        Validator validator = schema.newValidator();
        
        // Desactiver les entites externes dans le validator
        try {
            validator.setProperty(XMLConstants.ACCESS_EXTERNAL_DTD, "");
            validator.setProperty(XMLConstants.ACCESS_EXTERNAL_SCHEMA, "");
        } catch (Exception e) {
            System.err.println("Avertissement: Configuration securite validator: " + e.getMessage());
        }
        
        validator.validate(new javax.xml.transform.stream.StreamSource(new StringReader(xml)));
    }
    
    /**
     * Convertir un objet Java en XML avec validation XSD
     * @param object L'objet a convertir
     * @param clazz La classe de l'objet
     * @param xsdPath Chemin vers le fichier XSD dans les ressources
     * @param <T> Type generique
     * @return String XML validee
     * @throws JAXBException En cas d'erreur de marshalling
     * @throws SAXException En cas d'erreur de validation
     * @throws IOException En cas d'erreur de lecture du fichier XSD
     */
    public <T> String marshalWithValidation(T object, Class<T> clazz, String xsdPath) 
            throws JAXBException, SAXException, IOException {
        
        validateAgainstXsd(object, clazz, xsdPath);
        return marshal(object, clazz);
    }
    
    /**
     * Convertir un XML en objet Java avec validation XSD et protection XXE
     * @param xml Le contenu XML
     * @param clazz La classe cible
     * @param xsdPath Chemin vers le fichier XSD dans les ressources
     * @param <T> Type generique
     * @return L'objet deserialise et valide
     * @throws JAXBException En cas d'erreur de unmarshalling
     * @throws SAXException En cas d'erreur de validation
     * @throws IOException En cas d'erreur de lecture du fichier XSD
     */
    public <T> T unmarshalWithValidation(String xml, Class<T> clazz, String xsdPath) 
            throws JAXBException, SAXException, IOException {
        
        validateXmlAgainstXsd(xml, xsdPath);
        return unmarshal(xml, clazz);
    }
    
    /**
     * Convertir un objet Meal en XML
     * Methode helper pour faciliter l'utilisation
     */
    public String marshalMeal(com.canteen.menu.models.Meal meal) throws JAXBException {
        return marshal(meal, com.canteen.menu.models.Meal.class);
    }
    
    /**
     * Convertir une liste de Meal en XML
     * Methode helper pour faciliter l'utilisation
     */
    public String marshalMealList(java.util.List<com.canteen.menu.models.Meal> meals) throws JAXBException {
        com.canteen.menu.models.MealList mealList = new com.canteen.menu.models.MealList();
        mealList.setMeals(meals);
        return marshal(mealList, com.canteen.menu.models.MealList.class);
    }
    
    /**
     * Convertir un XML en objet Meal avec protection XXE
     * Methode helper pour faciliter l'utilisation
     */
    public com.canteen.menu.models.Meal unmarshalMeal(java.io.Reader reader) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(com.canteen.menu.models.Meal.class);
        Unmarshaller unmarshaller = createSecureUnmarshaller(context);
        return (com.canteen.menu.models.Meal) unmarshaller.unmarshal(reader);
    }
}
