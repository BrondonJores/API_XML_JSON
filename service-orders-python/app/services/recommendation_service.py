from app.database import Database
from app.clients.menu_client import MenuClient

class RecommendationService:
    """Service de recommandations basé sur l'historique des commandes"""
    
    def __init__(self):
        self.menu_client = MenuClient()
    
    def get_recommendations(self, user_id, limit=5):
        """Génère des recommandations pour un utilisateur basées sur son historique"""
        with Database.get_cursor() as cursor:
            # Récupère les articles les plus commandés par l'utilisateur
            cursor.execute(
                """SELECT oi.menu_item_id, COUNT(*) as order_count, 
                          SUM(oi.quantity) as total_quantity
                   FROM order_items oi
                   JOIN orders o ON oi.order_id = o.id
                   WHERE o.user_id = %s
                   GROUP BY oi.menu_item_id
                   ORDER BY order_count DESC, total_quantity DESC
                   LIMIT %s""",
                (user_id, limit)
            )
            user_items = cursor.fetchall()
            
            if not user_items:
                # Si l'utilisateur n'a pas d'historique, recommande les articles populaires
                return self._get_popular_items(limit)
            
            # Enrichit les données avec les informations du menu
            recommendations = []
            for item in user_items:
                menu_item = self.menu_client.get_menu_item(item['menu_item_id'])
                if menu_item:
                    recommendations.append({
                        'menu_item_id': item['menu_item_id'],
                        'name': menu_item.get('name', 'Unknown'),
                        'price': menu_item.get('price', 0.0),
                        'category': menu_item.get('category', 'Unknown'),
                        'order_count': item['order_count'],
                        'total_quantity': item['total_quantity'],
                        'recommendation_reason': 'Basé sur vos commandes précédentes'
                    })
            
            # Complète avec des articles populaires si nécessaire
            if len(recommendations) < limit:
                popular = self._get_popular_items(limit - len(recommendations))
                recommendations.extend(popular)
            
            return recommendations[:limit]
    
    def _get_popular_items(self, limit):
        """Récupère les articles les plus populaires globalement"""
        with Database.get_cursor() as cursor:
            cursor.execute(
                """SELECT oi.menu_item_id, COUNT(*) as order_count,
                          SUM(oi.quantity) as total_quantity
                   FROM order_items oi
                   GROUP BY oi.menu_item_id
                   ORDER BY order_count DESC, total_quantity DESC
                   LIMIT %s""",
                (limit,)
            )
            popular_items = cursor.fetchall()
            
            recommendations = []
            for item in popular_items:
                menu_item = self.menu_client.get_menu_item(item['menu_item_id'])
                if menu_item:
                    recommendations.append({
                        'menu_item_id': item['menu_item_id'],
                        'name': menu_item.get('name', 'Unknown'),
                        'price': menu_item.get('price', 0.0),
                        'category': menu_item.get('category', 'Unknown'),
                        'order_count': item['order_count'],
                        'total_quantity': item['total_quantity'],
                        'recommendation_reason': 'Article populaire'
                    })
            
            return recommendations
