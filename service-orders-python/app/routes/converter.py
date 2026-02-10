"""
Routes pour la conversion XML/JSON
"""
from flask import Blueprint, request, jsonify, Response
from app.services.xml_service import XMLService

converter_bp = Blueprint('converter', __name__, url_prefix='/api/convert')

@converter_bp.route('/xml-to-json', methods=['POST'])
def xml_to_json():
    """
    Convertit du XML en JSON
    """
    try:
        xml_data = request.data.decode('utf-8')
        
        if not xml_data:
            return jsonify({'error': 'Le corps de la requete est vide'}), 400
        
        # Conversion
        json_data = XMLService.xml_to_dict(xml_data)
        
        return jsonify(json_data)
        
    except Exception as e:
        return jsonify({'error': f'Erreur de conversion: {str(e)}'}), 400

@converter_bp.route('/json-to-xml', methods=['POST'])
def json_to_xml():
    """
    Convertit du JSON en XML
    """
    try:
        json_data = request.get_json()
        
        if not json_data:
            return jsonify({'error': 'Le corps de la requete est vide'}), 400
        
        # Determination du nom de racine
        root_name = 'order'
        if isinstance(json_data, list):
            root_name = 'orders'
            json_data = json_data
        elif 'orders' in json_data:
            root_name = 'orders'
            json_data = json_data['orders']
        elif 'order' in json_data:
            json_data = json_data['order']
        
        # Conversion
        xml_data = XMLService.dict_to_xml(json_data, root_name)
        
        return Response(xml_data, mimetype='application/xml')
        
    except Exception as e:
        return jsonify({'error': f'Erreur de conversion: {str(e)}'}), 400
