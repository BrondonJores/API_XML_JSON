import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Store pour gérer le panier
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      deliveryInfo: null,
      
      // Ajouter un item au panier
      addItem: (meal, quantity = 1, customization = {}) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          item => item.meal.id === meal.id && 
          JSON.stringify(item.customization) === JSON.stringify(customization)
        )

        if (existingItemIndex > -1) {
          // Augmenter la quantité si l'item existe
          const newItems = [...items]
          newItems[existingItemIndex].quantity += quantity
          set({ items: newItems })
        } else {
          // Ajouter un nouvel item
          set({
            items: [
              ...items,
              {
                id: Date.now(),
                meal,
                quantity,
                customization,
                price: meal.price,
              }
            ]
          })
        }
      },

      // Retirer un item du panier
      removeItem: (itemId) => {
        set({
          items: get().items.filter(item => item.id !== itemId)
        })
      },

      // Mettre à jour la quantité d'un item
      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }
        
        const newItems = get().items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
        set({ items: newItems })
      },

      // Vider le panier
      clearCart: () => {
        set({ items: [], deliveryInfo: null })
      },

      // Définir les informations de livraison
      setDeliveryInfo: (info) => {
        set({ deliveryInfo: info })
      },

      // Calculer le total
      getTotal: () => {
        return get().items.reduce((total, item) => {
          return total + (item.price * item.quantity)
        }, 0)
      },

      // Calculer le nombre total d'items
      getTotalItems: () => {
        return get().items.reduce((total, item) => {
          return total + item.quantity
        }, 0)
      },

      // Récupérer les items formatés pour la commande
      getOrderItems: () => {
        return get().items.map(item => ({
          mealId: item.meal.id,
          quantity: item.quantity,
          customization: item.customization,
          price: item.price,
        }))
      },

      // Vérifier si un plat est dans le panier
      isInCart: (mealId) => {
        return get().items.some(item => item.meal.id === mealId)
      },

      // Obtenir la quantité d'un plat dans le panier
      getItemQuantity: (mealId) => {
        const item = get().items.find(item => item.meal.id === mealId)
        return item ? item.quantity : 0
      },
    }),
    {
      name: 'cart-storage',
    }
  )
)
