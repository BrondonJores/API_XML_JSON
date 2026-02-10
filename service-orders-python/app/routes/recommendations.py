"""
Module de routes pour les recommandations de repas
"""

from flask import Blueprint
import logging
from app.services.recommendation_service import RecommendationService

logger = logging.getLogger(__name__)

bp = Blueprint('recommendations', __name__, url_prefix='/api')


@bp.route('/recommendations/<int:user_id>', methods=['GET'])
def get_recommendations(user_id):
    """
    Recupere les recommandations de repas pour un utilisateur
    """
    try:
        recommendations = RecommendationService.get_recommendations(user_id)
        
        return {
            'user_id': user_id,
            'recommendations': recommendations
        }, 200
        
    except Exception as e:
        logger.error(f"Erreur lors de la recuperation des recommandations: {e}")
        return {'error': str(e)}, 400
