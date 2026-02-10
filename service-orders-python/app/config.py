import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    """Configuration de l'application Flask"""
    
    # Configuration Flask
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    DEBUG = os.getenv('DEBUG', 'False').lower() == 'true'
    
    # Configuration base de données MySQL
    DB_HOST = os.getenv('DB_HOST', 'mysql-orders')
    DB_PORT = int(os.getenv('DB_PORT', '3306'))
    DB_NAME = os.getenv('DB_NAME', 'orders_db')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'rootpassword')
    
    # Configuration service menu
    MENU_SERVICE_URL = os.getenv('MENU_SERVICE_URL', 'http://localhost:8080')
    
    # Configuration de l'application
    JSON_SORT_KEYS = False
    JSONIFY_PRETTYPRINT_REGULAR = True
