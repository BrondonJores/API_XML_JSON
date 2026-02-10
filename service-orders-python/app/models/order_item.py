class OrderItem:
    """Modèle représentant un article dans une commande"""
    
    def __init__(self, id=None, order_id=None, menu_item_id=None, quantity=1, price=0.0):
        self.id = id
        self.order_id = order_id
        self.menu_item_id = menu_item_id
        self.quantity = quantity
        self.price = price
    
    def to_dict(self):
        """Convertit l'objet en dictionnaire"""
        return {
            'id': self.id,
            'order_id': self.order_id,
            'menu_item_id': self.menu_item_id,
            'quantity': self.quantity,
            'price': float(self.price)
        }
    
    @staticmethod
    def from_dict(data):
        """Crée un objet OrderItem depuis un dictionnaire"""
        return OrderItem(
            id=data.get('id'),
            order_id=data.get('order_id'),
            menu_item_id=data.get('menu_item_id'),
            quantity=data.get('quantity', 1),
            price=data.get('price', 0.0)
        )
