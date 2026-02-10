"""
Modele Order
"""
from datetime import datetime
from typing import List, Optional, Dict, Any

class Order:
    """
    Representation d'une commande
    """
    
    def __init__(
        self,
        user_id: int,
        total: float,
        status: str = 'pending',
        order_id: Optional[int] = None,
        pickup_time: Optional[datetime] = None,
        created_at: Optional[datetime] = None,
        items: Optional[List] = None
    ):
        self.id = order_id
        self.user_id = user_id
        self.total = total
        self.status = status
        self.pickup_time = pickup_time
        self.created_at = created_at or datetime.now()
        self.items = items or []
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertit l'ordre en dictionnaire
        """
        return {
            'id': self.id,
            'userId': self.user_id,
            'total': float(self.total),
            'status': self.status,
            'pickupTime': self.pickup_time.isoformat() if self.pickup_time else None,
            'createdAt': self.created_at.isoformat() if self.created_at else None,
            'items': [item.to_dict() for item in self.items]
        }
    
    @staticmethod
    def from_dict(data: Dict[str, Any]) -> 'Order':
        """
        Cree un Order a partir d'un dictionnaire
        """
        from app.models.order_item import OrderItem
        
        pickup_time = None
        if data.get('pickupTime'):
            if isinstance(data['pickupTime'], str):
                pickup_time = datetime.fromisoformat(data['pickupTime'].replace('Z', '+00:00'))
            else:
                pickup_time = data['pickupTime']
        
        created_at = None
        if data.get('createdAt'):
            if isinstance(data['createdAt'], str):
                created_at = datetime.fromisoformat(data['createdAt'].replace('Z', '+00:00'))
            else:
                created_at = data['createdAt']
        
        order = Order(
            user_id=data['userId'],
            total=data['total'],
            status=data.get('status', 'pending'),
            order_id=data.get('id'),
            pickup_time=pickup_time,
            created_at=created_at
        )
        
        if 'items' in data:
            order.items = [OrderItem.from_dict(item) for item in data['items']]
        
        return order
    
    @staticmethod
    def from_db_row(row: Dict[str, Any]) -> 'Order':
        """
        Cree un Order a partir d'une ligne de base de donnees
        """
        return Order(
            order_id=row['id'],
            user_id=row['user_id'],
            total=float(row['total']),
            status=row['status'],
            pickup_time=row.get('pickup_time'),
            created_at=row.get('created_at')
        )
