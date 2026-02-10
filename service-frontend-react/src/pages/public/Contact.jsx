import { useState } from 'react'
import Input from '../../components/forms/Input'
import Textarea from '../../components/forms/Textarea'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="py-8">
      <div className="container-custom max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Contactez-nous</h1>

        {submitted && (
          <Alert type="success" onClose={() => setSubmitted(false)} className="mb-6">
            Votre message a été envoyé avec succès !
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nom"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />

          <Textarea
            label="Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            required
          />

          <Button type="submit" fullWidth>
            Envoyer
          </Button>
        </form>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-2">Adresse</h3>
            <p className="text-gray-600">123 Rue Example<br />75001 Paris</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-gray-600">Email: contact@restaurant.fr<br />Tél: 01 23 45 67 89</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
