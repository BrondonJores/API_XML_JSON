from datetime import datetime
from typing import List, Dict, Any, Optional
from dicttoxml import dicttoxml


class Order:
    """
    Classe représentant une commande
    """
    
    def __init__(
        self,
        id: Optional[int] = None,
        user_id: Optional[int] = None,
        total: Optional[float] = None,
        status: Optional[str] = None,
        pickup_time: Optional[datetime] = None,
        created_at: Optional[datetime] = None,
        items: Optional[List['OrderItem']] = None
    ):
        """
        Initialise une nouvelle instance de Order
        """
        self.id = id
        self.user_id = user_id
        self.total = total
        self.status = status
        self.pickup_time = pickup_time
        self.created_at = created_at
        self.items = items if items is not None else []
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertit l'objet Order en dictionnaire pour la sérialisation JSON
        """
        return {
            'id': self.id,
            'user_id': self.user_id,
            'total': self.total,
            'status': self.status,
            'pickup_time': self.pickup_time.isoformat() if self.pickup_time else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'items': [item.to_dict() for item in self.items]
        }
    
    def to_xml(self) -> bytes:
        """
        Convertit l'objet Order en XML en utilisant dicttoxml
        """
        data = self.to_dict()
        return dicttoxml(data, custom_root='order', attr_type=False)
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'Order':
        """
        Crée une instance de Order à partir d'un dictionnaire
        """
        from .order_item import OrderItem
        
        # Conversion des dates si elles sont des chaînes
        pickup_time = None
        if data.get('pickup_time'):
            if isinstance(data['pickup_time'], str):
                pickup_time = datetime.fromisoformat(data['pickup_time'])
            else:
                pickup_time = data['pickup_time']
        
        created_at = None
        if data.get('created_at'):
            if isinstance(data['created_at'], str):
                created_at = datetime.fromisoformat(data['created_at'])
            else:
                created_at = data['created_at']
        
        # Conversion des items
        items = []
        if data.get('items'):
            items = [OrderItem.from_dict(item) for item in data['items']]
        
        return cls(
            id=data.get('id'),
            user_id=data.get('user_id'),
            total=data.get('total'),
            status=data.get('status'),
            pickup_time=pickup_time,
            created_at=created_at,
            items=items
        )
