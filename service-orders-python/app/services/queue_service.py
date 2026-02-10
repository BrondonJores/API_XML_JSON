from app.database import Database
from app.models.queue import Queue

class QueueService:
    """Service de gestion de la file d'attente"""
    
    def add_to_queue(self, user_id, order_id=None):
        """Ajoute un utilisateur à la file d'attente"""
        with Database.get_cursor(commit=True) as cursor:
            # Vérifie si l'utilisateur est déjà dans la file
            cursor.execute(
                "SELECT * FROM queue WHERE user_id = %s",
                (user_id,)
            )
            existing = cursor.fetchone()
            
            if existing:
                # Met à jour l'entrée existante
                cursor.execute(
                    """UPDATE queue SET order_id = %s, updated_at = CURRENT_TIMESTAMP 
                       WHERE user_id = %s""",
                    (order_id, user_id)
                )
                return Queue.from_dict(existing)
            
            # Obtient la prochaine position dans la file
            cursor.execute("SELECT MAX(position) as max_pos FROM queue WHERE status = 'waiting'")
            result = cursor.fetchone()
            next_position = (result['max_pos'] or 0) + 1
            
            # Insère la nouvelle entrée
            cursor.execute(
                """INSERT INTO queue (user_id, order_id, position, status) 
                   VALUES (%s, %s, %s, 'waiting')""",
                (user_id, order_id, next_position)
            )
            
            # Récupère l'entrée créée
            cursor.execute(
                "SELECT * FROM queue WHERE user_id = %s",
                (user_id,)
            )
            queue_data = cursor.fetchone()
            return Queue.from_dict(queue_data)
    
    def get_queue_position(self, user_id):
        """Récupère la position d'un utilisateur dans la file"""
        with Database.get_cursor() as cursor:
            cursor.execute(
                "SELECT * FROM queue WHERE user_id = %s",
                (user_id,)
            )
            queue_data = cursor.fetchone()
            
            if not queue_data:
                return None
            
            return Queue.from_dict(queue_data)
    
    def get_queue_status(self):
        """Récupère l'état global de la file d'attente"""
        with Database.get_cursor() as cursor:
            # Compte le nombre total de personnes en attente
            cursor.execute(
                "SELECT COUNT(*) as total FROM queue WHERE status = 'waiting'"
            )
            total = cursor.fetchone()['total']
            
            # Récupère les premières positions
            cursor.execute(
                """SELECT q.*, o.total_price 
                   FROM queue q 
                   LEFT JOIN orders o ON q.order_id = o.id 
                   WHERE q.status = 'waiting' 
                   ORDER BY q.position ASC 
                   LIMIT 10"""
            )
            queue_list = cursor.fetchall()
            
            return {
                'total_waiting': total,
                'queue': [Queue.from_dict(item).to_dict() for item in queue_list]
            }
    
    def update_queue_status(self, user_id, status):
        """Met à jour le statut d'une entrée dans la file"""
        with Database.get_cursor(commit=True) as cursor:
            cursor.execute(
                "UPDATE queue SET status = %s WHERE user_id = %s",
                (status, user_id)
            )
            
            # Réorganise les positions si nécessaire
            if status in ['completed', 'cancelled']:
                self._reorganize_positions(cursor)
            
            return cursor.rowcount > 0
    
    def _reorganize_positions(self, cursor):
        """Réorganise les positions dans la file après une suppression"""
        cursor.execute(
            """SELECT id FROM queue 
               WHERE status = 'waiting' 
               ORDER BY position ASC"""
        )
        waiting_entries = cursor.fetchall()
        
        for idx, entry in enumerate(waiting_entries, start=1):
            cursor.execute(
                "UPDATE queue SET position = %s WHERE id = %s",
                (idx, entry['id'])
            )
