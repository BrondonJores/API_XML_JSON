import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

// Composant Pagination avec numéros de page et navigation
const Pagination = ({ 
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  maxVisiblePages = 5,
  showFirstLast = true,
  className = '',
  ...props 
}) => {
  // Calculer la plage de pages à afficher
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    // Ajuster si on est proche de la fin
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  const pages = getPageNumbers();
  
  // Gérer le changement de page
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };
  
  // Classes pour les boutons
  const baseButtonClasses = 'relative inline-flex items-center px-4 py-2 text-sm font-medium transition-colors';
  const activeClasses = 'z-10 bg-blue-600 text-white border-blue-600';
  const inactiveClasses = 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50';
  const disabledClasses = 'bg-gray-100 text-gray-400 cursor-not-allowed';
  
  return (
    <div className={`flex items-center justify-center ${className}`} {...props}>
      <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
        {/* Bouton Première page */}
        {showFirstLast && (
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`
              ${baseButtonClasses} rounded-l-md border
              ${currentPage === 1 ? disabledClasses : inactiveClasses}
            `}
          >
            <span className="sr-only">Première page</span>
            <ChevronLeftIcon className="h-5 w-5" />
            <ChevronLeftIcon className="h-5 w-5 -ml-3" />
          </button>
        )}
        
        {/* Bouton Page précédente */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`
            ${baseButtonClasses} border
            ${!showFirstLast ? 'rounded-l-md' : ''}
            ${currentPage === 1 ? disabledClasses : inactiveClasses}
          `}
        >
          <span className="sr-only">Page précédente</span>
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        
        {/* Ellipse de début si nécessaire */}
        {pages[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`${baseButtonClasses} border ${inactiveClasses}`}
            >
              1
            </button>
            {pages[0] > 2 && (
              <span className={`${baseButtonClasses} border bg-white text-gray-700`}>
                ...
              </span>
            )}
          </>
        )}
        
        {/* Numéros de page */}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`
              ${baseButtonClasses} border
              ${page === currentPage ? activeClasses : inactiveClasses}
            `}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
        
        {/* Ellipse de fin si nécessaire */}
        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span className={`${baseButtonClasses} border bg-white text-gray-700`}>
                ...
              </span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className={`${baseButtonClasses} border ${inactiveClasses}`}
            >
              {totalPages}
            </button>
          </>
        )}
        
        {/* Bouton Page suivante */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`
            ${baseButtonClasses} border
            ${!showFirstLast ? 'rounded-r-md' : ''}
            ${currentPage === totalPages ? disabledClasses : inactiveClasses}
          `}
        >
          <span className="sr-only">Page suivante</span>
          <ChevronRightIcon className="h-5 w-5" />
        </button>
        
        {/* Bouton Dernière page */}
        {showFirstLast && (
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`
              ${baseButtonClasses} rounded-r-md border
              ${currentPage === totalPages ? disabledClasses : inactiveClasses}
            `}
          >
            <span className="sr-only">Dernière page</span>
            <ChevronRightIcon className="h-5 w-5 -mr-3" />
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
