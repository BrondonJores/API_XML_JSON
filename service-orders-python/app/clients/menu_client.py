"""
Client HTTP pour communiquer avec le service de menu
"""

import requests
from app.config import Config


class MenuClient:
    """
    Client pour interagir avec le service de menu
    Gere les requetes HTTP vers l'API du menu
    """
    
    def __init__(self):
        """
        Initialise le client avec l'URL du service de menu depuis la configuration
        """
        self.base_url = Config.MENU_SERVICE_URL
    
    def get_meal(self, meal_id):
        """
        Recupere les details d'un plat specifique depuis le service de menu
        
        Args:
            meal_id: Identifiant du plat a recuperer
            
        Returns:
            dict: Donnees du plat au format JSON
            
        Raises:
            requests.exceptions.RequestException: En cas d'erreur de communication
        """
        url = f"{self.base_url}/api/meals/{meal_id}"
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
    
    def get_meals(self):
        """
        Recupere la liste de tous les plats disponibles depuis le service de menu
        
        Returns:
            list: Liste des plats au format JSON
            
        Raises:
            requests.exceptions.RequestException: En cas d'erreur de communication
        """
        url = f"{self.base_url}/api/meals"
        response = requests.get(url)
        response.raise_for_status()
        return response.json()
