import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/solid';

/**
 * Composant StatsCard - Carte de statistiques avec icone et indicateur de changement
 * @param {ReactNode} icon - Icone a afficher
 * @param {string} label - Libelle de la statistique
 * @param {string|number} value - Valeur de la statistique
 * @param {number} change - Pourcentage de changement (positif ou negatif)
 * @param {string} changeLabel - Libelle du changement (ex: "vs mois dernier")
 * @param {string} iconBgColor - Couleur de fond de l'icone (classe Tailwind)
 * @param {string} iconColor - Couleur de l'icone (classe Tailwind)
 */
const StatsCard = ({ 
  icon, 
  label, 
  value, 
  change = null, 
  changeLabel = '',
  iconBgColor = 'bg-blue-100',
  iconColor = 'text-blue-600'
}) => {
  // Determination si le changement est positif ou negatif
  const isPositive = change !== null && change >= 0;
  const hasChange = change !== null;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {/* Libelle de la statistique */}
          <p className="text-sm font-medium text-gray-600 mb-1">
            {label}
          </p>
          
          {/* Valeur de la statistique */}
          <p className="text-2xl font-bold text-gray-900 mb-2">
            {value}
          </p>
          
          {/* Indicateur de changement */}
          {hasChange && (
            <div className="flex items-center gap-1">
              <div className={`flex items-center ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {isPositive ? (
                  <ArrowUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowDownIcon className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold">
                  {Math.abs(change)}%
                </span>
              </div>
              {changeLabel && (
                <span className="text-xs text-gray-500">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>
        
        {/* Icone de la statistique */}
        {icon && (
          <div className={`flex-shrink-0 ${iconBgColor} ${iconColor} p-3 rounded-lg`}>
            <div className="w-6 h-6">
              {icon}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
