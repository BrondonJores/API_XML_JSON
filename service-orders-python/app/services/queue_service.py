"""
Module de gestion de la file d'attente des commandes
"""

import logging
from datetime import datetime, timedelta
from flask import current_app
from app.database import get_db_connection


logger = logging.getLogger(__name__)


class QueueService:
    """
    Service pour la gestion de la file d'attente des commandes
    """

    AVERAGE_PROCESSING_TIME_MINUTES = 15

    @staticmethod
    def add_to_queue(order_id):
        """
        Ajoute une commande a la file d'attente et calcule sa position et son temps d'attente
        
        Args:
            order_id: ID de la commande
            
        Returns:
            dict: Position et temps d'attente estime
            
        Raises:
            Exception: En cas d'erreur lors de l'ajout
        """
        connection = None
        cursor = None
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            count_query = """
                SELECT COUNT(*) as count
                FROM order_queue
                WHERE status = 'waiting'
            """
            cursor.execute(count_query)
            result = cursor.fetchone()
            position = result['count'] + 1
            
            estimated_time = position * QueueService.AVERAGE_PROCESSING_TIME_MINUTES
            
            insert_query = """
                INSERT INTO order_queue (order_id, position, estimated_wait_time, status, added_at)
                VALUES (%s, %s, %s, 'waiting', %s)
            """
            
            added_at = datetime.now()
            cursor.execute(insert_query, (order_id, position, estimated_time, added_at))
            
            connection.commit()
            logger.info(f"Commande {order_id} ajoutee a la file d'attente en position {position}")
            
            return {
                'order_id': order_id,
                'position': position,
                'estimated_wait_time': estimated_time,
                'status': 'waiting'
            }
            
        except Exception as e:
            if connection:
                connection.rollback()
            logger.error(f"Erreur lors de l'ajout de la commande {order_id} a la file: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    @staticmethod
    def get_user_queue_position(user_id):
        """
        Recupere la position dans la file d'attente de la derniere commande d'un utilisateur
        
        Args:
            user_id: ID de l'utilisateur
            
        Returns:
            dict: Position et informations de la file ou None si pas de commande en attente
            
        Raises:
            Exception: En cas d'erreur lors de la recuperation
        """
        connection = None
        cursor = None
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            query = """
                SELECT oq.order_id, oq.position, oq.estimated_wait_time, oq.status, oq.added_at
                FROM order_queue oq
                JOIN orders o ON oq.order_id = o.id
                WHERE o.user_id = %s AND oq.status = 'waiting'
                ORDER BY oq.added_at DESC
                LIMIT 1
            """
            cursor.execute(query, (user_id,))
            queue_info = cursor.fetchone()
            
            if queue_info:
                logger.info(f"Position en file d'attente trouvee pour l'utilisateur {user_id}")
            else:
                logger.info(f"Aucune commande en attente pour l'utilisateur {user_id}")
            
            return queue_info
            
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation de la position pour l'utilisateur {user_id}: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    @staticmethod
    def get_queue_status():
        """
        Recupere l'etat actuel de la file d'attente avec toutes les positions
        
        Returns:
            list: Liste des commandes en attente avec leurs positions
            
        Raises:
            Exception: En cas d'erreur lors de la recuperation
        """
        connection = None
        cursor = None
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            query = """
                SELECT oq.order_id, oq.position, oq.estimated_wait_time, oq.status, 
                       oq.added_at, o.user_id, o.total_amount
                FROM order_queue oq
                JOIN orders o ON oq.order_id = o.id
                WHERE oq.status = 'waiting'
                ORDER BY oq.position ASC
            """
            cursor.execute(query)
            queue_items = cursor.fetchall()
            
            logger.info(f"{len(queue_items)} commande(s) en file d'attente")
            return queue_items
            
        except Exception as e:
            logger.error(f"Erreur lors de la recuperation de l'etat de la file: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()

    @staticmethod
    def update_queue_positions():
        """
        Recalcule toutes les positions dans la file d'attente apres traitement d'une commande
        
        Returns:
            int: Nombre de positions mises a jour
            
        Raises:
            Exception: En cas d'erreur lors de la mise a jour
        """
        connection = None
        cursor = None
        
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            select_query = """
                SELECT id, order_id
                FROM order_queue
                WHERE status = 'waiting'
                ORDER BY position ASC
            """
            cursor.execute(select_query)
            queue_items = cursor.fetchall()
            
            update_query = """
                UPDATE order_queue
                SET position = %s, estimated_wait_time = %s
                WHERE id = %s
            """
            
            updated_count = 0
            for index, item in enumerate(queue_items):
                new_position = index + 1
                new_estimated_time = new_position * QueueService.AVERAGE_PROCESSING_TIME_MINUTES
                cursor.execute(update_query, (new_position, new_estimated_time, item['id']))
                updated_count += 1
            
            connection.commit()
            logger.info(f"{updated_count} position(s) mise(s) a jour dans la file d'attente")
            return updated_count
            
        except Exception as e:
            if connection:
                connection.rollback()
            logger.error(f"Erreur lors de la mise a jour des positions: {e}")
            raise
        finally:
            if cursor:
                cursor.close()
            if connection:
                connection.close()
