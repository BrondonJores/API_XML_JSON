from typing import Dict, Any, Optional


class OrderItem:
    """
    Classe représentant un article dans une commande
    """
    
    def __init__(
        self,
        id: Optional[int] = None,
        order_id: Optional[int] = None,
        meal_id: Optional[int] = None,
        meal_name: Optional[str] = None,
        quantity: Optional[int] = None,
        price: Optional[float] = None
    ):
        """
        Initialise une nouvelle instance de OrderItem
        """
        self.id = id
        self.order_id = order_id
        self.meal_id = meal_id
        self.meal_name = meal_name
        self.quantity = quantity
        self.price = price
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertit l'objet OrderItem en dictionnaire pour la sérialisation JSON
        """
        return {
            'id': self.id,
            'order_id': self.order_id,
            'meal_id': self.meal_id,
            'meal_name': self.meal_name,
            'quantity': self.quantity,
            'price': self.price
        }
    
    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> 'OrderItem':
        """
        Crée une instance de OrderItem à partir d'un dictionnaire
        """
        return cls(
            id=data.get('id'),
            order_id=data.get('order_id'),
            meal_id=data.get('meal_id'),
            meal_name=data.get('meal_name'),
            quantity=data.get('quantity'),
            price=data.get('price')
        )
