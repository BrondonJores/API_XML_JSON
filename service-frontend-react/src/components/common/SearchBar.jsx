import { useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Composant de barre de recherche avec icône et bouton de suppression
const SearchBar = ({ 
  placeholder = 'Rechercher...', 
  onSearch, 
  defaultValue = '',
  className = '' 
}) => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  // Gestion du changement de valeur
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Effacer la recherche
  const handleClear = () => {
    setSearchTerm('');
    if (onSearch) {
      onSearch('');
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Icône de recherche */}
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
      </div>
      
      {/* Champ de saisie */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
      />
      
      {/* Bouton de suppression */}
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-700 text-gray-400 transition-colors"
          aria-label="Effacer la recherche"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
