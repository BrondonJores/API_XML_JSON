"""
Module de routes pour la conversion entre XML et JSON
"""

from flask import Blueprint, request, Response
import logging
from app.services.xml_service import XMLService
from app.services.json_service import JSONService

logger = logging.getLogger(__name__)

bp = Blueprint('converter', __name__, url_prefix='/api')


@bp.route('/convert/xml-to-json', methods=['POST'])
def xml_to_json():
    """
    Convertit du XML en JSON
    """
    try:
        xml_data = request.data.decode('utf-8')
        
        data_dict = XMLService.xml_to_dict(xml_data)
        
        json_response = JSONService.to_json(data_dict)
        
        return Response(json_response, mimetype='application/json', status=200)
        
    except Exception as e:
        logger.error(f"Erreur lors de la conversion XML vers JSON: {e}")
        return {'error': str(e)}, 400


@bp.route('/convert/json-to-xml', methods=['POST'])
def json_to_xml():
    """
    Convertit du JSON en XML
    """
    try:
        json_data = request.data.decode('utf-8')
        
        data_dict = JSONService.from_json(json_data)
        
        root_name = request.args.get('root', 'root')
        xml_response = XMLService.dict_to_xml(data_dict, root_name)
        
        return Response(xml_response, mimetype='application/xml', status=200)
        
    except Exception as e:
        logger.error(f"Erreur lors de la conversion JSON vers XML: {e}")
        return {'error': str(e)}, 400
