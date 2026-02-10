import BarChart from '../../components/charts/BarChart'
import PieChart from '../../components/charts/PieChart'

function Analytics() {
  const barData = {
    labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [{
      label: 'Revenus',
      data: [1200, 1900, 3000, 5000, 2300, 3200],
      backgroundColor: 'rgba(14, 165, 233, 0.5)',
    }],
  }

  const pieData = {
    labels: ['Entrées', 'Plats', 'Desserts', 'Boissons'],
    datasets: [{
      data: [30, 40, 20, 10],
      backgroundColor: ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444'],
    }],
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Revenus mensuels</h2>
          <BarChart data={barData} />
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold mb-6">Répartition par catégorie</h2>
          <PieChart data={pieData} />
        </div>
      </div>
    </div>
  )
}

export default Analytics
