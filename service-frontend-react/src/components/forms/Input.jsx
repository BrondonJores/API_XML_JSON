import React, { forwardRef } from 'react';

// Composant Input avec support des icones, validation et messages d'erreur
const Input = forwardRef(({
  label,
  error,
  placeholder,
  type = 'text',
  leftIcon,
  rightIcon,
  className = '',
  ...rest
}, ref) => {
  return (
    <div className="w-full">
      {/* Label du champ */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      {/* Conteneur du champ avec icones */}
      <div className="relative">
        {/* Icone gauche */}
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        {/* Champ de saisie */}
        <input
          ref={ref}
          type={type}
          placeholder={placeholder}
          className={`
            w-full px-4 py-2 border rounded-lg transition-colors
            ${leftIcon ? 'pl-10' : ''}
            ${rightIcon ? 'pr-10' : ''}
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${className}
          `}
          {...rest}
        />
        
        {/* Icone droite */}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      
      {/* Message d'erreur */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message || error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
