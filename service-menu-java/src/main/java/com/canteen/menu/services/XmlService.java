package com.canteen.menu.services;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;
import org.xml.sax.SAXException;
import java.io.*;

/**
 * Service pour la manipulation de XML
 */
public class XmlService {

    /**
     * Convertit un objet en XML
     * @param object Objet a serialiser
     * @param clazz Classe de l'objet
     * @return Chaine XML
     * @throws JAXBException en cas d'erreur
     */
    public static String toXml(Object object, Class<?> clazz) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Marshaller marshaller = context.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");

        StringWriter writer = new StringWriter();
        marshaller.marshal(object, writer);
        return writer.toString();
    }

    /**
     * Convertit une chaine XML en objet
     * @param xml Chaine XML
     * @param clazz Classe de l'objet cible
     * @return Objet deserialise
     * @throws JAXBException en cas d'erreur
     */
    public static <T> T fromXml(String xml, Class<T> clazz) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(clazz);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        StringReader reader = new StringReader(xml);
        return (T) unmarshaller.unmarshal(reader);
    }

    /**
     * Valide un fichier XML contre un schema XSD
     * @param xmlContent Contenu XML a valider
     * @param xsdPath Chemin vers le fichier XSD
     * @return true si valide
     * @throws SAXException en cas d'erreur de validation
     * @throws IOException en cas d'erreur de lecture
     */
    public static boolean validateXml(String xmlContent, String xsdPath) 
            throws SAXException, IOException {
        SchemaFactory factory = SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");
        Schema schema = factory.newSchema(new File(xsdPath));
        Validator validator = schema.newValidator();
        
        validator.validate(new StreamSource(new StringReader(xmlContent)));
        return true;
    }

    /**
     * Valide un fichier XML contre un schema XSD (avec InputStream)
     * @param xmlContent Contenu XML a valider
     * @param xsdStream Stream du fichier XSD
     * @return true si valide
     * @throws SAXException en cas d'erreur de validation
     * @throws IOException en cas d'erreur de lecture
     */
    public static boolean validateXmlWithStream(String xmlContent, InputStream xsdStream) 
            throws SAXException, IOException {
        SchemaFactory factory = SchemaFactory.newInstance("http://www.w3.org/2001/XMLSchema");
        Schema schema = factory.newSchema(new StreamSource(xsdStream));
        Validator validator = schema.newValidator();
        
        validator.validate(new StreamSource(new StringReader(xmlContent)));
        return true;
    }
}
