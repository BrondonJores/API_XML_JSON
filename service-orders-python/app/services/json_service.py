"""
Module de gestion des operations JSON
"""

import json
import logging
import jsonschema
from flask import current_app


logger = logging.getLogger(__name__)


class JSONService:
    """
    Service pour la gestion des operations JSON
    """

    @staticmethod
    def to_json(data):
        """
        Convertit un dictionnaire en chaine JSON formatee
        
        Args:
            data: Dictionnaire a convertir
            
        Returns:
            str: Chaine JSON formatee
            
        Raises:
            Exception: En cas d'erreur de conversion
        """
        try:
            json_string = json.dumps(data, indent=2, ensure_ascii=False)
            logger.info("Conversion reussie du dictionnaire vers JSON")
            return json_string
        except Exception as e:
            logger.error(f"Erreur lors de la conversion vers JSON: {e}")
            raise

    @staticmethod
    def from_json(json_string):
        """
        Convertit une chaine JSON en dictionnaire
        
        Args:
            json_string: Chaine JSON a convertir
            
        Returns:
            dict: Dictionnaire resultant
            
        Raises:
            Exception: En cas d'erreur de conversion
        """
        try:
            result = json.loads(json_string)
            logger.info("Conversion reussie du JSON vers dictionnaire")
            return result
        except json.JSONDecodeError as e:
            logger.error(f"Erreur lors du decodage JSON: {e}")
            raise
        except Exception as e:
            logger.error(f"Erreur lors de la conversion JSON: {e}")
            raise

    @staticmethod
    def validate_json(json_string, schema_path):
        """
        Valide une chaine JSON contre un schema JSON
        
        Args:
            json_string: Chaine JSON a valider
            schema_path: Chemin vers le fichier de schema JSON
            
        Returns:
            bool: True si valide, False sinon
            
        Raises:
            Exception: En cas d'erreur lors de la validation
        """
        try:
            data = json.loads(json_string)
            
            with open(schema_path, 'r') as schema_file:
                schema = json.load(schema_file)
            
            jsonschema.validate(instance=data, schema=schema)
            logger.info(f"JSON valide selon le schema {schema_path}")
            return True
            
        except jsonschema.ValidationError as e:
            logger.warning(f"JSON invalide: {e.message}")
            return False
        except Exception as e:
            logger.error(f"Erreur lors de la validation JSON: {e}")
            raise
