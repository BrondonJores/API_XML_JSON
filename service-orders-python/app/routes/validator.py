"""
Routes pour la validation XML/JSON
"""
from flask import Blueprint, request, jsonify
from app.services.xml_service import XMLService
from app.services.json_service import JSONService

validator_bp = Blueprint('validator', __name__, url_prefix='/api/validate')

@validator_bp.route('/order-xml', methods=['POST'])
def validate_order_xml():
    """
    Valide du XML de commande contre le schema XSD
    """
    try:
        xml_data = request.data.decode('utf-8')
        
        if not xml_data:
            return jsonify({'error': 'Le corps de la requete est vide'}), 400
        
        # Validation
        is_valid, message = XMLService.validate_xml(xml_data, 'order.xsd')
        
        return jsonify({
            'valid': is_valid,
            'message': message
        }), 200 if is_valid else 400
        
    except Exception as e:
        return jsonify({
            'valid': False,
            'message': f'Erreur de validation: {str(e)}'
        }), 500

@validator_bp.route('/order-json', methods=['POST'])
def validate_order_json():
    """
    Valide du JSON de commande contre le schema JSON
    """
    try:
        json_data = request.get_json()
        
        if not json_data:
            return jsonify({'error': 'Le corps de la requete est vide'}), 400
        
        # Validation
        is_valid, message = JSONService.validate_order(json_data)
        
        return jsonify({
            'valid': is_valid,
            'message': message
        }), 200 if is_valid else 400
        
    except Exception as e:
        return jsonify({
            'valid': False,
            'message': f'Erreur de validation: {str(e)}'
        }), 500

@validator_bp.route('/json-schema', methods=['GET'])
def get_json_schema():
    """
    Retourne le schema JSON des commandes
    """
    try:
        schema = JSONService.get_schema()
        return jsonify(schema)
    except Exception as e:
        return jsonify({'error': f'Erreur: {str(e)}'}), 500
