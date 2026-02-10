"""
Initialisation de l'application Flask
"""
from flask import Flask
from flask_cors import CORS
from app.config import Config

def create_app(config_class=Config):
    """
    Fabrique d'application Flask
    """
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Configuration CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Accept", "Authorization"]
        }
    })
    
    # Enregistrement des blueprints
    from app.routes.orders import orders_bp
    from app.routes.queue import queue_bp
    from app.routes.converter import converter_bp
    from app.routes.validator import validator_bp
    from app.routes.recommendations import recommendations_bp
    
    app.register_blueprint(orders_bp)
    app.register_blueprint(queue_bp)
    app.register_blueprint(converter_bp)
    app.register_blueprint(validator_bp)
    app.register_blueprint(recommendations_bp)
    
    @app.route('/health')
    def health():
        """Point de terminaison de verification de sante"""
        return {'status': 'healthy', 'service': 'orders-python'}, 200
    
    return app
