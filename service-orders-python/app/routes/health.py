"""
Module de routes pour les verifications de sante du service
"""

from flask import Blueprint, jsonify

bp = Blueprint('health', __name__)


@bp.route('/health', methods=['GET'])
def health_check():
    """
    Endpoint de verification de sante du service
    """
    return jsonify({
        'status': 'healthy',
        'service': 'orders-python'
    }), 200


@bp.route('/', methods=['GET'])
def root():
    """
    Route racine du service
    """
    return jsonify({
        'service': 'Orders & Queue Service',
        'version': '1.0.0',
        'endpoints': {
            'orders': '/api/orders',
            'queue': '/api/queue',
            'health': '/health'
        }
    }), 200
