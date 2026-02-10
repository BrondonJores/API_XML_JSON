from datetime import datetime

class Queue:
    """Modèle représentant une entrée dans la file d'attente"""
    
    def __init__(self, id=None, user_id=None, order_id=None, position=0, 
                 status='waiting', joined_at=None, updated_at=None):
        self.id = id
        self.user_id = user_id
        self.order_id = order_id
        self.position = position
        self.status = status
        self.joined_at = joined_at or datetime.now()
        self.updated_at = updated_at or datetime.now()
    
    def to_dict(self):
        """Convertit l'objet en dictionnaire"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'order_id': self.order_id,
            'position': self.position,
            'status': self.status,
            'joined_at': self.joined_at.isoformat() if isinstance(self.joined_at, datetime) else self.joined_at,
            'updated_at': self.updated_at.isoformat() if isinstance(self.updated_at, datetime) else self.updated_at
        }
    
    @staticmethod
    def from_dict(data):
        """Crée un objet Queue depuis un dictionnaire"""
        return Queue(
            id=data.get('id'),
            user_id=data.get('user_id'),
            order_id=data.get('order_id'),
            position=data.get('position', 0),
            status=data.get('status', 'waiting'),
            joined_at=data.get('joined_at'),
            updated_at=data.get('updated_at')
        )
