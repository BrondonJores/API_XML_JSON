from flask import Blueprint, request, jsonify
from app.services.order_service import OrderService

orders_bp = Blueprint('orders', __name__)
order_service = OrderService()

@orders_bp.route('/orders', methods=['POST'])
def create_order():
    """Crée une nouvelle commande"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'Données manquantes'}), 400
        
        user_id = data.get('user_id')
        items = data.get('items', [])
        
        if not user_id:
            return jsonify({'error': 'user_id est requis'}), 400
        if not items:
            return jsonify({'error': 'items ne peut pas être vide'}), 400
        
        order = order_service.create_order(user_id, items)
        return jsonify(order.to_dict()), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/<int:order_id>', methods=['GET'])
def get_order(order_id):
    """Récupère une commande par son ID"""
    try:
        order = order_service.get_order_by_id(order_id)
        if not order:
            return jsonify({'error': 'Commande non trouvée'}), 404
        return jsonify(order.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders/user/<int:user_id>', methods=['GET'])
def get_user_orders(user_id):
    """Récupère l'historique des commandes d'un utilisateur"""
    try:
        orders = order_service.get_orders_by_user(user_id)
        return jsonify([order.to_dict() for order in orders]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@orders_bp.route('/orders', methods=['GET'])
def get_all_orders():
    """Récupère toutes les commandes (admin)"""
    try:
        status = request.args.get('status')
        limit = request.args.get('limit', type=int)
        
        orders = order_service.get_all_orders(status=status, limit=limit)
        return jsonify([order.to_dict() for order in orders]), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
