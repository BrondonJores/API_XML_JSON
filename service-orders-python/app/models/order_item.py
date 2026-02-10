"""
Modele OrderItem
"""
from typing import Optional, Dict, Any

class OrderItem:
    """
    Representation d'un article de commande
    """
    
    def __init__(
        self,
        meal_id: int,
        meal_name: str,
        quantity: int,
        price: float,
        item_id: Optional[int] = None,
        order_id: Optional[int] = None
    ):
        self.id = item_id
        self.order_id = order_id
        self.meal_id = meal_id
        self.meal_name = meal_name
        self.quantity = quantity
        self.price = price
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertit l'article en dictionnaire
        """
        return {
            'id': self.id,
            'mealId': self.meal_id,
            'mealName': self.meal_name,
            'quantity': self.quantity,
            'price': float(self.price)
        }
    
    @staticmethod
    def from_dict(data: Dict[str, Any]) -> 'OrderItem':
        """
        Cree un OrderItem a partir d'un dictionnaire
        """
        return OrderItem(
            item_id=data.get('id'),
            meal_id=data['mealId'],
            meal_name=data['mealName'],
            quantity=data['quantity'],
            price=data['price']
        )
    
    @staticmethod
    def from_db_row(row: Dict[str, Any]) -> 'OrderItem':
        """
        Cree un OrderItem a partir d'une ligne de base de donnees
        """
        return OrderItem(
            item_id=row['id'],
            order_id=row['order_id'],
            meal_id=row['meal_id'],
            meal_name=row['meal_name'],
            quantity=row['quantity'],
            price=float(row['price'])
        )
