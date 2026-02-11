"""
Schemas de validation avec Marshmallow
"""
from marshmallow import Schema, fields, validate, ValidationError

class OrderItemSchema(Schema):
    """Schema de validation pour un article de commande"""
    meal_id = fields.Int(required=True, validate=validate.Range(min=1))
    quantity = fields.Int(required=True, validate=validate.Range(min=1, max=100))
    price = fields.Decimal(required=True, validate=validate.Range(min=0), as_string=True)

class OrderCreateSchema(Schema):
    """Schema de validation pour la creation d'une commande"""
    user_id = fields.Int(required=True, validate=validate.Range(min=1))
    items = fields.List(fields.Nested(OrderItemSchema), required=True, validate=validate.Length(min=1, max=50))
    total = fields.Decimal(required=True, validate=validate.Range(min=0), as_string=True)
    notes = fields.Str(validate=validate.Length(max=500))

class OrderStatusSchema(Schema):
    """Schema de validation pour la mise a jour du statut"""
    status = fields.Str(
        required=True,
        validate=validate.OneOf(['pending', 'preparing', 'ready', 'completed', 'cancelled'])
    )

class PaginationSchema(Schema):
    """Schema de validation pour la pagination"""
    limit = fields.Int(validate=validate.Range(min=1, max=100), missing=100)
    offset = fields.Int(validate=validate.Range(min=0), missing=0)
