"""
Service de recommandations
"""
from typing import List, Dict, Any
from collections import Counter
from app.database import Database

class RecommendationService:
    """
    Service de logique metier pour les recommandations
    """
    
    @staticmethod
    def get_recommendations(user_id: int, limit: int = 5) -> List[Dict[str, Any]]:
        """
        Genere des recommandations de plats pour un utilisateur
        Basees sur l'historique de commandes
        
        Args:
            user_id: L'ID de l'utilisateur
            limit: Nombre de recommandations a retourner
            
        Returns:
            Liste de plats recommandes
        """
        with Database.get_cursor() as cursor:
            # Recuperation de l'historique des commandes de l'utilisateur
            cursor.execute(
                """
                SELECT oi.meal_id, oi.meal_name, COUNT(*) as order_count
                FROM order_items oi
                JOIN orders o ON oi.order_id = o.id
                WHERE o.user_id = %s
                GROUP BY oi.meal_id, oi.meal_name
                ORDER BY order_count DESC
                LIMIT %s
                """,
                (user_id, limit)
            )
            user_favorites = cursor.fetchall()
            
            if user_favorites:
                # L'utilisateur a un historique, on recommande ses favoris
                recommendations = [
                    {
                        'mealId': row['meal_id'],
                        'mealName': row['meal_name'],
                        'reason': 'Vous avez commande ce plat {} fois'.format(row['order_count']),
                        'score': row['order_count']
                    }
                    for row in user_favorites
                ]
            else:
                # Nouvel utilisateur, on recommande les plats populaires
                cursor.execute(
                    """
                    SELECT oi.meal_id, oi.meal_name, COUNT(*) as order_count
                    FROM order_items oi
                    GROUP BY oi.meal_id, oi.meal_name
                    ORDER BY order_count DESC
                    LIMIT %s
                    """,
                    (limit,)
                )
                popular_meals = cursor.fetchall()
                
                recommendations = [
                    {
                        'mealId': row['meal_id'],
                        'mealName': row['meal_name'],
                        'reason': 'Plat populaire commande {} fois'.format(row['order_count']),
                        'score': row['order_count']
                    }
                    for row in popular_meals
                ]
            
            return recommendations
    
    @staticmethod
    def get_similar_users_recommendations(user_id: int, limit: int = 5) -> List[Dict[str, Any]]:
        """
        Recommandations basees sur les utilisateurs similaires
        
        Args:
            user_id: L'ID de l'utilisateur
            limit: Nombre de recommandations
            
        Returns:
            Liste de recommandations
        """
        with Database.get_cursor() as cursor:
            # Recuperation des plats commandes par l'utilisateur
            cursor.execute(
                """
                SELECT DISTINCT meal_id
                FROM order_items oi
                JOIN orders o ON oi.order_id = o.id
                WHERE o.user_id = %s
                """,
                (user_id,)
            )
            user_meals = [row['meal_id'] for row in cursor.fetchall()]
            
            if not user_meals:
                return []
            
            # Recherche d'utilisateurs similaires
            # (ceux qui ont commande au moins un plat en commun)
            placeholders = ','.join(['%s'] * len(user_meals))
            cursor.execute(
                f"""
                SELECT DISTINCT o.user_id
                FROM orders o
                JOIN order_items oi ON o.id = oi.order_id
                WHERE oi.meal_id IN ({placeholders})
                AND o.user_id != %s
                LIMIT 20
                """,
                (*user_meals, user_id)
            )
            similar_users = [row['user_id'] for row in cursor.fetchall()]
            
            if not similar_users:
                return []
            
            # Recuperation des plats commandes par les utilisateurs similaires
            # mais pas par l'utilisateur actuel
            similar_users_placeholders = ','.join(['%s'] * len(similar_users))
            user_meals_placeholders = ','.join(['%s'] * len(user_meals))
            
            cursor.execute(
                f"""
                SELECT oi.meal_id, oi.meal_name, COUNT(*) as recommendation_count
                FROM order_items oi
                JOIN orders o ON oi.order_id = o.id
                WHERE o.user_id IN ({similar_users_placeholders})
                AND oi.meal_id NOT IN ({user_meals_placeholders})
                GROUP BY oi.meal_id, oi.meal_name
                ORDER BY recommendation_count DESC
                LIMIT %s
                """,
                (*similar_users, *user_meals, limit)
            )
            
            recommendations = [
                {
                    'mealId': row['meal_id'],
                    'mealName': row['meal_name'],
                    'reason': 'Recommande par des utilisateurs similaires',
                    'score': row['recommendation_count']
                }
                for row in cursor.fetchall()
            ]
            
            return recommendations
