import { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import Input from '../../components/forms/Input'
import Textarea from '../../components/forms/Textarea'
import Button from '../../components/ui/Button'
import Alert from '../../components/ui/Alert'

/**
 * Page de contact avec formulaire de contact (nom, email, sujet, message),
 * informations de contact et placeholder de carte
 */
const Contact = () => {
  const [submitStatus, setSubmitStatus] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  // Gestion de la soumission du formulaire
  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulation de l'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      console.log('Formulaire soumis:', data)

      setSubmitStatus({
        type: 'success',
        message: 'Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.',
      })
      reset()
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Une erreur est survenue lors de l&apos;envoi du message. Veuillez réessayer.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Informations de contact
  const contactInfo = [
    {
      icon: PhoneIcon,
      title: 'Téléphone',
      details: '+33 1 23 45 67 89',
      link: 'tel:+33123456789',
    },
    {
      icon: EnvelopeIcon,
      title: 'Email',
      details: 'contact@restaurant.fr',
      link: 'mailto:contact@restaurant.fr',
    },
    {
      icon: MapPinIcon,
      title: 'Adresse',
      details: '123 Rue de la Gastronomie, 75001 Paris, France',
      link: 'https://maps.google.com',
    },
    {
      icon: ClockIcon,
      title: 'Horaires',
      details: 'Lun-Dim : 11h00 - 22h00',
      link: null,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Section Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Contactez-nous</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Nous sommes à votre écoute. N&apos;hésitez pas à nous contacter pour toute question ou demande.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Nos coordonnées</h2>
              <div className="space-y-4">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon
                  const content = (
                    <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{info.title}</h3>
                        <p className="text-gray-600 text-sm">{info.details}</p>
                      </div>
                    </div>
                  )

                  return info.link ? (
                    <a
                      key={index}
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  )
                })}
              </div>
            </div>

            {/* Carte placeholder */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPinIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Carte interactive</p>
                    <p className="text-sm text-gray-400">123 Rue de la Gastronomie</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-semibold text-gray-800 mb-3">Besoin d&apos;aide ?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Consultez notre FAQ ou contactez notre service client pour obtenir des réponses rapides
                à vos questions.
              </p>
              <Button variant="primary" size="sm" className="w-full">
                Consulter la FAQ
              </Button>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Envoyez-nous un message</h2>

              {/* Affichage du statut de soumission */}
              {submitStatus && (
                <div className="mb-6">
                  <Alert
                    type={submitStatus.type}
                    message={submitStatus.message}
                    onClose={() => setSubmitStatus(null)}
                  />
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Nom */}
                <Input
                  label="Nom complet"
                  type="text"
                  placeholder="Votre nom"
                  error={errors.name}
                  {...register('name', {
                    required: 'Le nom est requis',
                    minLength: {
                      value: 2,
                      message: 'Le nom doit contenir au moins 2 caractères',
                    },
                  })}
                />

                {/* Email */}
                <Input
                  label="Adresse email"
                  type="email"
                  placeholder="votre.email@example.com"
                  error={errors.email}
                  {...register('email', {
                    required: 'L&apos;email est requis',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Adresse email invalide',
                    },
                  })}
                />

                {/* Téléphone optionnel */}
                <Input
                  label="Numéro de téléphone (optionnel)"
                  type="tel"
                  placeholder="+33 1 23 45 67 89"
                  error={errors.phone}
                  {...register('phone')}
                />

                {/* Sujet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                  <select
                    className={`w-full px-4 py-2 border rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                      errors.subject
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                    }`}
                    {...register('subject', { required: 'Le sujet est requis' })}
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="general">Question générale</option>
                    <option value="reservation">Réservation</option>
                    <option value="order">Commande</option>
                    <option value="feedback">Avis et suggestions</option>
                    <option value="complaint">Réclamation</option>
                    <option value="other">Autre</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <Textarea
                  label="Votre message"
                  placeholder="Écrivez votre message ici..."
                  rows={6}
                  maxLength={1000}
                  showCounter
                  error={errors.message}
                  {...register('message', {
                    required: 'Le message est requis',
                    minLength: {
                      value: 10,
                      message: 'Le message doit contenir au moins 10 caractères',
                    },
                    maxLength: {
                      value: 1000,
                      message: 'Le message ne peut pas dépasser 1000 caractères',
                    },
                  })}
                />

                {/* Consentement RGPD */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    {...register('consent', {
                      required: 'Vous devez accepter les conditions',
                    })}
                  />
                  <label htmlFor="consent" className="text-sm text-gray-600">
                    J&apos;accepte que mes données soient utilisées pour traiter ma demande conformément à
                    la politique de confidentialité.
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-sm text-red-600 -mt-4">{errors.consent.message}</p>
                )}

                {/* Bouton de soumission */}
                <Button type="submit" size="lg" loading={isSubmitting} className="w-full">
                  {isSubmitting ? (
                    'Envoi en cours...'
                  ) : (
                    <>
                      <EnvelopeIcon className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Informations complémentaires */}
            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <CheckCircleIcon className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Temps de réponse</h3>
                  <p className="text-sm text-gray-600">
                    Nous nous engageons à répondre à votre message dans un délai de 24 à 48 heures
                    pendant les jours ouvrables. Pour les demandes urgentes, n&apos;hésitez pas à nous
                    appeler directement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Vous préférez commander ?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Explorez notre menu et passez commande en quelques clics
          </p>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
            Voir le menu
          </Button>
        </div>
      </section>
    </div>
  )
}

export default Contact
