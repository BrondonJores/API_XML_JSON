package com.canteen.menu.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.XMLConstants;
import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;

/**
 * Service pour la gestion des operations XML
 * Utilise JAXB pour la serialisation et deserialisation
 */
public class XmlService {
    
    private static final Logger logger = LoggerFactory.getLogger(XmlService.class);
    
    /**
     * Convertit un objet Java en chaine XML
     * 
     * @param obj L'objet a convertir
     * @param clazz La classe de l'objet
     * @return La representation XML sous forme de chaine
     * @throws JAXBException Si une erreur survient lors de la conversion
     */
    public String marshal(Object obj, Class<?> clazz) throws JAXBException {
        try {
            JAXBContext context = JAXBContext.newInstance(clazz);
            Marshaller marshaller = context.createMarshaller();
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
            
            StringWriter writer = new StringWriter();
            marshaller.marshal(obj, writer);
            
            String xml = writer.toString();
            logger.info("Objet converti en XML avec succes: {}", clazz.getSimpleName());
            return xml;
            
        } catch (JAXBException e) {
            logger.error("Erreur lors de la conversion en XML: {}", e.getMessage());
            throw e;
        }
    }
    
    /**
     * Convertit une chaine XML en objet Java
     * 
     * @param xml La chaine XML a convertir
     * @param clazz La classe cible
     * @return L'objet Java deserialise
     * @throws JAXBException Si une erreur survient lors de la conversion
     */
    @SuppressWarnings("unchecked")
    public <T> T unmarshal(String xml, Class<T> clazz) throws JAXBException {
        try {
            JAXBContext context = JAXBContext.newInstance(clazz);
            Unmarshaller unmarshaller = context.createUnmarshaller();
            
            StringReader reader = new StringReader(xml);
            T result = (T) unmarshaller.unmarshal(reader);
            
            logger.info("XML converti en objet avec succes: {}", clazz.getSimpleName());
            return result;
            
        } catch (JAXBException e) {
            logger.error("Erreur lors de la conversion du XML: {}", e.getMessage());
            throw e;
        }
    }
    
    /**
     * Valide un document XML contre un schema XSD
     * 
     * @param xml Le document XML a valider
     * @param xsdPath Le chemin vers le fichier XSD dans les ressources
     * @return true si le XML est valide, false sinon
     */
    public boolean validate(String xml, String xsdPath) {
        try {
            SchemaFactory schemaFactory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
            
            InputStream xsdStream = getClass().getClassLoader().getResourceAsStream(xsdPath);
            if (xsdStream == null) {
                logger.error("Schema XSD introuvable: {}", xsdPath);
                return false;
            }
            
            Schema schema = schemaFactory.newSchema(new StreamSource(xsdStream));
            Validator validator = schema.newValidator();
            validator.validate(new StreamSource(new StringReader(xml)));
            
            logger.info("Validation XML reussie contre le schema: {}", xsdPath);
            return true;
            
        } catch (Exception e) {
            logger.error("Erreur de validation XML: {}", e.getMessage());
            return false;
        }
    }
}
