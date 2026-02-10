import React, { forwardRef } from 'react';

// Composant Checkbox avec label et support de validation
const Checkbox = forwardRef(({
  label,
  error,
  className = '',
  ...rest
}, ref) => {
  return (
    <div className="w-full">
      {/* Conteneur checkbox et label */}
      <div className="flex items-start">
        {/* Champ checkbox */}
        <input
          ref={ref}
          type="checkbox"
          className={`
            h-4 w-4 mt-0.5 rounded border-gray-300 
            text-blue-600 
            focus:ring-blue-500 focus:ring-2 focus:ring-opacity-50
            disabled:cursor-not-allowed disabled:opacity-50
            ${error ? 'border-red-500' : ''}
            ${className}
          `}
          {...rest}
        />
        
        {/* Label du checkbox */}
        {label && (
          <label className="ml-2 block text-sm text-gray-700 cursor-pointer">
            {label}
          </label>
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

Checkbox.displayName = 'Checkbox';

export default Checkbox;
