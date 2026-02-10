from datetime import datetime
from typing import Dict, Any, Optional


class Queue:
    """
    Classe représentant une position dans la file d'attente
    """
    
    def __init__(
        self,
        id: Optional[int] = None,
        order_id: Optional[int] = None,
        position: Optional[int] = None,
        estimated_time: Optional[int] = None,
        updated_at: Optional[datetime] = None
    ):
        """
        Initialise une nouvelle instance de Queue
        """
        self.id = id
        self.order_id = order_id
        self.position = position
        self.estimated_time = estimated_time
        self.updated_at = updated_at
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convertit l'objet Queue en dictionnaire pour la sérialisation JSON
        """
        return {
            'id': self.id,
            'order_id': self.order_id,
            'position': self.position,
            'estimated_time': self.estimated_time,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    @staticmethod
    def calculate_estimated_time(position: int) -> int:
        """
        Calcule le temps estimé en fonction de la position dans la file
        La formule est: position * 5 minutes
        """
        return position * 5
