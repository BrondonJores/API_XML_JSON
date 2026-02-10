"""
Client pour le Menu Service
"""
import requests
from typing import Optional, Dict, Any
from app.config import Config

class MenuClient:
    """
    Client HTTP pour communiquer avec le Menu Service
    """
    
    @staticmethod
    def get_meal(meal_id: int) -> Optional[Dict[str, Any]]:
        """
        Recupere les informations d'un plat depuis le Menu Service
        
        Args:
            meal_id: L'ID du plat
            
        Returns:
            Dictionnaire avec les infos du plat ou None
        """
        try:
            url = f"{Config.MENU_SERVICE_URL}/api/meals/{meal_id}"
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                return response.json()
            
            return None
            
        except requests.RequestException as e:
            print(f"Erreur lors de la recuperation du plat {meal_id}: {str(e)}")
            return None
    
    @staticmethod
    def get_available_meals() -> list:
        """
        Recupere la liste des plats disponibles
        
        Returns:
            Liste des plats disponibles
        """
        try:
            url = f"{Config.MENU_SERVICE_URL}/api/meals"
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                return response.json()
            
            return []
            
        except requests.RequestException as e:
            print(f"Erreur lors de la recuperation des plats: {str(e)}")
            return []
    
    @staticmethod
    def validate_meal_availability(meal_id: int) -> bool:
        """
        Verifie si un plat est disponible
        
        Args:
            meal_id: L'ID du plat
            
        Returns:
            True si disponible, False sinon
        """
        meal = MenuClient.get_meal(meal_id)
        
        if meal and meal.get('available', False):
            return True
        
        return False
