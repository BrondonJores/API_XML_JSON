"""
Modele Queue
"""
from datetime import datetime
from typing import Optional, Dict, Any

class Queue:
    """
    Representation d'une entree de file d'attente
    """
    
    def __init__(
        self,
        order_id: int,
        user_id: int,
        status: str = 'waiting',
        position: Optional[int] = None,
        estimated_time: Optional[int] = None,
        queue_id: Optional[int] = None,
        created_at: Optional[datetime] = None
    ):
        self.id = queue_id
        self.order_id = order_id
        self.user_id = user_id
        self.status = status
        self.position = position
        self.estimated_time = estimated_time
        self.created_at = created_at or datetime.now()
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertit l'entree de queue en dictionnaire
        """
        return {
            'id': self.id,
            'orderId': self.order_id,
            'userId': self.user_id,
            'status': self.status,
            'position': self.position,
            'estimatedTime': self.estimated_time,
            'createdAt': self.created_at.isoformat() if self.created_at else None
        }
    
    @staticmethod
    def from_db_row(row: Dict[str, Any]) -> 'Queue':
        """
        Cree un Queue a partir d'une ligne de base de donnees
        """
        return Queue(
            queue_id=row['id'],
            order_id=row['order_id'],
            user_id=row['user_id'],
            status=row['status'],
            position=row.get('position'),
            estimated_time=row.get('estimated_time'),
            created_at=row.get('created_at')
        )
