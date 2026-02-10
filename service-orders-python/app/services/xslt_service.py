"""
Module de gestion des transformations XSLT
"""

import logging
from lxml import etree
from flask import current_app


logger = logging.getLogger(__name__)


class XSLTService:
    """
    Service pour la gestion des transformations XSLT
    """

    @staticmethod
    def transform(xml_string, xslt_path):
        """
        Transforme un document XML en utilisant une feuille de style XSLT
        
        Args:
            xml_string: Chaine XML a transformer
            xslt_path: Chemin vers le fichier XSLT
            
        Returns:
            str: Document XML transforme
            
        Raises:
            Exception: En cas d'erreur lors de la transformation
        """
        try:
            xml_doc = etree.fromstring(xml_string.encode('utf-8'))
            
            with open(xslt_path, 'r') as xslt_file:
                xslt_doc = etree.parse(xslt_file)
            
            transform = etree.XSLT(xslt_doc)
            result_tree = transform(xml_doc)
            
            result_string = etree.tostring(
                result_tree,
                pretty_print=True,
                encoding='utf-8'
            ).decode('utf-8')
            
            logger.info(f"Transformation XSLT reussie avec {xslt_path}")
            return result_string
            
        except etree.XMLSyntaxError as e:
            logger.error(f"Erreur de syntaxe XML: {e}")
            raise
        except etree.XSLTParseError as e:
            logger.error(f"Erreur lors du parsing XSLT: {e}")
            raise
        except Exception as e:
            logger.error(f"Erreur lors de la transformation XSLT: {e}")
            raise
