"""
Service de conversion et validation XML
"""
import os
from typing import Dict, Any
from lxml import etree
from dicttoxml import dicttoxml
import xmltodict
from app.config import Config

class XMLService:
    """
    Service pour la manipulation de XML
    """
    
    # Namespace pour les schemas
    NAMESPACE = {'order': 'http://canteen.com/order'}
    
    @staticmethod
    def dict_to_xml(data: Dict[str, Any], root_name: str = 'order') -> str:
        """
        Convertit un dictionnaire en XML
        
        Args:
            data: Dictionnaire a convertir
            root_name: Nom de l'element racine
            
        Returns:
            Chaine XML
        """
        # Preparation des donnees pour conversion
        xml_data = XMLService._prepare_for_xml(data)
        
        # Construction manuelle du XML pour respecter le schema
        root = etree.Element(f'{{{XMLService.NAMESPACE["order"]}}}{root_name}')
        
        if root_name == 'order':
            XMLService._build_order_xml(root, xml_data)
        elif root_name == 'orders':
            for order_data in xml_data:
                order_elem = etree.SubElement(root, f'{{{XMLService.NAMESPACE["order"]}}}order')
                XMLService._build_order_xml(order_elem, order_data)
        
        return etree.tostring(
            root,
            encoding='utf-8',
            xml_declaration=True,
            pretty_print=True
        ).decode('utf-8')
    
    @staticmethod
    def _build_order_xml(parent: etree.Element, data: Dict[str, Any]):
        """
        Construit les elements XML pour une commande
        
        Args:
            parent: Element parent
            data: Donnees de la commande
        """
        ns = XMLService.NAMESPACE['order']
        
        if 'id' in data and data['id']:
            etree.SubElement(parent, f'{{{ns}}}id').text = str(data['id'])
        
        etree.SubElement(parent, f'{{{ns}}}userId').text = str(data['userId'])
        
        # Items
        items_elem = etree.SubElement(parent, f'{{{ns}}}items')
        for item in data.get('items', []):
            item_elem = etree.SubElement(items_elem, f'{{{ns}}}item')
            
            if 'id' in item and item['id']:
                etree.SubElement(item_elem, f'{{{ns}}}id').text = str(item['id'])
            
            etree.SubElement(item_elem, f'{{{ns}}}mealId').text = str(item['mealId'])
            etree.SubElement(item_elem, f'{{{ns}}}mealName').text = item['mealName']
            etree.SubElement(item_elem, f'{{{ns}}}quantity').text = str(item['quantity'])
            etree.SubElement(item_elem, f'{{{ns}}}price').text = str(item['price'])
        
        etree.SubElement(parent, f'{{{ns}}}total').text = str(data['total'])
        etree.SubElement(parent, f'{{{ns}}}status').text = data.get('status', 'pending')
        
        if data.get('pickupTime'):
            etree.SubElement(parent, f'{{{ns}}}pickupTime').text = data['pickupTime']
        
        if data.get('createdAt'):
            etree.SubElement(parent, f'{{{ns}}}createdAt').text = data['createdAt']
    
    @staticmethod
    def _prepare_for_xml(data: Dict[str, Any]) -> Any:
        """
        Prepare les donnees pour la conversion XML
        
        Args:
            data: Donnees a preparer
            
        Returns:
            Donnees preparees
        """
        if isinstance(data, dict):
            return {k: XMLService._prepare_for_xml(v) for k, v in data.items()}
        elif isinstance(data, list):
            return [XMLService._prepare_for_xml(item) for item in data]
        else:
            return data
    
    @staticmethod
    def xml_to_dict(xml_string: str) -> Dict[str, Any]:
        """
        Convertit du XML en dictionnaire
        
        Args:
            xml_string: Chaine XML
            
        Returns:
            Dictionnaire
        """
        # Parse XML avec gestion du namespace
        parsed = xmltodict.parse(xml_string, process_namespaces=True)
        
        # Extraction des donnees en retirant les cles de namespace
        return XMLService._clean_namespace_keys(parsed)
    
    @staticmethod
    def _clean_namespace_keys(data: Any) -> Any:
        """
        Nettoie les cles de namespace du dictionnaire
        
        Args:
            data: Donnees a nettoyer
            
        Returns:
            Donnees nettoyees
        """
        if isinstance(data, dict):
            cleaned = {}
            for key, value in data.items():
                # Retire le namespace de la cle
                clean_key = key.split(':')[-1] if ':' in key else key
                cleaned[clean_key] = XMLService._clean_namespace_keys(value)
            return cleaned
        elif isinstance(data, list):
            return [XMLService._clean_namespace_keys(item) for item in data]
        else:
            return data
    
    @staticmethod
    def validate_xml(xml_string: str, schema_name: str = 'order.xsd') -> tuple[bool, str]:
        """
        Valide du XML contre un schema XSD
        
        Args:
            xml_string: Chaine XML a valider
            schema_name: Nom du fichier schema
            
        Returns:
            Tuple (valide, message)
        """
        try:
            schema_path = os.path.join(Config.XSD_DIR, schema_name)
            
            if not os.path.exists(schema_path):
                return False, f"Schema {schema_name} introuvable"
            
            # Chargement du schema
            with open(schema_path, 'rb') as schema_file:
                schema_root = etree.XML(schema_file.read())
                schema = etree.XMLSchema(schema_root)
            
            # Parse et validation du XML
            xml_doc = etree.fromstring(xml_string.encode('utf-8'))
            schema.assertValid(xml_doc)
            
            return True, "XML valide"
            
        except etree.DocumentInvalid as e:
            return False, f"XML invalide: {str(e)}"
        except etree.XMLSyntaxError as e:
            return False, f"Erreur de syntaxe XML: {str(e)}"
        except Exception as e:
            return False, f"Erreur de validation: {str(e)}"
