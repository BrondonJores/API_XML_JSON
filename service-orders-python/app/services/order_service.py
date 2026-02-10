"""
Module de gestion des commandes
"""

import logging
from datetime import datetime
from flask import current_app
from app.database import get_db_connection


logger = logging.getLogger(__name__)


class OrderService:
    """
    Service pour la gestion des commandes
    """

    @staticmethod
    def create_order(order_data):
        """
        Cree une nouvelle commande avec ses articles
        
        Args:
            order_data: Dictionnaire contenant les donnees de la commande
                       {user_id, items: [{meal_id, quantity, price}], total_amount}
            
        Returns:
            dict: Commande creee avec son ID
            
        Raises:
            Exception: En cas d'erreur lors de la creation
        """
        connection = None
        cursor = None
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            user_id = order_data.get('user_id')
            total_amount = order_data.get('total_amount')
            items = order_data.get('items', [])
            
            insert_order_query = """
                INSERT INTO orders (user_id, total_amount, status, created_at)
                VALUES (%s, %s, 'pending', %s)
            """
            
            created_at = datetime.now()
            cursor.execute(insert_order_query, (user_id, total_amount, created_at))
            order_id = cursor.lastrowid
            
            insert_item_query = """
                INSERT INTO order_items (order_id, meal_id, quantity, price)
                VALUES (%s, %s, %s, %s)
            """
            
            for item in items:
                cursor.execute(insert_item_query, (
                    order_id,
                    item.get('meal_id'),
                    item.get('quantity'),
                    item.get('price')
                ))
            
            connection.commit()
            logger.info(f"Commande {order_id} creee avec succes pour l'utilisateur {user_id}")
            
            return {
                'order_id': order_id,
                'user_id': user_id,
                'total_amount': total_amount,
                'status': 'pending',
                'created_at': created_at.isoformat(),
                'items': items
            }
            
        except Exception as e:
            if connection:
                connection.rollback()
            logger.error(f"Erreur lors de la creation de la commande: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    @staticmethod
    def get_order_by_id(order_id):
        """
        Recupere une commande par son ID avec ses articles
        
        Args:
            order_id: ID de la commande
            
        Returns:
            dict: Commande avec ses articles ou None si non trouvee
            
        Raises:
            Exception: En cas d'erreur lors de la recuperation
        """
        connection = None
        cursor = None
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            order_query = """
                SELECT id, user_id, total_amount, status, created_at
                FROM orders
                WHERE id = %s
            """
            cursor.execute(order_query, (order_id,))
            order = cursor.fetchone()
            
            if not order:
                logger.warning(f"Commande {order_id} non trouvee")
                return None
            
            items_query = """
                SELECT oi.id, oi.meal_id, oi.quantity, oi.price, m.name as meal_name
                FROM order_items oi
                LEFT JOIN meals m ON oi.meal_id = m.id
                WHERE oi.order_id = %s
            """
            cursor.execute(items_query, (order_id,))
            items = cursor.fetchall()
            
            order['items'] = items
            logger.info(f"Commande {order_id} recuperee avec succes")
            return order
            
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation de la commande {order_id}: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    @staticmethod
    def get_user_orders(user_id):
        """
        Recupere toutes les commandes d'un utilisateur
        
        Args:
            user_id: ID de l'utilisateur
            
        Returns:
            list: Liste des commandes de l'utilisateur
            
        Raises:
            Exception: En cas d'erreur lors de la recuperation
        """
        connection = None
        cursor = None
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            query = """
                SELECT id, user_id, total_amount, status, created_at
                FROM orders
                WHERE user_id = %s
                ORDER BY created_at DESC
            """
            cursor.execute(query, (user_id,))
            orders = cursor.fetchall()
            
            logger.info(f"{len(orders)} commande(s) trouvee(s) pour l'utilisateur {user_id}")
            return orders
            
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation des commandes de l'utilisateur {user_id}: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    @staticmethod
    def get_all_orders():
        """
        Recupere toutes les commandes (fonction admin)
        
        Returns:
            list: Liste de toutes les commandes
            
        Raises:
            Exception: En cas d'erreur lors de la recuperation
        """
        connection = None
        cursor = None
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            query = """
                SELECT o.id, o.user_id, o.total_amount, o.status, o.created_at,
                       u.username, u.email
                FROM orders o
                LEFT JOIN users u ON o.user_id = u.id
                ORDER BY o.created_at DESC
            """
            cursor.execute(query)
            orders = cursor.fetchall()
            
            logger.info(f"{len(orders)} commande(s) recuperee(s)")
            return orders
            
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation de toutes les commandes: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
