package com.canteen.menu.services;

import net.sf.saxon.s9api.*;

import javax.xml.transform.stream.StreamSource;
import java.io.*;
import java.net.URL;

/**
 * Service pour les transformations XSLT avec Saxon
 * Permet de transformer des documents XML en utilisant des feuilles de style XSLT
 */
public class XsltService {
    
    private final Processor processor;
    
    /**
     * Constructeur initialisant le processeur Saxon
     */
    public XsltService() {
        this.processor = new Processor(false);
    }
    
    /**
     * Transformer un XML avec une feuille XSLT
     * @param xmlContent Le contenu XML a transformer
     * @param xsltPath Chemin vers le fichier XSLT dans les ressources
     * @return Le resultat de la transformation
     * @throws SaxonApiException En cas d'erreur de transformation
     * @throws IOException En cas d'erreur de lecture du fichier XSLT
     */
    public String transform(String xmlContent, String xsltPath) 
            throws SaxonApiException, IOException {
        
        URL xsltUrl = getClass().getClassLoader().getResource(xsltPath);
        if (xsltUrl == null) {
            throw new IOException("Fichier XSLT introuvable: " + xsltPath);
        }
        
        XsltCompiler compiler = processor.newXsltCompiler();
        XsltExecutable stylesheet = compiler.compile(new StreamSource(xsltUrl.openStream()));
        
        XsltTransformer transformer = stylesheet.load();
        
        StringReader xmlReader = new StringReader(xmlContent);
        StreamSource xmlSource = new StreamSource(xmlReader);
        transformer.setSource(xmlSource);
        
        StringWriter resultWriter = new StringWriter();
        Serializer serializer = processor.newSerializer(resultWriter);
        transformer.setDestination(serializer);
        
        transformer.transform();
        
        return resultWriter.toString();
    }
    
    /**
     * Transformer un XML depuis un InputStream avec une feuille XSLT
     * @param xmlInputStream Le flux XML a transformer
     * @param xsltPath Chemin vers le fichier XSLT dans les ressources
     * @return Le resultat de la transformation
     * @throws SaxonApiException En cas d'erreur de transformation
     * @throws IOException En cas d'erreur de lecture du fichier XSLT
     */
    public String transform(InputStream xmlInputStream, String xsltPath) 
            throws SaxonApiException, IOException {
        
        URL xsltUrl = getClass().getClassLoader().getResource(xsltPath);
        if (xsltUrl == null) {
            throw new IOException("Fichier XSLT introuvable: " + xsltPath);
        }
        
        XsltCompiler compiler = processor.newXsltCompiler();
        XsltExecutable stylesheet = compiler.compile(new StreamSource(xsltUrl.openStream()));
        
        XsltTransformer transformer = stylesheet.load();
        
        StreamSource xmlSource = new StreamSource(xmlInputStream);
        transformer.setSource(xmlSource);
        
        StringWriter resultWriter = new StringWriter();
        Serializer serializer = processor.newSerializer(resultWriter);
        transformer.setDestination(serializer);
        
        transformer.transform();
        
        return resultWriter.toString();
    }
    
    /**
     * Transformer un XML vers un OutputStream avec une feuille XSLT
     * @param xmlContent Le contenu XML a transformer
     * @param xsltPath Chemin vers le fichier XSLT dans les ressources
     * @param outputStream Le flux de sortie pour le resultat
     * @throws SaxonApiException En cas d'erreur de transformation
     * @throws IOException En cas d'erreur de lecture du fichier XSLT
     */
    public void transform(String xmlContent, String xsltPath, OutputStream outputStream) 
            throws SaxonApiException, IOException {
        
        URL xsltUrl = getClass().getClassLoader().getResource(xsltPath);
        if (xsltUrl == null) {
            throw new IOException("Fichier XSLT introuvable: " + xsltPath);
        }
        
        XsltCompiler compiler = processor.newXsltCompiler();
        XsltExecutable stylesheet = compiler.compile(new StreamSource(xsltUrl.openStream()));
        
        XsltTransformer transformer = stylesheet.load();
        
        StringReader xmlReader = new StringReader(xmlContent);
        StreamSource xmlSource = new StreamSource(xmlReader);
        transformer.setSource(xmlSource);
        
        Serializer serializer = processor.newSerializer(outputStream);
        transformer.setDestination(serializer);
        
        transformer.transform();
    }
    
    /**
     * Transformer un XML avec une feuille XSLT et des parametres
     * @param xmlContent Le contenu XML a transformer
     * @param xsltPath Chemin vers le fichier XSLT dans les ressources
     * @param parameters Parametres a passer a la transformation XSLT
     * @return Le resultat de la transformation
     * @throws SaxonApiException En cas d'erreur de transformation
     * @throws IOException En cas d'erreur de lecture du fichier XSLT
     */
    public String transformWithParameters(String xmlContent, String xsltPath, 
                                         java.util.Map<String, String> parameters) 
            throws SaxonApiException, IOException {
        
        URL xsltUrl = getClass().getClassLoader().getResource(xsltPath);
        if (xsltUrl == null) {
            throw new IOException("Fichier XSLT introuvable: " + xsltPath);
        }
        
        XsltCompiler compiler = processor.newXsltCompiler();
        XsltExecutable stylesheet = compiler.compile(new StreamSource(xsltUrl.openStream()));
        
        XsltTransformer transformer = stylesheet.load();
        
        if (parameters != null) {
            for (java.util.Map.Entry<String, String> entry : parameters.entrySet()) {
                QName paramName = new QName(entry.getKey());
                XdmValue paramValue = new XdmAtomicValue(entry.getValue());
                transformer.setParameter(paramName, paramValue);
            }
        }
        
        StringReader xmlReader = new StringReader(xmlContent);
        StreamSource xmlSource = new StreamSource(xmlReader);
        transformer.setSource(xmlSource);
        
        StringWriter resultWriter = new StringWriter();
        Serializer serializer = processor.newSerializer(resultWriter);
        transformer.setDestination(serializer);
        
        transformer.transform();
        
        return resultWriter.toString();
    }
    
    /**
     * Obtenir le processeur Saxon
     * @return Instance du processeur Saxon
     */
    public Processor getProcessor() {
        return processor;
    }
}
