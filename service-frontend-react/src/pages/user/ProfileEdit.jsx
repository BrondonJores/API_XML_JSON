import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/forms/Input'
import Button from '../../components/ui/Button'

function ProfileEdit() {
  const navigate = useNavigate()
  const { user, updateProfile } = useAuth()
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await updateProfile(formData)
      navigate('/user/profile')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="py-8">
      <div className="container-custom max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Modifier mon profil</h1>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Prénom"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
              <Input
                label="Nom"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>

            <Input
              label="Téléphone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />

            <Input
              label="Adresse"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />

            <div className="flex space-x-4">
              <Button type="submit" loading={loading}>
                Enregistrer
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/user/profile')}>
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit
