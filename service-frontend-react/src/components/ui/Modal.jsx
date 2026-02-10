import React, { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

// Composant Modal avec overlay, bouton de fermeture et contenu personnalisable
const Modal = ({ 
  isOpen, 
  onClose, 
  title,
  children,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  className = '',
  ...props 
}) => {
  // Empêcher le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  
  // Gérer la fermeture avec la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  // Classes selon la taille
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  
  // Gérer le clic sur l'overlay
  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={handleOverlayClick}
      {...props}
    >
      {/* Contenu du modal */}
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} ${className}`}>
        {/* En-tête avec titre et bouton de fermeture */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">
                {title}
              </h3>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            )}
          </div>
        )}
        
        {/* Corps du modal */}
        <div className="px-6 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
