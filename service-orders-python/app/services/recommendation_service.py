"""
Module de gestion des recommandations de repas
"""

import logging
from flask import current_app
from app.database import get_db_connection


logger = logging.getLogger(__name__)


class RecommendationService:
    """
    Service pour la gestion des recommandations de repas basees sur l'historique
    """

    @staticmethod
    def get_recommendations(user_id, limit=5):
        """
        Recupere les recommandations de repas pour un utilisateur base sur son historique
        Algorithme simple: retourne les repas les plus commandes par l'utilisateur
        
        Args:
            user_id: ID de l'utilisateur
            limit: Nombre maximum de recommandations (defaut: 5)
            
        Returns:
            list: Liste des repas recommandes
            
        Raises:
            Exception: En cas d'erreur lors de la recuperation
        """
        connection = None
        cursor = None
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            query = """
                SELECT m.id, m.name, m.description, m.price, m.category,
                       COUNT(oi.id) as order_count,
                       SUM(oi.quantity) as total_quantity
                FROM order_items oi
                JOIN orders o ON oi.order_id = o.id
                JOIN meals m ON oi.meal_id = m.id
                WHERE o.user_id = %s
                GROUP BY m.id, m.name, m.description, m.price, m.category
                ORDER BY total_quantity DESC, order_count DESC
                LIMIT %s
            """
            cursor.execute(query, (user_id, limit))
            recommendations = cursor.fetchall()
            
            if recommendations:
                logger.info(f"{len(recommendations)} recommandation(s) trouvee(s) pour l'utilisateur {user_id}")
            else:
                logger.info(f"Aucun historique de commande pour l'utilisateur {user_id}, recommandations populaires")
                recommendations = RecommendationService._get_popular_meals(cursor, limit)
            
            return recommendations
            
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation des recommandations pour l'utilisateur {user_id}: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    @staticmethod
    def _get_popular_meals(cursor, limit):
        """
        Recupere les repas les plus populaires globalement (methode privee)
        Utilisee quand l'utilisateur n'a pas d'historique
        
        Args:
            cursor: Curseur de base de donnees
            limit: Nombre maximum de repas
            
        Returns:
            list: Liste des repas populaires
        """
        try:
            query = """
                SELECT m.id, m.name, m.description, m.price, m.category,
                       COUNT(oi.id) as order_count,
                       SUM(oi.quantity) as total_quantity
                FROM meals m
                LEFT JOIN order_items oi ON m.id = oi.meal_id
                GROUP BY m.id, m.name, m.description, m.price, m.category
                ORDER BY total_quantity DESC, order_count DESC
                LIMIT %s
            """
            cursor.execute(query, (limit,))
            popular_meals = cursor.fetchall()
            
            logger.info(f"{len(popular_meals)} repas populaire(s) recupere(s)")
            return popular_meals
            
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation des repas populaires: {e}")
            return []
