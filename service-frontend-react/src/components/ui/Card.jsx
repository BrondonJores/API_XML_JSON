import React from 'react';

// Composant Card avec en-tête, corps et pied de page optionnels
const Card = ({ 
  children, 
  header, 
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  ...props 
}) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}
      {...props}
    >
      {/* En-tête optionnel */}
      {header && (
        <div className={`px-6 py-4 border-b border-gray-200 ${headerClassName}`}>
          {header}
        </div>
      )}
      
      {/* Corps principal */}
      <div className={`px-6 py-4 ${bodyClassName}`}>
        {children}
      </div>
      
      {/* Pied de page optionnel */}
      {footer && (
        <div className={`px-6 py-4 border-t border-gray-200 bg-gray-50 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
