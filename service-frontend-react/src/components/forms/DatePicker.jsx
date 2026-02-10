import React, { forwardRef } from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Composant DatePicker wrapper pour react-datepicker avec validation
const DatePicker = forwardRef(({
  label,
  error,
  selected,
  onChange,
  placeholder = 'Sélectionner une date',
  dateFormat = 'dd/MM/yyyy',
  minDate,
  maxDate,
  showTimeSelect = false,
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
      
      {/* DatePicker avec style personnalise */}
      <ReactDatePicker
        ref={ref}
        selected={selected}
        onChange={onChange}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        showTimeSelect={showTimeSelect}
        className={`
          w-full px-4 py-2 border rounded-lg transition-colors
          ${error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
          }
          focus:outline-none focus:ring-2 focus:ring-opacity-50
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${className}
        `}
        wrapperClassName="w-full"
        {...rest}
      />
      
      {/* Message d'erreur */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error.message || error}
        </p>
      )}
    </div>
  );
});

DatePicker.displayName = 'DatePicker';

export default DatePicker;
