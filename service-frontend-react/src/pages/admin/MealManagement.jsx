import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as menuService from '../../services/menuService'
import Button from '../../components/ui/Button'
import Modal from '../../components/ui/Modal'
import Input from '../../components/forms/Input'
import Textarea from '../../components/forms/Textarea'
import Select from '../../components/forms/Select'
import { formatPrice } from '../../utils/formatters'
import { MEAL_CATEGORIES, MEAL_CATEGORY_LABELS } from '../../utils/constants'

function MealManagement() {
  const queryClient = useQueryClient()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingMeal, setEditingMeal] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  })

  const { data: meals, isLoading } = useQuery({
    queryKey: ['meals'],
    queryFn: menuService.getMeals,
  })

  const createMutation = useMutation({
    mutationFn: menuService.createMeal,
    onSuccess: () => {
      queryClient.invalidateQueries(['meals'])
      handleCloseModal()
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => menuService.updateMeal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['meals'])
      handleCloseModal()
    },
  })

  const deleteMutation = useMutation({
    mutationFn: menuService.deleteMeal,
    onSuccess: () => {
      queryClient.invalidateQueries(['meals'])
    },
  })

  const handleOpenModal = (meal = null) => {
    if (meal) {
      setEditingMeal(meal)
      setFormData(meal)
    } else {
      setEditingMeal(null)
      setFormData({ name: '', description: '', price: '', category: '' })
    }
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setEditingMeal(null)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingMeal) {
      updateMutation.mutate({ id: editingMeal.id, data: formData })
    } else {
      createMutation.mutate(formData)
    }
  }

  const categoryOptions = Object.entries(MEAL_CATEGORIES).map(([key, value]) => ({
    value,
    label: MEAL_CATEGORY_LABELS[value],
  }))

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Gestion des plats</h1>
        <Button onClick={() => handleOpenModal()}>
          Ajouter un plat
        </Button>
      </div>

      <div className="card">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3">Nom</th>
              <th className="text-left py-3">Catégorie</th>
              <th className="text-left py-3">Prix</th>
              <th className="text-right py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {meals?.data?.map((meal) => (
              <tr key={meal.id}>
                <td className="py-3">{meal.name}</td>
                <td className="py-3">{MEAL_CATEGORY_LABELS[meal.category]}</td>
                <td className="py-3">{formatPrice(meal.price)}</td>
                <td className="py-3 text-right space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleOpenModal(meal)}>
                    Modifier
                  </Button>
                  <Button 
                    size="sm" 
                    variant="danger"
                    onClick={() => deleteMutation.mutate(meal.id)}
                  >
                    Supprimer
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingMeal ? 'Modifier le plat' : 'Nouveau plat'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
          <Input
            label="Prix (€)"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
          <Select
            label="Catégorie"
            options={categoryOptions}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
          <Button type="submit" fullWidth>
            {editingMeal ? 'Modifier' : 'Créer'}
          </Button>
        </form>
      </Modal>
    </div>
  )
}

export default MealManagement
