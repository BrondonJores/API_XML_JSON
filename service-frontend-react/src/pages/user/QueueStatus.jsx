import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import * as orderService from '../../services/orderService'
import ProgressBar from '../../components/common/ProgressBar'
import { formatWaitTime } from '../../utils/formatters'

function QueueStatus() {
  const { orderId } = useParams()
  
  const { data: position } = useQuery({
    queryKey: ['queuePosition', orderId],
    queryFn: () => orderService.getQueuePosition(orderId),
    refetchInterval: 10000,
  })

  const { data: waitTime } = useQuery({
    queryKey: ['estimatedTime', orderId],
    queryFn: () => orderService.getEstimatedWaitTime(orderId),
    refetchInterval: 10000,
  })

  return (
    <div className="py-8">
      <div className="container-custom max-w-2xl">
        <div className="card text-center">
          <h1 className="text-3xl font-bold mb-8">File d'attente</h1>
          
          <div className="mb-8">
            <p className="text-6xl font-bold text-primary-600 mb-2">
              {position?.position || 0}
            </p>
            <p className="text-gray-600">Commandes avant la vôtre</p>
          </div>

          <div className="mb-8">
            <ProgressBar 
              value={position?.total - position?.position} 
              max={position?.total} 
              color="success"
              size="lg"
              showLabel
            />
          </div>

          <div>
            <p className="text-gray-600 mb-2">Temps d'attente estimé</p>
            <p className="text-2xl font-semibold">
              {waitTime ? formatWaitTime(waitTime.minutes) : '...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QueueStatus
