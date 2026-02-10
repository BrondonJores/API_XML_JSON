import xmltodict
from lxml import etree
import os

class XMLService:
    """Service de gestion des opérations XML"""
    
    def __init__(self):
        self.xsd_path = os.path.join(os.path.dirname(__file__), '..', '..', 'schemas', 'order.xsd')
    
    def xml_to_json(self, xml_string):
        """Convertit XML en JSON (dictionnaire Python)"""
        try:
            json_data = xmltodict.parse(xml_string)
            return json_data
        except Exception as e:
            raise ValueError(f"Erreur lors de la conversion XML vers JSON: {str(e)}")
    
    def validate_order_xml(self, xml_string):
        """Valide un XML de commande contre le schéma XSD"""
        try:
            # Parse le XML
            xml_doc = etree.fromstring(xml_string.encode('utf-8'))
            
            # Vérifie si le fichier XSD existe
            if not os.path.exists(self.xsd_path):
                # Crée un schéma XSD basique si absent
                self._create_default_xsd()
            
            # Charge et parse le schéma XSD
            with open(self.xsd_path, 'r') as xsd_file:
                xsd_doc = etree.parse(xsd_file)
                xsd_schema = etree.XMLSchema(xsd_doc)
            
            # Valide le XML
            is_valid = xsd_schema.validate(xml_doc)
            
            if is_valid:
                return True, "XML valide"
            else:
                errors = []
                for error in xsd_schema.error_log:
                    errors.append(f"Ligne {error.line}: {error.message}")
                return False, "; ".join(errors)
                
        except etree.XMLSyntaxError as e:
            return False, f"Erreur de syntaxe XML: {str(e)}"
        except Exception as e:
            return False, f"Erreur de validation: {str(e)}"
    
    def _create_default_xsd(self):
        """Crée un schéma XSD par défaut pour les commandes"""
        xsd_content = """<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="order">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="id" type="xs:integer" minOccurs="0"/>
                <xs:element name="user_id" type="xs:integer"/>
                <xs:element name="status" type="xs:string" minOccurs="0"/>
                <xs:element name="total_price" type="xs:decimal" minOccurs="0"/>
                <xs:element name="items">
                    <xs:complexType>
                        <xs:sequence>
                            <xs:element name="item" maxOccurs="unbounded">
                                <xs:complexType>
                                    <xs:sequence>
                                        <xs:element name="menu_item_id" type="xs:integer"/>
                                        <xs:element name="quantity" type="xs:integer"/>
                                        <xs:element name="price" type="xs:decimal"/>
                                    </xs:sequence>
                                </xs:complexType>
                            </xs:element>
                        </xs:sequence>
                    </xs:complexType>
                </xs:element>
                <xs:element name="created_at" type="xs:string" minOccurs="0"/>
                <xs:element name="updated_at" type="xs:string" minOccurs="0"/>
            </xs:sequence>
        </xs:complexType>
    </xs:element>
</xs:schema>"""
        
        os.makedirs(os.path.dirname(self.xsd_path), exist_ok=True)
        with open(self.xsd_path, 'w') as f:
            f.write(xsd_content)
