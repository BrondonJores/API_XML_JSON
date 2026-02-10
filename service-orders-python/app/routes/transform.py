"""
Module de routes pour les transformations XSLT
"""

from flask import Blueprint, request, Response, current_app
import logging
import os
from app.services.xslt_service import XSLTService

logger = logging.getLogger(__name__)

bp = Blueprint('transform', __name__, url_prefix='/api')


@bp.route('/transform/order-to-invoice', methods=['POST'])
def order_to_invoice():
    """
    Transforme un XML de commande en facture HTML via XSLT
    """
    try:
        xml_data = request.data.decode('utf-8')
        
        xslt_path = os.path.join(current_app.root_path, '..', 'xslt', 'order-to-invoice.xslt')
        xslt_path = os.path.abspath(xslt_path)
        
        html_result = XSLTService.transform(xml_data, xslt_path)
        
        return Response(html_result, mimetype='text/html', status=200)
        
    except Exception as e:
        logger.error(f"Erreur lors de la transformation commande vers facture: {e}")
        return {'error': str(e)}, 400


@bp.route('/transform/orders-to-stats', methods=['POST'])
def orders_to_stats():
    """
    Transforme un XML de commandes en statistiques HTML via XSLT
    """
    try:
        xml_data = request.data.decode('utf-8')
        
        xslt_path = os.path.join(current_app.root_path, '..', 'xslt', 'orders-to-stats.xslt')
        xslt_path = os.path.abspath(xslt_path)
        
        html_result = XSLTService.transform(xml_data, xslt_path)
        
        return Response(html_result, mimetype='text/html', status=200)
        
    except Exception as e:
        logger.error(f"Erreur lors de la transformation commandes vers statistiques: {e}")
        return {'error': str(e)}, 400
