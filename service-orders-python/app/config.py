"""
Configuration de l'application
"""
import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """
    Classe de configuration centralisee
    """
    # Configuration Flask
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('FLASK_ENV', 'production') == 'development'
    
    # Configuration Base de donnees
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = int(os.getenv('DB_PORT', 3306))
    DB_NAME = os.getenv('DB_NAME', 'canteen_db')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    
    # Configuration Services externes
    MENU_SERVICE_URL = os.getenv('MENU_SERVICE_URL', 'http://localhost:8080')
    
    # Chemins schemas
    SCHEMA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'schemas')
    XSD_DIR = os.path.join(SCHEMA_DIR, 'xsd')
    XSLT_DIR = os.path.join(SCHEMA_DIR, 'xslt')
