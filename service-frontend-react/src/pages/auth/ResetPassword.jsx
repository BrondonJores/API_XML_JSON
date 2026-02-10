import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Input from '../../components/forms/Input'
import Button from '../../components/ui/Button'

function ResetPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Les mots de passe ne correspondent pas')
      return
    }

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/auth/login')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Nouveau mot de passe</h2>
          <p className="text-gray-600 mt-2">Choisissez un nouveau mot de passe</p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nouveau mot de passe"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              label="Confirmer le mot de passe"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            <Button type="submit" fullWidth loading={loading}>
              Réinitialiser
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
