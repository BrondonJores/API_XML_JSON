"""
Service de gestion des commandes
"""
from typing import List, Optional, Dict, Any
from datetime import datetime
from app.database import Database
from app.models.order import Order
from app.models.order_item import OrderItem

class OrderService:
    """
    Service de logique metier pour les commandes
    """
    
    @staticmethod
    def create_order(order: Order) -> Order:
        """
        Cree une nouvelle commande dans la base de donnees
        
        Args:
            order: L'objet Order a creer
            
        Returns:
            L'Order cree avec son ID
        """
        with Database.get_cursor(commit=True) as cursor:
            # Insertion de la commande
            cursor.execute(
                """
                INSERT INTO orders (user_id, total, status, pickup_time, created_at)
                VALUES (%s, %s, %s, %s, %s)
                """,
                (order.user_id, order.total, order.status, order.pickup_time, order.created_at)
            )
            order.id = cursor.lastrowid
            
            # Insertion des articles
            for item in order.items:
                cursor.execute(
                    """
                    INSERT INTO order_items (order_id, meal_id, meal_name, quantity, price)
                    VALUES (%s, %s, %s, %s, %s)
                    """,
                    (order.id, item.meal_id, item.meal_name, item.quantity, item.price)
                )
                item.id = cursor.lastrowid
                item.order_id = order.id
            
            return order
    
    @staticmethod
    def get_order_by_id(order_id: int) -> Optional[Order]:
        """
        Recupere une commande par son ID
        
        Args:
            order_id: L'ID de la commande
            
        Returns:
            L'Order ou None si non trouve
        """
        with Database.get_cursor() as cursor:
            cursor.execute(
                "SELECT * FROM orders WHERE id = %s",
                (order_id,)
            )
            row = cursor.fetchone()
            
            if not row:
                return None
            
            order = Order.from_db_row(row)
            
            # Recuperation des articles
            cursor.execute(
                "SELECT * FROM order_items WHERE order_id = %s",
                (order_id,)
            )
            items = cursor.fetchall()
            order.items = [OrderItem.from_db_row(item) for item in items]
            
            return order
    
    @staticmethod
    def get_orders_by_user(user_id: int) -> List[Order]:
        """
        Recupere toutes les commandes d'un utilisateur
        
        Args:
            user_id: L'ID de l'utilisateur
            
        Returns:
            Liste des commandes
        """
        with Database.get_cursor() as cursor:
            cursor.execute(
                "SELECT * FROM orders WHERE user_id = %s ORDER BY created_at DESC",
                (user_id,)
            )
            rows = cursor.fetchall()
            
            orders = []
            for row in rows:
                order = Order.from_db_row(row)
                
                # Recuperation des articles pour chaque commande
                cursor.execute(
                    "SELECT * FROM order_items WHERE order_id = %s",
                    (order.id,)
                )
                items = cursor.fetchall()
                order.items = [OrderItem.from_db_row(item) for item in items]
                
                orders.append(order)
            
            return orders
    
    @staticmethod
    def get_all_orders(limit: int = 100, offset: int = 0) -> List[Order]:
        """
        Recupere toutes les commandes avec pagination
        
        Args:
            limit: Nombre maximum de commandes a retourner
            offset: Decalage pour la pagination
            
        Returns:
            Liste des commandes
        """
        with Database.get_cursor() as cursor:
            cursor.execute(
                "SELECT * FROM orders ORDER BY created_at DESC LIMIT %s OFFSET %s",
                (limit, offset)
            )
            rows = cursor.fetchall()
            
            orders = []
            for row in rows:
                order = Order.from_db_row(row)
                
                cursor.execute(
                    "SELECT * FROM order_items WHERE order_id = %s",
                    (order.id,)
                )
                items = cursor.fetchall()
                order.items = [OrderItem.from_db_row(item) for item in items]
                
                orders.append(order)
            
            return orders
    
    @staticmethod
    def update_order_status(order_id: int, status: str) -> bool:
        """
        Met a jour le statut d'une commande
        
        Args:
            order_id: L'ID de la commande
            status: Le nouveau statut
            
        Returns:
            True si la mise a jour a reussi, False sinon
        """
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute(
                "UPDATE orders SET status = %s WHERE id = %s",
                (status, order_id)
            )
            return cursor.rowcount > 0
    
    @staticmethod
    def delete_order(order_id: int) -> bool:
        """
        Supprime une commande
        
        Args:
            order_id: L'ID de la commande
            
        Returns:
            True si la suppression a reussi, False sinon
        """
        with Database.get_cursor(commit=True) as cursor:
            # Suppression des articles
            cursor.execute(
                "DELETE FROM order_items WHERE order_id = %s",
                (order_id,)
            )
            
            # Suppression de la commande
            cursor.execute(
                "DELETE FROM orders WHERE id = %s",
                (order_id,)
            )
            
            return cursor.rowcount > 0
