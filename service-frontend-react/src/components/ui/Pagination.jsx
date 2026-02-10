import clsx from 'clsx'
import Button from './Button'

// Composant Pagination
function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showEdges = true,
  maxVisible = 5,
  className,
}) {
  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages = []
    const halfVisible = Math.floor(maxVisible / 2)
    
    let start = Math.max(1, currentPage - halfVisible)
    let end = Math.min(totalPages, currentPage + halfVisible)
    
    // Ajuster si on est près du début ou de la fin
    if (currentPage <= halfVisible) {
      end = Math.min(totalPages, maxVisible)
    }
    if (currentPage + halfVisible >= totalPages) {
      start = Math.max(1, totalPages - maxVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
    
    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className={clsx('flex items-center justify-center space-x-2', className)}>
      {/* Bouton Précédent */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </Button>

      {/* Première page */}
      {showEdges && !pageNumbers.includes(1) && (
        <>
          <Button
            variant={currentPage === 1 ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onPageChange(1)}
          >
            1
          </Button>
          <span className="px-2">...</span>
        </>
      )}

      {/* Numéros de page */}
      {pageNumbers.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'primary' : 'outline'}
          size="sm"
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      {/* Dernière page */}
      {showEdges && !pageNumbers.includes(totalPages) && (
        <>
          <span className="px-2">...</span>
          <Button
            variant={currentPage === totalPages ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Bouton Suivant */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </Button>
    </div>
  )
}

export default Pagination
