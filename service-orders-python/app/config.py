"""
Configuration de l'application avec securite renforcee
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """
    Classe de configuration centralisee et securisee
    """
    # Configuration Flask - Pas de valeur par defaut pour SECRET_KEY
    SECRET_KEY = os.getenv('SECRET_KEY')
    if not SECRET_KEY:
        raise ValueError("SECRET_KEY doit etre definie dans les variables d'environnement")
    
    DEBUG = os.getenv('FLASK_ENV', 'production') == 'development'
    ENV = os.getenv('FLASK_ENV', 'production')
    
    # Configuration JWT
    JWT_SECRET = os.getenv('JWT_SECRET')
    if not JWT_SECRET:
        raise ValueError("JWT_SECRET doit etre definie dans les variables d'environnement")
    
    JWT_ALGORITHM = 'HS256'
    JWT_EXPIRATION_HOURS = 24
    
    # Configuration Base de donnees
    DB_HOST = os.getenv('DB_HOST')
    DB_PORT = int(os.getenv('DB_PORT', 3306))
    DB_NAME = os.getenv('DB_NAME')
    DB_USER = os.getenv('DB_USER')
    DB_PASSWORD = os.getenv('DB_PASSWORD')
    
    # Validation des variables requises
    if not all([DB_HOST, DB_NAME, DB_USER, DB_PASSWORD]):
        raise ValueError("Variables d'environnement DB manquantes (DB_HOST, DB_NAME, DB_USER, DB_PASSWORD)")
    
    # Configuration Services externes
    MENU_SERVICE_URL = os.getenv('MENU_SERVICE_URL', 'http://localhost:8080')
    
    # Chemins schemas
    SCHEMA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'schemas')
    XSD_DIR = os.path.join(SCHEMA_DIR, 'xsd')
    XSLT_DIR = os.path.join(SCHEMA_DIR, 'xslt')
