import React, { forwardRef } from 'react';

// Composant Select avec validation et messages d'erreur
const Select = forwardRef(({
  label,
  error,
  options = [],
  placeholder = 'Sélectionner...',
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
      
      {/* Champ select */}
      <div className="relative">
        <select
          ref={ref}
          className={`
            w-full px-4 py-2 border rounded-lg transition-colors
            appearance-none bg-white
            ${error 
              ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
              : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
            }
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${className}
          `}
          {...rest}
        >
          {/* Option placeholder */}
          <option value="">{placeholder}</option>
          
          {/* Options du select */}
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Icone fleche vers le bas */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
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

Select.displayName = 'Select';

export default Select;
