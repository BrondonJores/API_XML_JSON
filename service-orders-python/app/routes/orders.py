"""
Module de routes pour la gestion des commandes
"""

from flask import Blueprint, request, Response
import logging
from app.services.order_service import OrderService
from app.services.queue_service import QueueService
from app.services.xml_service import XMLService
from app.services.json_service import JSONService

logger = logging.getLogger(__name__)

bp = Blueprint('orders', __name__, url_prefix='/api')


@bp.route('/orders', methods=['POST'])
def create_order():
    """
    Cree une nouvelle commande et l'ajoute a la file d'attente
    """
    try:
        content_type = request.content_type
        accept_header = request.headers.get('Accept', 'application/json')
        
        if 'application/xml' in content_type or 'text/xml' in content_type:
            xml_data = request.data.decode('utf-8')
            order_data = XMLService.xml_to_dict(xml_data)
            if 'order' in order_data:
                order_data = order_data['order']
        else:
            order_data = request.get_json()
        
        created_order = OrderService.create_order(order_data)
        queue_info = QueueService.add_to_queue(created_order['order_id'])
        
        response_data = {
            'order': created_order,
            'queue': queue_info
        }
        
        if 'application/xml' in accept_header or 'text/xml' in accept_header:
            xml_response = XMLService.dict_to_xml(response_data, 'response')
            return Response(xml_response, mimetype='application/xml', status=201)
        else:
            return response_data, 201
            
    except Exception as e:
        logger.error(f"Erreur lors de la creation de la commande: {e}")
        return {'error': str(e)}, 400


@bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """
    Recupere une commande specifique par son ID
    """
    try:
        accept_header = request.headers.get('Accept', 'application/json')
        
        order = OrderService.get_order_by_id(order_id)
        
        if not order:
            return {'error': 'Commande non trouvee'}, 404
        
        if 'application/xml' in accept_header or 'text/xml' in accept_header:
            xml_response = XMLService.dict_to_xml({'order': order}, 'response')
            return Response(xml_response, mimetype='application/xml')
        else:
            return {'order': order}, 200
            
    except Exception as e:
        logger.error(f"Erreur lors de la recuperation de la commande: {e}")
        return {'error': str(e)}, 400


@bp.route('/orders/user/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    """
    Recupere toutes les commandes d'un utilisateur
    """
    try:
        accept_header = request.headers.get('Accept', 'application/json')
        
        orders = OrderService.get_user_orders(user_id)
        
        if 'application/xml' in accept_header or 'text/xml' in accept_header:
            xml_response = XMLService.dict_to_xml({'orders': orders}, 'response')
            return Response(xml_response, mimetype='application/xml')
        else:
            return {'orders': orders}, 200
            
    except Exception as e:
        logger.error(f"Erreur lors de la recuperation des commandes de l'utilisateur: {e}")
        return {'error': str(e)}, 400


@bp.route('/orders', methods=['GET'])
def get_all_orders():
    """
    Recupere toutes les commandes (fonction admin)
    """
    try:
        accept_header = request.headers.get('Accept', 'application/json')
        
        orders = OrderService.get_all_orders()
        
        if 'application/xml' in accept_header or 'text/xml' in accept_header:
            xml_response = XMLService.dict_to_xml({'orders': orders}, 'response')
            return Response(xml_response, mimetype='application/xml')
        else:
            return {'orders': orders}, 200
            
    except Exception as e:
        logger.error(f"Erreur lors de la recuperation des commandes: {e}")
        return {'error': str(e)}, 400
