"""
Service de gestion de la file d'attente
"""
from typing import List, Optional, Dict, Any
from app.database import Database
from app.models.queue import Queue

class QueueService:
    """
    Service de logique metier pour la file d'attente
    """
    
    # Temps estime par commande en minutes
    ESTIMATED_TIME_PER_ORDER = 5
    
    @staticmethod
    def add_to_queue(order_id: int, user_id: int) -> Queue:
        """
        Ajoute une commande a la file d'attente
        
        Args:
            order_id: L'ID de la commande
            user_id: L'ID de l'utilisateur
            
        Returns:
            L'entree Queue creee
        """
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute(
                """
                INSERT INTO queue (order_id, user_id, status, created_at)
                VALUES (%s, %s, 'waiting', NOW())
                """,
                (order_id, user_id)
            )
            queue_id = cursor.lastrowid
            
            # Calcul de la position et du temps estime
            cursor.execute(
                """
                SELECT COUNT(*) as position FROM queue
                WHERE status IN ('waiting', 'preparing')
                AND id <= %s
                """,
                (queue_id,)
            )
            result = cursor.fetchone()
            position = result['position']
            
            estimated_time = position * QueueService.ESTIMATED_TIME_PER_ORDER
            
            # Mise a jour de la position et du temps estime
            cursor.execute(
                """
                UPDATE queue
                SET position = %s, estimated_time = %s
                WHERE id = %s
                """,
                (position, estimated_time, queue_id)
            )
            
            # Recuperation de l'entree complete
            cursor.execute("SELECT * FROM queue WHERE id = %s", (queue_id,))
            row = cursor.fetchone()
            
            return Queue.from_db_row(row)
    
    @staticmethod
    def get_user_queue_position(user_id: int) -> Optional[Queue]:
        """
        Recupere la position dans la file d'attente pour un utilisateur
        
        Args:
            user_id: L'ID de l'utilisateur
            
        Returns:
            L'entree Queue ou None
        """
        with Database.get_cursor() as cursor:
            cursor.execute(
                """
                SELECT * FROM queue
                WHERE user_id = %s
                AND status IN ('waiting', 'preparing')
                ORDER BY created_at DESC
                LIMIT 1
                """,
                (user_id,)
            )
            row = cursor.fetchone()
            
            if not row:
                return None
            
            return Queue.from_db_row(row)
    
    @staticmethod
    def get_queue_status() -> Dict[str, Any]:
        """
        Recupere le statut global de la file d'attente
        
        Returns:
            Dictionnaire avec les statistiques de la queue
        """
        with Database.get_cursor() as cursor:
            cursor.execute(
                """
                SELECT
                    COUNT(*) as total,
                    SUM(CASE WHEN status = 'waiting' THEN 1 ELSE 0 END) as waiting,
                    SUM(CASE WHEN status = 'preparing' THEN 1 ELSE 0 END) as preparing,
                    SUM(CASE WHEN status = 'ready' THEN 1 ELSE 0 END) as ready
                FROM queue
                WHERE status IN ('waiting', 'preparing', 'ready')
                """
            )
            stats = cursor.fetchone()
            
            total_waiting = stats['waiting'] + stats['preparing']
            estimated_wait = total_waiting * QueueService.ESTIMATED_TIME_PER_ORDER
            
            return {
                'total': stats['total'],
                'waiting': stats['waiting'],
                'preparing': stats['preparing'],
                'ready': stats['ready'],
                'estimatedWaitTime': estimated_wait
            }
    
    @staticmethod
    def update_queue_status(order_id: int, status: str) -> bool:
        """
        Met a jour le statut d'une entree de queue
        
        Args:
            order_id: L'ID de la commande
            status: Le nouveau statut
            
        Returns:
            True si la mise a jour a reussi
        """
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute(
                "UPDATE queue SET status = %s WHERE order_id = %s",
                (status, order_id)
            )
            
            # Recalcul des positions si necessaire
            if status in ('ready', 'completed'):
                QueueService._recalculate_positions(cursor)
            
            return cursor.rowcount > 0
    
    @staticmethod
    def _recalculate_positions(cursor):
        """
        Recalcule les positions et temps estimes dans la queue
        
        Args:
            cursor: Curseur de base de donnees actif
        """
        cursor.execute(
            """
            SELECT id FROM queue
            WHERE status IN ('waiting', 'preparing')
            ORDER BY created_at ASC
            """
        )
        rows = cursor.fetchall()
        
        for index, row in enumerate(rows, start=1):
            position = index
            estimated_time = position * QueueService.ESTIMATED_TIME_PER_ORDER
            
            cursor.execute(
                """
                UPDATE queue
                SET position = %s, estimated_time = %s
                WHERE id = %s
                """,
                (position, estimated_time, row['id'])
            )
