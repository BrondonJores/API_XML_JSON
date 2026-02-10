"""
Routes pour les recommandations
"""
from flask import Blueprint, jsonify
from app.services.recommendation_service import RecommendationService

recommendations_bp = Blueprint('recommendations', __name__, url_prefix='/api/recommendations')

@recommendations_bp.route('/<int:user_id>', methods=['GET'])
def get_recommendations(user_id):
    """
    Recupere les recommandations pour un utilisateur
    """
    try:
        # Recommandations basees sur l'historique
        recommendations = RecommendationService.get_recommendations(user_id)
        
        # Recommandations basees sur les utilisateurs similaires
        similar_recommendations = RecommendationService.get_similar_users_recommendations(user_id)
        
        # Fusion des recommandations
        all_recommendations = recommendations + similar_recommendations
        
        # Tri par score et limitation
        all_recommendations.sort(key=lambda x: x['score'], reverse=True)
        all_recommendations = all_recommendations[:10]
        
        return jsonify({
            'userId': user_id,
            'recommendations': all_recommendations
        })
        
    except Exception as e:
        return jsonify({'error': f'Erreur lors de la recuperation: {str(e)}'}), 500
