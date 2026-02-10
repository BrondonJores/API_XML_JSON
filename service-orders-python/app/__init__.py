"""
Module d'initialisation de l'application Flask pour le service de commandes
"""

from flask import Flask
from flask_cors import CORS
from app.config import Config


def create_app(config_class=Config):
    """
    Factory pour creer et configurer l'application Flask
    
    Args:
        config_class: Classe de configuration a utiliser
        
    Returns:
        Application Flask configuree
    """
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Configuration CORS pour permettre les requetes cross-origin
    CORS(app)
    
    # Enregistrement des blueprints (routes)
    from app.routes import orders, queue, health, converter, validator, recommendations, transform
    
    app.register_blueprint(orders.bp)
    app.register_blueprint(queue.bp)
    app.register_blueprint(health.bp)
    app.register_blueprint(converter.bp)
    app.register_blueprint(validator.bp)
    app.register_blueprint(recommendations.bp)
    app.register_blueprint(transform.bp)
    
    return app
