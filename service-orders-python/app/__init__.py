from flask import Flask
from flask_cors import CORS
from app.config import Config
from app.database import Database

def create_app():
    """Factory pour créer et configurer l'application Flask"""
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Active CORS pour permettre les requêtes cross-origin
    CORS(app)
    
    # Initialise la base de données
    with app.app_context():
        try:
            Database.init_database()
        except Exception as e:
            app.logger.error(f"Erreur lors de l'initialisation de la base de données: {e}")
    
    # Enregistre les blueprints
    from app.routes.orders import orders_bp
    from app.routes.queue import queue_bp
    from app.routes.converter import converter_bp
    from app.routes.validator import validator_bp
    from app.routes.recommendations import recommendations_bp
    
    app.register_blueprint(orders_bp, url_prefix='/api')
    app.register_blueprint(queue_bp, url_prefix='/api')
    app.register_blueprint(converter_bp, url_prefix='/api')
    app.register_blueprint(validator_bp, url_prefix='/api')
    app.register_blueprint(recommendations_bp, url_prefix='/api')
    
    # Route de santé
    @app.route('/api/health', methods=['GET'])
    def health_check():
        """Endpoint de vérification de santé du service"""
        return {
            'status': 'healthy',
            'service': 'orders-service',
            'version': '1.0.0'
        }, 200
    
    return app
