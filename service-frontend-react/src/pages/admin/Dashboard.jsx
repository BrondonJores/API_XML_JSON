import { useQuery } from '@tanstack/react-query'
import * as orderService from '../../services/orderService'
import StatsCard from '../../components/charts/StatsCard'
import LineChart from '../../components/charts/LineChart'
import Loader from '../../components/ui/Loader'

function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['orderStats'],
    queryFn: () => orderService.getOrderStats('week'),
  })

  if (isLoading) {
    return <div className="flex justify-center"><Loader size="lg" /></div>
  }

  const chartData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [{
      label: 'Commandes',
      data: stats?.dailyOrders || [],
      borderColor: 'rgb(14, 165, 233)',
      backgroundColor: 'rgba(14, 165, 233, 0.1)',
    }],
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Commandes aujourd'hui"
          value={stats?.todayOrders || 0}
          icon="📦"
          color="primary"
          trend="up"
          trendValue="+12%"
        />
        <StatsCard
          title="Revenu"
          value={`${stats?.revenue || 0}€`}
          icon="💰"
          color="success"
          trend="up"
          trendValue="+8%"
        />
        <StatsCard
          title="Clients"
          value={stats?.customers || 0}
          icon="👥"
          color="warning"
        />
        <StatsCard
          title="Plats actifs"
          value={stats?.activeMeals || 0}
          icon="🍽️"
          color="primary"
        />
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold mb-6">Commandes de la semaine</h2>
        <LineChart data={chartData} />
      </div>
    </div>
  )
}

export default Dashboard
