"""
Module de gestion des operations XML
"""

import logging
import dicttoxml
import xmltodict
import xmlschema
from flask import current_app


logger = logging.getLogger(__name__)


class XMLService:
    """
    Service pour la gestion des operations XML
    """

    @staticmethod
    def dict_to_xml(data, root_name='root'):
        """
        Convertit un dictionnaire en chaine XML
        
        Args:
            data: Dictionnaire a convertir
            root_name: Nom de l'element racine
            
        Returns:
            str: Chaine XML resultante
            
        Raises:
            Exception: En cas d'erreur de conversion
        """
        try:
            xml_bytes = dicttoxml.dicttoxml(
                data,
                custom_root=root_name,
                attr_type=False
            )
            xml_string = xml_bytes.decode('utf-8')
            logger.info(f"Conversion reussie du dictionnaire vers XML avec racine '{root_name}'")
            return xml_string
        except Exception as e:
            logger.error(f"Erreur lors de la conversion dict vers XML: {e}")
            raise

    @staticmethod
    def xml_to_dict(xml_string):
        """
        Convertit une chaine XML en dictionnaire
        
        Args:
            xml_string: Chaine XML a convertir
            
        Returns:
            dict: Dictionnaire resultant
            
        Raises:
            Exception: En cas d'erreur de conversion
        """
        try:
            result = xmltodict.parse(xml_string)
            logger.info("Conversion reussie du XML vers dictionnaire")
            return result
        except Exception as e:
            logger.error(f"Erreur lors de la conversion XML vers dict: {e}")
            raise

    @staticmethod
    def validate_xml(xml_string, xsd_path):
        """
        Valide une chaine XML contre un schema XSD
        
        Args:
            xml_string: Chaine XML a valider
            xsd_path: Chemin vers le fichier XSD
            
        Returns:
            bool: True si valide, False sinon
            
        Raises:
            Exception: En cas d'erreur lors de la validation
        """
        try:
            schema = xmlschema.XMLSchema(xsd_path)
            is_valid = schema.is_valid(xml_string)
            
            if is_valid:
                logger.info(f"XML valide selon le schema {xsd_path}")
            else:
                errors = schema.validate(xml_string)
                logger.warning(f"XML invalide: {errors}")
                
            return is_valid
        except Exception as e:
            logger.error(f"Erreur lors de la validation XML: {e}")
            raise
