package com.canteen.menu.services;

import net.sf.saxon.TransformerFactoryImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.stream.StreamResult;
import javax.xml.transform.stream.StreamSource;
import java.io.InputStream;
import java.io.StringReader;
import java.io.StringWriter;

/**
 * Service pour la transformation XML via XSLT
 * Utilise Saxon comme moteur de transformation
 */
public class XsltService {
    
    private static final Logger logger = LoggerFactory.getLogger(XsltService.class);
    
    /**
     * Transforme un document XML en utilisant une feuille de style XSLT
     * 
     * @param xmlInput Le document XML source
     * @param xsltPath Le chemin vers la feuille XSLT dans les ressources
     * @return Le resultat de la transformation sous forme de chaine
     * @throws TransformerException Si une erreur survient lors de la transformation
     */
    public String transform(String xmlInput, String xsltPath) throws TransformerException {
        try (InputStream xsltStream = getClass().getClassLoader().getResourceAsStream(xsltPath)) {
            TransformerFactory transformerFactory = new TransformerFactoryImpl();
            
            if (xsltStream == null) {
                throw new TransformerException("Feuille XSLT introuvable: " + xsltPath);
            }
            
            StreamSource xsltSource = new StreamSource(xsltStream);
            Transformer transformer = transformerFactory.newTransformer(xsltSource);
            
            StreamSource xmlSource = new StreamSource(new StringReader(xmlInput));
            StringWriter writer = new StringWriter();
            StreamResult result = new StreamResult(writer);
            
            transformer.transform(xmlSource, result);
            
            String output = writer.toString();
            logger.info("Transformation XSLT reussie avec la feuille: {}", xsltPath);
            return output;
            
        } catch (TransformerException e) {
            logger.error("Erreur lors de la transformation XSLT: {}", e.getMessage());
            throw e;
        } catch (Exception e) {
            logger.error("Erreur lors de la transformation XSLT: {}", e.getMessage());
            throw new TransformerException(e);
        }
    }
}
