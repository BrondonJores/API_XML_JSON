"""
Routes pour la gestion de la file d'attente
"""
from flask import Blueprint, jsonify
from app.services.queue_service import QueueService

queue_bp = Blueprint('queue', __name__, url_prefix='/api/queue')

@queue_bp.route('/user/<int:user_id>', methods=['GET'])
def get_user_queue_position(user_id):
    """
    Recupere la position dans la file d'attente pour un utilisateur
    """
    try:
        queue_entry = QueueService.get_user_queue_position(user_id)
        
        if not queue_entry:
            return jsonify({'message': 'Aucune commande en attente'}), 404
        
        return jsonify(queue_entry.to_dict())
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la recuperation: {str(e)}'}), 500

@queue_bp.route('/status', methods=['GET'])
def get_queue_status():
    """
    Recupere le statut global de la file d'attente
    """
    try:
        status = QueueService.get_queue_status()
        return jsonify(status)
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la recuperation: {str(e)}'}), 500
