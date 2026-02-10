import {
  ClockIcon,
  CheckCircleIcon,
  FireIcon,
  ShoppingBagIcon,
  TruckIcon,
} from '@heroicons/react/24/outline'
import { ORDER_STATUS } from '../../utils/constants'

// Étapes de la timeline dans l'ordre
const TIMELINE_STEPS = [
  {
    key: ORDER_STATUS.PENDING,
    label: 'En attente',
    icon: ClockIcon,
  },
  {
    key: ORDER_STATUS.CONFIRMED,
    label: 'Confirmée',
    icon: CheckCircleIcon,
  },
  {
    key: ORDER_STATUS.PREPARING,
    label: 'En préparation',
    icon: FireIcon,
  },
  {
    key: ORDER_STATUS.READY,
    label: 'Prête',
    icon: ShoppingBagIcon,
  },
  {
    key: ORDER_STATUS.DELIVERED,
    label: 'Livrée',
    icon: TruckIcon,
  },
]

/**
 * Timeline de progression du statut de commande
 * @param {string} currentStatus - Statut actuel de la commande
 */
const OrderTimeline = ({ currentStatus }) => {
  // Déterminer l'index du statut actuel
  const currentIndex = TIMELINE_STEPS.findIndex(
    (step) => step.key === currentStatus
  )

  // Si le statut est annulé, afficher un état spécial
  const isCancelled = currentStatus === ORDER_STATUS.CANCELLED

  return (
    <div className="py-6">
      {isCancelled ? (
        // Affichage pour commande annulée
        <div className="flex items-center justify-center p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-red-100 flex items-center justify-center">
              <span className="text-2xl text-red-600">✕</span>
            </div>
            <p className="text-red-800 font-semibold">Commande annulée</p>
          </div>
        </div>
      ) : (
        // Timeline normale
        <div className="relative">
          {/* Ligne de progression */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
            <div
              className="h-full bg-indigo-600 transition-all duration-500"
              style={{
                width: `${(currentIndex / (TIMELINE_STEPS.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Étapes */}
          <div className="relative flex justify-between">
            {TIMELINE_STEPS.map((step, index) => {
              const isCompleted = index <= currentIndex
              const isCurrent = index === currentIndex
              const Icon = step.icon

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center"
                  style={{ width: `${100 / TIMELINE_STEPS.length}%` }}
                >
                  {/* Icône de l'étape */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                      isCompleted
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-white border-gray-300 text-gray-400'
                    } ${isCurrent ? 'ring-4 ring-indigo-100' : ''}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Label de l'étape */}
                  <p
                    className={`mt-2 text-xs font-medium text-center ${
                      isCompleted ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default OrderTimeline
