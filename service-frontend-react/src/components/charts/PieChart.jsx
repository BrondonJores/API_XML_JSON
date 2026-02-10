import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Enregistrement des composants Chart.js necessaires
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

/**
 * Composant PieChart - Graphique en camembert avec Chart.js
 * @param {Object} data - Donnees du graphique
 * @param {Object} options - Options de configuration du graphique
 * @param {string} height - Hauteur du graphique
 */
const PieChart = ({ data, options = {}, height = '300px' }) => {
  // Options par defaut pour le graphique en camembert
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          },
          generateLabels: function(chart) {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const meta = chart.getDatasetMeta(0);
                const style = meta.controller.getStyle(i);
                const value = data.datasets[0].data[i];
                
                return {
                  text: `${label}: ${value}`,
                  fillStyle: style.backgroundColor,
                  strokeStyle: style.borderColor,
                  lineWidth: style.borderWidth,
                  hidden: isNaN(value) || meta.data[i].hidden,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        cornerRadius: 8,
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  // Fusion des options par defaut avec les options personnalisees
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    plugins: {
      ...defaultOptions.plugins,
      ...options.plugins
    }
  };

  return (
    <div style={{ height }} className="w-full flex items-center justify-center">
      <Pie data={data} options={mergedOptions} />
    </div>
  );
};

export default PieChart;
