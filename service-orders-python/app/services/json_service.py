"""
Service de validation JSON
"""
import json
from typing import Dict, Any
from jsonschema import validate, ValidationError

class JSONService:
    """
    Service pour la manipulation de JSON
    """
    
    # Schema JSON pour les commandes
    ORDER_SCHEMA = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Order",
        "type": "object",
        "required": ["userId", "items", "total"],
        "properties": {
            "id": {
                "type": "integer",
                "description": "Identifiant de la commande"
            },
            "userId": {
                "type": "integer",
                "description": "Identifiant de l'utilisateur"
            },
            "items": {
                "type": "array",
                "minItems": 1,
                "items": {
                    "type": "object",
                    "required": ["mealId", "mealName", "quantity", "price"],
                    "properties": {
                        "id": {
                            "type": "integer"
                        },
                        "mealId": {
                            "type": "integer"
                        },
                        "mealName": {
                            "type": "string"
                        },
                        "quantity": {
                            "type": "integer",
                            "minimum": 1
                        },
                        "price": {
                            "type": "number",
                            "minimum": 0
                        }
                    }
                }
            },
            "total": {
                "type": "number",
                "minimum": 0,
                "description": "Montant total de la commande"
            },
            "status": {
                "type": "string",
                "enum": ["pending", "preparing", "ready", "completed", "cancelled"],
                "default": "pending"
            },
            "pickupTime": {
                "type": "string",
                "format": "date-time",
                "description": "Heure de retrait prevue"
            },
            "createdAt": {
                "type": "string",
                "format": "date-time",
                "description": "Date de creation"
            }
        }
    }
    
    @staticmethod
    def validate_order(data: Dict[str, Any]) -> tuple[bool, str]:
        """
        Valide les donnees d'une commande contre le schema JSON
        
        Args:
            data: Dictionnaire de donnees a valider
            
        Returns:
            Tuple (valide, message)
        """
        try:
            validate(instance=data, schema=JSONService.ORDER_SCHEMA)
            return True, "JSON valide"
        except ValidationError as e:
            return False, f"Erreur de validation: {e.message}"
        except Exception as e:
            return False, f"Erreur: {str(e)}"
    
    @staticmethod
    def get_schema() -> Dict[str, Any]:
        """
        Retourne le schema JSON des commandes
        
        Returns:
            Schema JSON
        """
        return JSONService.ORDER_SCHEMA
