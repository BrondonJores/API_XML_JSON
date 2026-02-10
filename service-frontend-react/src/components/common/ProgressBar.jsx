// Composant de barre de progression avec pourcentage
const ProgressBar = ({ 
  percentage = 0, 
  showLabel = true,
  color = 'blue',
  size = 'md',
  animated = false,
  className = '' 
}) => {
  // Limiter le pourcentage entre 0 et 100
  const validPercentage = Math.min(Math.max(percentage, 0), 100);

  // Classes de couleur
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    red: 'bg-red-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    gray: 'bg-gray-600'
  };

  // Classes de taille
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Label de pourcentage */}
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-gray-700">
            Progression
          </span>
          <span className="text-sm font-semibold text-gray-900">
            {validPercentage.toFixed(0)}%
          </span>
        </div>
      )}
      
      {/* Conteneur de la barre */}
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${sizeClasses[size]}`}>
        {/* Barre de progression */}
        <div
          className={`
            ${colorClasses[color]} 
            ${sizeClasses[size]} 
            rounded-full 
            transition-all 
            duration-500 
            ease-out
            ${animated ? 'animate-pulse' : ''}
          `}
          style={{ width: `${validPercentage}%` }}
          role="progressbar"
          aria-valuenow={validPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
    </div>
  );
};

export default ProgressBar;
