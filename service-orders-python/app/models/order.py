from datetime import datetime

class Order:
    """Modèle représentant une commande"""
    
    def __init__(self, id=None, user_id=None, status='pending', total_price=0.0, 
                 created_at=None, updated_at=None, items=None):
        self.id = id
        self.user_id = user_id
        self.status = status
        self.total_price = total_price
        self.created_at = created_at or datetime.now()
        self.updated_at = updated_at or datetime.now()
        self.items = items or []
    
    def to_dict(self):
        """Convertit l'objet en dictionnaire"""
        return {
            'id': self.id,
            'user_id': self.user_id,
            'status': self.status,
            'total_price': float(self.total_price),
            'created_at': self.created_at.isoformat() if isinstance(self.created_at, datetime) else self.created_at,
            'updated_at': self.updated_at.isoformat() if isinstance(self.updated_at, datetime) else self.updated_at,
            'items': [item.to_dict() if hasattr(item, 'to_dict') else item for item in self.items]
        }
    
    @staticmethod
    def from_dict(data):
        """Crée un objet Order depuis un dictionnaire"""
        return Order(
            id=data.get('id'),
            user_id=data.get('user_id'),
            status=data.get('status', 'pending'),
            total_price=data.get('total_price', 0.0),
            created_at=data.get('created_at'),
            updated_at=data.get('updated_at'),
            items=data.get('items', [])
        )
