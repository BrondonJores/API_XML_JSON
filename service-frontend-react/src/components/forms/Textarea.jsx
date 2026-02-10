import React, { forwardRef, useState } from 'react';

// Composant Textarea avec validation, messages d'erreur et compteur de caracteres
const Textarea = forwardRef(({
  label,
  error,
  placeholder,
  maxLength,
  rows = 4,
  showCounter = false,
  className = '',
  onChange,
  ...rest
}, ref) => {
  const [charCount, setCharCount] = useState(0);

  // Gestion du changement de valeur
  const handleChange = (e) => {
    setCharCount(e.target.value.length);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="w-full">
      {/* Label du champ */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      {/* Champ textarea */}
      <textarea
        ref={ref}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={handleChange}
        className={`
          w-full px-4 py-2 border rounded-lg transition-colors resize-none
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
      
      {/* Ligne inferieure avec compteur et erreur */}
      <div className="flex justify-between items-start mt-1">
        {/* Message d'erreur */}
        <div className="flex-1">
          {error && (
            <p className="text-sm text-red-600">
              {error.message || error}
            </p>
          )}
        </div>
        
        {/* Compteur de caracteres */}
        {(showCounter || maxLength) && (
          <p className="text-sm text-gray-500 ml-2">
            {charCount}
            {maxLength && ` / ${maxLength}`}
          </p>
        )}
      </div>
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
