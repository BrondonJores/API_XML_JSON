"""
Module de configuration pour l'application Flask
Charge les variables d'environnement necessaires
"""

import os
from dotenv import load_dotenv

# Chargement des variables d'environnement depuis le fichier .env
load_dotenv()


class Config:
    """
    Classe de configuration centrale pour l'application
    Toutes les variables sont chargees depuis l'environnement
    """
    
    # Configuration de la base de donnees MySQL
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = int(os.getenv('DB_PORT', '3306'))
    DB_NAME = os.getenv('DB_NAME', 'restaurant_db')
    DB_USER = os.getenv('DB_USER', 'root')
    DB_PASSWORD = os.getenv('DB_PASSWORD', '')
    
    # URL du service menu pour la validation des items
    MENU_SERVICE_URL = os.getenv('MENU_SERVICE_URL', 'http://localhost:8080')
    
    # Configuration Flask
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    JSON_SORT_KEYS = False
