"""
Initialisation de l'application Flask avec configuration de securite
"""
from flask import Flask
from flask_cors import CORS
from flask_talisman import Talisman
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from app.config import Config

def create_app(config_class=Config):
    """
    Fabrique d'application Flask avec securite renforcee
    """
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Configuration CORS securisee - Origines specifiques uniquement
    CORS(app, resources={
        r"/api/*": {
            "origins": [
                "http://localhost:3000",
                "http://localhost:8003",
                "http://127.0.0.1:3000",
                "http://127.0.0.1:8003"
            ],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Accept", "Authorization"],
            "supports_credentials": True
        }
    })
    
    # Configuration des headers de securite avec Talisman
    # Desactive en developpement, activer en production
    if app.config.get('ENV') == 'production':
        Talisman(app,
            force_https=False,  # Activer en production avec HTTPS
            strict_transport_security=True,
            strict_transport_security_max_age=31536000,
            content_security_policy={
                'default-src': "'self'"
            },
            content_security_policy_nonce_in=['script-src'],
            frame_options='DENY',
            content_type_options=True
        )
    
    # Configuration du rate limiting
    limiter = Limiter(
        app=app,
        key_func=get_remote_address,
        default_limits=["200 per day", "50 per hour"],
        storage_uri="memory://"
    )
    
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
