from flask import Blueprint, request, jsonify
from app.services.xml_service import XMLService
from app.services.json_service import JSONService

converter_bp = Blueprint('converter', __name__)
xml_service = XMLService()
json_service = JSONService()

@converter_bp.route('/convert/xml-to-json', methods=['POST'])
def convert_xml_to_json():
    """Convertit XML en JSON"""
    try:
        content_type = request.content_type
        
        if 'application/xml' in content_type or 'text/xml' in content_type:
            xml_data = request.data.decode('utf-8')
        else:
            data = request.get_json()
            xml_data = data.get('xml') if data else None
        
        if not xml_data:
            return jsonify({'error': 'Données XML manquantes'}), 400
        
        json_data = xml_service.xml_to_json(xml_data)
        return jsonify(json_data), 200
        
    except Exception as e:
        return jsonify({'error': f'Erreur de conversion: {str(e)}'}), 400

@converter_bp.route('/convert/json-to-xml', methods=['POST'])
def convert_json_to_xml():
    """Convertit JSON en XML"""
    try:
        json_data = request.get_json()
        if not json_data:
            return jsonify({'error': 'Données JSON manquantes'}), 400
        
        xml_data = json_service.json_to_xml(json_data)
        return xml_data, 200, {'Content-Type': 'application/xml'}
        
    except Exception as e:
        return jsonify({'error': f'Erreur de conversion: {str(e)}'}), 400
