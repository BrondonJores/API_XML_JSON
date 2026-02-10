package com.canteen.menu.services;

import net.sf.saxon.s9api.*;
import javax.xml.transform.stream.StreamSource;
import java.io.*;

/**
 * Service pour les transformations XSLT avec Saxon
 */
public class XsltService {

    /**
     * Transforme un document XML avec une feuille XSLT
     * @param xmlContent Contenu XML source
     * @param xsltPath Chemin vers le fichier XSLT
     * @return Resultat de la transformation
     * @throws SaxonApiException en cas d'erreur de transformation
     */
    public static String transform(String xmlContent, String xsltPath) throws SaxonApiException {
        Processor processor = new Processor(false);
        XsltCompiler compiler = processor.newXsltCompiler();
        
        // Compilation de la feuille XSLT
        XsltExecutable stylesheet = compiler.compile(new StreamSource(new File(xsltPath)));
        XsltTransformer transformer = stylesheet.load();
        
        // Source XML
        StringReader xmlReader = new StringReader(xmlContent);
        StreamSource source = new StreamSource(xmlReader);
        transformer.setSource(source);
        
        // Destination
        StringWriter resultWriter = new StringWriter();
        Serializer serializer = processor.newSerializer(resultWriter);
        transformer.setDestination(serializer);
        
        // Transformation
        transformer.transform();
        
        return resultWriter.toString();
    }

    /**
     * Transforme un document XML avec une feuille XSLT (avec InputStream)
     * @param xmlContent Contenu XML source
     * @param xsltStream Stream de la feuille XSLT
     * @return Resultat de la transformation
     * @throws SaxonApiException en cas d'erreur de transformation
     */
    public static String transformWithStream(String xmlContent, InputStream xsltStream) 
            throws SaxonApiException {
        Processor processor = new Processor(false);
        XsltCompiler compiler = processor.newXsltCompiler();
        
        // Compilation de la feuille XSLT
        XsltExecutable stylesheet = compiler.compile(new StreamSource(xsltStream));
        XsltTransformer transformer = stylesheet.load();
        
        // Source XML
        StringReader xmlReader = new StringReader(xmlContent);
        StreamSource source = new StreamSource(xmlReader);
        transformer.setSource(source);
        
        // Destination
        StringWriter resultWriter = new StringWriter();
        Serializer serializer = processor.newSerializer(resultWriter);
        transformer.setDestination(serializer);
        
        // Transformation
        transformer.transform();
        
        return resultWriter.toString();
    }
}
