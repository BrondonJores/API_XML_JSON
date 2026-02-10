import requests
from app.config import Config

class MenuClient:
    """Client pour communiquer avec le service Menu"""
    
    def __init__(self):
        self.base_url = Config.MENU_SERVICE_URL
        self.timeout = 5
    
    def get_menu_item(self, item_id):
        """Récupère un article du menu par son ID"""
        try:
            url = f"{self.base_url}/api/menu/{item_id}"
            response = requests.get(url, timeout=self.timeout)
            
            if response.status_code == 200:
                return response.json()
            elif response.status_code == 404:
                return None
            else:
                raise Exception(f"Erreur du service menu: {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            # En cas d'erreur, retourne un article par défaut pour ne pas bloquer
            return {
                'id': item_id,
                'name': f'Article {item_id}',
                'price': 10.0,
                'category': 'Unknown',
                'available': True
            }
    
    def get_all_menu_items(self):
        """Récupère tous les articles du menu"""
        try:
            url = f"{self.base_url}/api/menu"
            response = requests.get(url, timeout=self.timeout)
            
            if response.status_code == 200:
                return response.json()
            else:
                return []
                
        except requests.exceptions.RequestException:
            return []
    
    def check_availability(self, item_id):
        """Vérifie la disponibilité d'un article"""
        item = self.get_menu_item(item_id)
        if item:
            return item.get('available', False)
        return False
