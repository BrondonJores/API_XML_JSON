import json
import jsonschema
from dicttoxml import dicttoxml

class JSONService:
    """Service de gestion des opérations JSON"""
    
    def __init__(self):
        self.order_schema = {
            "$schema": "http://json-schema.org/draft-07/schema#",
            "type": "object",
            "properties": {
                "id": {"type": "integer"},
                "user_id": {"type": "integer"},
                "status": {"type": "string"},
                "total_price": {"type": "number"},
                "items": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "menu_item_id": {"type": "integer"},
                            "quantity": {"type": "integer", "minimum": 1},
                            "price": {"type": "number", "minimum": 0}
                        },
                        "required": ["menu_item_id", "quantity", "price"]
                    }
                },
                "created_at": {"type": "string"},
                "updated_at": {"type": "string"}
            },
            "required": ["user_id", "items"]
        }
    
    def json_to_xml(self, json_data, root_name='order'):
        """Convertit JSON (dictionnaire) en XML"""
        try:
            xml_bytes = dicttoxml(json_data, custom_root=root_name, attr_type=False)
            return xml_bytes.decode('utf-8')
        except Exception as e:
            raise ValueError(f"Erreur lors de la conversion JSON vers XML: {str(e)}")
    
    def validate_order_json(self, json_data):
        """Valide un JSON de commande contre le schéma JSON Schema"""
        try:
            jsonschema.validate(instance=json_data, schema=self.order_schema)
            return True, "JSON valide"
        except jsonschema.ValidationError as e:
            return False, f"Erreur de validation: {e.message}"
        except jsonschema.SchemaError as e:
            return False, f"Erreur de schéma: {e.message}"
        except Exception as e:
            return False, f"Erreur: {str(e)}"
