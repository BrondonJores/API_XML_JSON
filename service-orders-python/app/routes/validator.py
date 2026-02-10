"""
Module de routes pour la validation de XML et JSON
"""

from flask import Blueprint, request, current_app
import logging
import os
from app.services.xml_service import XMLService
from app.services.json_service import JSONService

logger = logging.getLogger(__name__)

bp = Blueprint('validator', __name__, url_prefix='/api')


@bp.route('/validate/order-xml', methods=['POST'])
def validate_order_xml():
    """
    Valide un XML de commande contre le schema XSD
    """
    try:
        xml_data = request.data.decode('utf-8')
        
        xsd_path = os.path.join(current_app.root_path, '..', 'schemas', 'order.xsd')
        xsd_path = os.path.abspath(xsd_path)
        
        is_valid = XMLService.validate_xml(xml_data, xsd_path)
        
        return {
            'valid': is_valid,
            'message': 'XML valide' if is_valid else 'XML invalide selon le schema'
        }, 200
        
    except Exception as e:
        logger.error(f"Erreur lors de la validation XML: {e}")
        return {
            'valid': False,
            'error': str(e)
        }, 400


@bp.route('/validate/order-json', methods=['POST'])
def validate_order_json():
    """
    Valide un JSON de commande contre le schema JSON
    """
    try:
        json_data = request.data.decode('utf-8')
        
        schema_path = os.path.join(current_app.root_path, '..', 'schemas', 'order.schema.json')
        schema_path = os.path.abspath(schema_path)
        
        is_valid = JSONService.validate_json(json_data, schema_path)
        
        return {
            'valid': is_valid,
            'message': 'JSON valide' if is_valid else 'JSON invalide selon le schema'
        }, 200
        
    except Exception as e:
        logger.error(f"Erreur lors de la validation JSON: {e}")
        return {
            'valid': False,
            'error': str(e)
        }, 400
