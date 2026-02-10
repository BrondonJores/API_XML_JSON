"""
Module de routes pour la gestion de la file d'attente
"""

from flask import Blueprint, request, Response
import logging
from app.services.queue_service import QueueService
from app.services.xml_service import XMLService

logger = logging.getLogger(__name__)

bp = Blueprint('queue', __name__, url_prefix='/api')


@bp.route('/queue/<int:user_id>', methods=['GET'])
def get_user_queue_position(user_id):
    """
    Recupere la position dans la file d'attente d'un utilisateur
    """
    try:
        accept_header = request.headers.get('Accept', 'application/json')
        
        queue_info = QueueService.get_user_queue_position(user_id)
        
        if not queue_info:
            return {'message': 'Aucune commande en attente pour cet utilisateur'}, 404
        
        if 'application/xml' in accept_header or 'text/xml' in accept_header:
            xml_response = XMLService.dict_to_xml({'queue': queue_info}, 'response')
            return Response(xml_response, mimetype='application/xml')
        else:
            return {'queue': queue_info}, 200
            
    except Exception as e:
        logger.error(f"Erreur lors de la recuperation de la position: {e}")
        return {'error': str(e)}, 400


@bp.route('/queue/status', methods=['GET'])
def get_queue_status():
    """
    Recupere l'etat complet de la file d'attente
    """
    try:
        accept_header = request.headers.get('Accept', 'application/json')
        
        queue_items = QueueService.get_queue_status()
        
        response_data = {
            'total_waiting': len(queue_items),
            'queue': queue_items
        }
        
        if 'application/xml' in accept_header or 'text/xml' in accept_header:
            xml_response = XMLService.dict_to_xml(response_data, 'response')
            return Response(xml_response, mimetype='application/xml')
        else:
            return response_data, 200
            
    except Exception as e:
        logger.error(f"Erreur lors de la recuperation de l'etat de la file: {e}")
        return {'error': str(e)}, 400
