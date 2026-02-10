"""
Routes pour la gestion des commandes
"""
from flask import Blueprint, request, jsonify, Response
from app.services.order_service import OrderService
from app.services.queue_service import QueueService
from app.services.xml_service import XMLService
from app.models.order import Order
from datetime import datetime

orders_bp = Blueprint('orders', __name__, url_prefix='/api/orders')

def get_accept_format():
    """Determine le format de reponse base sur l'en-tete Accept"""
    accept = request.headers.get('Accept', 'application/json')
    if 'application/xml' in accept:
        return 'xml'
    return 'json'

@orders_bp.route('', methods=['POST'])
def create_order():
    """
    Cree une nouvelle commande
    """
    try:
        content_type = request.headers.get('Content-Type', 'application/json')
        
        # Parse des donnees selon le format
        if 'application/xml' in content_type:
            xml_data = request.data.decode('utf-8')
            data = XMLService.xml_to_dict(xml_data)
            if 'order' in data:
                data = data['order']
        else:
            data = request.get_json()
        
        # Creation de l'objet Order
        order = Order.from_dict(data)
        
        # Validation basique
        if not order.items or len(order.items) == 0:
            return jsonify({'error': 'La commande doit contenir au moins un article'}), 400
        
        # Sauvegarde dans la base de donnees
        created_order = OrderService.create_order(order)
        
        # Ajout a la file d'attente
        QueueService.add_to_queue(created_order.id, created_order.user_id)
        
        # Format de reponse
        if get_accept_format() == 'xml':
            xml_response = XMLService.dict_to_xml(created_order.to_dict())
            return Response(xml_response, mimetype='application/xml'), 201
        
        return jsonify(created_order.to_dict()), 201
        
    except KeyError as e:
        return jsonify({'error': f'Champ manquant: {str(e)}'}), 400
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la creation: {str(e)}'}), 500

@orders_bp.route('', methods=['GET'])
def get_all_orders():
    """
    Recupere toutes les commandes
    """
    try:
        limit = int(request.args.get('limit', 100))
        offset = int(request.args.get('offset', 0))
        
        orders = OrderService.get_all_orders(limit, offset)
        orders_data = [order.to_dict() for order in orders]
        
        if get_accept_format() == 'xml':
            xml_response = XMLService.dict_to_xml(orders_data, root_name='orders')
            return Response(xml_response, mimetype='application/xml')
        
        return jsonify(orders_data)
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la recuperation: {str(e)}'}), 500

@orders_bp.route('/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """
    Recupere une commande par son ID
    """
    try:
        order = OrderService.get_order_by_id(order_id)
        
        if not order:
            return jsonify({'error': 'Commande non trouvee'}), 404
        
        if get_accept_format() == 'xml':
            xml_response = XMLService.dict_to_xml(order.to_dict())
            return Response(xml_response, mimetype='application/xml')
        
        return jsonify(order.to_dict())
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la recuperation: {str(e)}'}), 500

@orders_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    """
    Recupere toutes les commandes d'un utilisateur
    """
    try:
        orders = OrderService.get_orders_by_user(user_id)
        orders_data = [order.to_dict() for order in orders]
        
        if get_accept_format() == 'xml':
            xml_response = XMLService.dict_to_xml(orders_data, root_name='orders')
            return Response(xml_response, mimetype='application/xml')
        
        return jsonify(orders_data)
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la recuperation: {str(e)}'}), 500

@orders_bp.route('/<int:order_id>', methods=['PUT'])
def update_order_status(order_id):
    """
    Met a jour le statut d'une commande
    """
    try:
        data = request.get_json()
        
        if 'status' not in data:
            return jsonify({'error': 'Le champ status est requis'}), 400
        
        status = data['status']
        valid_statuses = ['pending', 'preparing', 'ready', 'completed', 'cancelled']
        
        if status not in valid_statuses:
            return jsonify({'error': f'Statut invalide. Valeurs possibles: {valid_statuses}'}), 400
        
        success = OrderService.update_order_status(order_id, status)
        
        if not success:
            return jsonify({'error': 'Commande non trouvee'}), 404
        
        # Mise a jour de la queue
        QueueService.update_queue_status(order_id, status)
        
        return jsonify({'message': 'Statut mis a jour avec succes'})
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la mise a jour: {str(e)}'}), 500

@orders_bp.route('/<int:order_id>', methods=['DELETE'])
def delete_order(order_id):
    """
    Supprime une commande
    """
    try:
        success = OrderService.delete_order(order_id)
        
        if not success:
            return jsonify({'error': 'Commande non trouvee'}), 404
        
        return jsonify({'message': 'Commande supprimee avec succes'})
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la suppression: {str(e)}'}), 500
