import { useState } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../components/forms/Input'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setSent(true)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Mot de passe oublié</h2>
          <p className="text-gray-600 mt-2">Entrez votre email pour réinitialiser votre mot de passe</p>
        </div>

        <div className="card">
          {sent ? (
            <Alert type="success">
              Un email de réinitialisation a été envoyé à {email}
            </Alert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Button type="submit" fullWidth loading={loading}>
                Envoyer
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/auth/login" className="text-sm text-primary-600 hover:text-primary-700">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
