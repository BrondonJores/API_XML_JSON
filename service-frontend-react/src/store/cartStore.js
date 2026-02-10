import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { STORAGE_KEYS } from '../utils/constants'

/**
 * Store du panier avec Zustand et persistance
 */
const useCartStore = create(
  persist(
    (set, get) => ({
      // État
      items: [],
      totalItems: 0,
      totalPrice: 0,

      // Actions
      /**
       * Ajout d'un article au panier
       * @param {object} meal - Plat à ajouter
       * @param {number} quantity - Quantité
       */
      addItem: (meal, quantity = 1) => {
        const { items } = get()
        const existingItem = items.find((item) => item.id === meal.id)

        let updatedItems
        if (existingItem) {
          updatedItems = items.map((item) =>
            item.id === meal.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        } else {
          updatedItems = [...items, { ...meal, quantity }]
        }

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )

        set({ items: updatedItems, totalItems, totalPrice })
      },

      /**
       * Mise à jour de la quantité d'un article
       * @param {number} mealId - ID du plat
       * @param {number} quantity - Nouvelle quantité
       */
      updateQuantity: (mealId, quantity) => {
        const { items } = get()
        
        if (quantity <= 0) {
          get().removeItem(mealId)
          return
        }

        const updatedItems = items.map((item) =>
          item.id === mealId ? { ...item, quantity } : item
        )

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )

        set({ items: updatedItems, totalItems, totalPrice })
      },

      /**
       * Suppression d'un article du panier
       * @param {number} mealId - ID du plat
       */
      removeItem: (mealId) => {
        const { items } = get()
        const updatedItems = items.filter((item) => item.id !== mealId)

        const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0)
        const totalPrice = updatedItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        )

        set({ items: updatedItems, totalItems, totalPrice })
      },

      /**
       * Vidage du panier
       */
      clearCart: () => {
        set({ items: [], totalItems: 0, totalPrice: 0 })
      },

      /**
       * Vérification si un article est dans le panier
       * @param {number} mealId - ID du plat
       * @returns {boolean} Présence dans le panier
       */
      hasItem: (mealId) => {
        const { items } = get()
        return items.some((item) => item.id === mealId)
      },

      /**
       * Récupération de la quantité d'un article
       * @param {number} mealId - ID du plat
       * @returns {number} Quantité
       */
      getItemQuantity: (mealId) => {
        const { items } = get()
        const item = items.find((item) => item.id === mealId)
        return item ? item.quantity : 0
      },

      /**
       * Récupération du nombre d'articles uniques
       * @returns {number} Nombre d'articles
       */
      getUniqueItemsCount: () => {
        return get().items.length
      },
    }),
    {
      name: STORAGE_KEYS.CART,
      version: 1,
    }
  )
)

export default useCartStore
