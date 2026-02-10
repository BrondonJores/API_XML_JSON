import { useEffect } from 'react'
import AppRoutes from './routes/AppRoutes'
import { useAuthStore } from './store/authStore'

function App() {
  const initAuth = useAuthStore((state) => state.initAuth)

  // Initialiser l'authentification au démarrage
  useEffect(() => {
    initAuth()
  }, [initAuth])

  return <AppRoutes />
}

export default App
