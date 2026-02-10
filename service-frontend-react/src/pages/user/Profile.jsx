import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../../components/ui/Button'

function Profile() {
  const { user } = useAuth()

  return (
    <div className="py-8">
      <div className="container-custom max-w-2xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Mon profil</h1>
          <Link to="/user/profile/edit">
            <Button>Modifier</Button>
          </Link>
        </div>

        <div className="card space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Nom complet</h3>
            <p className="mt-1 text-lg">{user?.firstName} {user?.lastName}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Email</h3>
            <p className="mt-1 text-lg">{user?.email}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Téléphone</h3>
            <p className="mt-1 text-lg">{user?.phone || 'Non renseigné'}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Adresse</h3>
            <p className="mt-1 text-lg">{user?.address || 'Non renseignée'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
