from flask import Blueprint, request, jsonify
from app.services.xml_service import XMLService
from app.services.json_service import JSONService

validator_bp = Blueprint('validator', __name__)
xml_service = XMLService()
json_service = JSONService()

@validator_bp.route('/validate/order-xml', methods=['POST'])
def validate_order_xml():
    """Valide un XML de commande contre le schéma XSD"""
    try:
        content_type = request.content_type
        
        if 'application/xml' in content_type or 'text/xml' in content_type:
            xml_data = request.data.decode('utf-8')
        else:
            data = request.get_json()
            xml_data = data.get('xml') if data else None
        
        if not xml_data:
            return jsonify({'error': 'Données XML manquantes'}), 400
        
        is_valid, message = xml_service.validate_order_xml(xml_data)
        
        if is_valid:
            return jsonify({
                'valid': True,
                'message': 'XML valide selon le schéma XSD'
            }), 200
        else:
            return jsonify({
                'valid': False,
                'message': message
            }), 400
            
    except Exception as e:
        return jsonify({
            'valid': False,
            'error': str(e)
        }), 400

@validator_bp.route('/validate/order-json', methods=['POST'])
def validate_order_json():
    """Valide un JSON de commande contre le JSON Schema"""
    try:
        json_data = request.get_json()
        if not json_data:
            return jsonify({'error': 'Données JSON manquantes'}), 400
        
        is_valid, message = json_service.validate_order_json(json_data)
        
        if is_valid:
            return jsonify({
                'valid': True,
                'message': 'JSON valide selon le schéma'
            }), 200
        else:
            return jsonify({
                'valid': False,
                'message': message
            }), 400
            
    except Exception as e:
        return jsonify({
            'valid': False,
            'error': str(e)
        }), 400
