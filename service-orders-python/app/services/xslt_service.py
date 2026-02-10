"""
Service de transformation XSLT
"""
import os
from lxml import etree
from app.config import Config

class XSLTService:
    """
    Service pour les transformations XSLT
    """
    
    @staticmethod
    def transform(xml_string: str, xslt_name: str) -> str:
        """
        Applique une transformation XSLT sur du XML
        
        Args:
            xml_string: Chaine XML source
            xslt_name: Nom du fichier XSLT
            
        Returns:
            Resultat de la transformation
        """
        try:
            xslt_path = os.path.join(Config.XSLT_DIR, xslt_name)
            
            if not os.path.exists(xslt_path):
                raise FileNotFoundError(f"XSLT {xslt_name} introuvable")
            
            # Chargement du XSLT
            with open(xslt_path, 'rb') as xslt_file:
                xslt_root = etree.XML(xslt_file.read())
                transform = etree.XSLT(xslt_root)
            
            # Parse du XML source
            xml_doc = etree.fromstring(xml_string.encode('utf-8'))
            
            # Application de la transformation
            result = transform(xml_doc)
            
            return str(result)
            
        except Exception as e:
            raise Exception(f"Erreur de transformation XSLT: {str(e)}")
    
    @staticmethod
    def order_to_invoice(order_xml: str) -> str:
        """
        Transforme une commande XML en facture HTML
        
        Args:
            order_xml: XML de la commande
            
        Returns:
            HTML de la facture
        """
        return XSLTService.transform(order_xml, 'order-to-invoice.xslt')
    
    @staticmethod
    def orders_to_stats(orders_xml: str) -> str:
        """
        Transforme une liste de commandes en statistiques HTML
        
        Args:
            orders_xml: XML des commandes
            
        Returns:
            HTML des statistiques
        """
        return XSLTService.transform(orders_xml, 'orders-to-stats.xslt')
