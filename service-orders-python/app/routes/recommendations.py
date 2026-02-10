from flask import Blueprint, request, jsonify
from app.services.recommendation_service import RecommendationService
from app.services.xslt_service import XSLTService

recommendations_bp = Blueprint('recommendations', __name__)
recommendation_service = RecommendationService()
xslt_service = XSLTService()

@recommendations_bp.route('/recommendations/<int:user_id>', methods=['GET'])
def get_recommendations(user_id):
    """Récupère les recommandations pour un utilisateur"""
    try:
        recommendations = recommendation_service.get_recommendations(user_id)
        return jsonify(recommendations), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@recommendations_bp.route('/transform/order-to-invoice', methods=['POST'])
def transform_order_to_invoice():
    """Transforme une commande XML en facture XML via XSLT"""
    try:
        content_type = request.content_type
        
        if 'application/xml' in content_type or 'text/xml' in content_type:
            xml_data = request.data.decode('utf-8')
        else:
            data = request.get_json()
            xml_data = data.get('xml') if data else None
        
        if not xml_data:
            return jsonify({'error': 'Données XML de commande manquantes'}), 400
        
        invoice_xml = xslt_service.transform_order_to_invoice(xml_data)
        return invoice_xml, 200, {'Content-Type': 'application/xml'}
        
    except Exception as e:
        return jsonify({'error': f'Erreur de transformation: {str(e)}'}), 400

@recommendations_bp.route('/transform/orders-to-stats', methods=['POST'])
def transform_orders_to_stats():
    """Transforme plusieurs commandes XML en statistiques via XSLT"""
    try:
        content_type = request.content_type
        
        if 'application/xml' in content_type or 'text/xml' in content_type:
            xml_data = request.data.decode('utf-8')
        else:
            data = request.get_json()
            xml_data = data.get('xml') if data else None
        
        if not xml_data:
            return jsonify({'error': 'Données XML de commandes manquantes'}), 400
        
        stats_xml = xslt_service.transform_orders_to_stats(xml_data)
        return stats_xml, 200, {'Content-Type': 'application/xml'}
        
    except Exception as e:
        return jsonify({'error': f'Erreur de transformation: {str(e)}'}), 400
