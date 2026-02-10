from flask import Blueprint, request, jsonify
from app.services.queue_service import QueueService

queue_bp = Blueprint('queue', __name__)
queue_service = QueueService()

@queue_bp.route('/queue/<int:user_id>', methods=['GET'])
def get_queue_position(user_id):
    """Récupère la position d'un utilisateur dans la file d'attente"""
    try:
        queue_entry = queue_service.get_queue_position(user_id)
        if not queue_entry:
            return jsonify({'error': 'Utilisateur non trouvé dans la file d\'attente'}), 404
        return jsonify(queue_entry.to_dict()), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@queue_bp.route('/queue/status', methods=['GET'])
def get_queue_status():
    """Récupère l'état global de la file d'attente"""
    try:
        status = queue_service.get_queue_status()
        return jsonify(status), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
