import { formatPrice } from '../../utils/formatters'

function CartSummary({ subtotal, deliveryFee, tax, total }) {
  return (
    <div className="card">
      <h3 className="font-semibold text-lg mb-4">Récapitulatif</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between text-gray-700">
          <span>Sous-total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-700">
          <span>Livraison</span>
          <span>{deliveryFee === 0 ? 'Gratuit' : formatPrice(deliveryFee)}</span>
        </div>
        
        <div className="flex justify-between text-gray-700">
          <span>TVA (10%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        
        <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
          <span className="font-semibold text-lg">Total</span>
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  )
}

export default CartSummary
