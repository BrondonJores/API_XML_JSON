import { 
  InboxIcon, 
  MagnifyingGlassIcon, 
  ExclamationTriangleIcon,
  FolderIcon 
} from '@heroicons/react/24/outline';

// Composant d'état vide avec icône et message
const EmptyState = ({ 
  icon = 'inbox',
  title = 'Aucun résultat',
  description = 'Aucune donnée à afficher pour le moment.',
  actionLabel,
  onAction,
  className = '' 
}) => {
  // Map des icônes disponibles
  const iconComponents = {
    inbox: InboxIcon,
    search: MagnifyingGlassIcon,
    warning: ExclamationTriangleIcon,
    folder: FolderIcon
  };

  // Sélectionner le composant d'icône
  const IconComponent = iconComponents[icon] || InboxIcon;

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
      {/* Icône */}
      <div className="rounded-full bg-gray-100 p-6 mb-4">
        <IconComponent className="h-16 w-16 text-gray-400" />
      </div>
      
      {/* Titre */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className="text-gray-500 text-center max-w-md mb-6">
          {description}
        </p>
      )}
      
      {/* Bouton d'action optionnel */}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
