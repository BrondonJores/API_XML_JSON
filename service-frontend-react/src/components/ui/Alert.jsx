import React, { useState } from 'react';
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon,
  XMarkIcon 
} from '@heroicons/react/24/outline';

// Composant Alert avec variantes et option de fermeture
const Alert = ({ 
  children, 
  variant = 'info',
  dismissible = false,
  onDismiss,
  className = '',
  ...props 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Gérer la fermeture de l'alerte
  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss();
    }
  };
  
  if (!isVisible) return null;
  
  // Classes de base
  const baseClasses = 'flex items-start p-4 rounded-lg';
  
  // Configuration des variantes avec icônes et couleurs
  const variants = {
    success: {
      classes: 'bg-green-50 text-green-800 border border-green-200',
      icon: CheckCircleIcon,
      iconColor: 'text-green-400',
    },
    error: {
      classes: 'bg-red-50 text-red-800 border border-red-200',
      icon: XCircleIcon,
      iconColor: 'text-red-400',
    },
    warning: {
      classes: 'bg-yellow-50 text-yellow-800 border border-yellow-200',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-yellow-400',
    },
    info: {
      classes: 'bg-blue-50 text-blue-800 border border-blue-200',
      icon: InformationCircleIcon,
      iconColor: 'text-blue-400',
    },
  };
  
  const config = variants[variant];
  const Icon = config.icon;
  
  // Combinaison des classes
  const alertClasses = `${baseClasses} ${config.classes} ${className}`;
  
  return (
    <div className={alertClasses} {...props}>
      {/* Icône de la variante */}
      <Icon className={`h-5 w-5 ${config.iconColor} mr-3 flex-shrink-0`} />
      
      {/* Contenu de l'alerte */}
      <div className="flex-1">
        {children}
      </div>
      
      {/* Bouton de fermeture optionnel */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="ml-3 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-600 transition-colors"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default Alert;
