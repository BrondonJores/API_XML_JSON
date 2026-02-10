import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

// Composant d'affichage et de saisie de notation par étoiles
const RatingStars = ({ 
  rating = 0, 
  maxRating = 5, 
  onRatingChange,
  readonly = false,
  size = 'md',
  showCount = false,
  className = ''
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);

  // Tailles d'étoiles
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10'
  };

  // Gestion du clic sur une étoile
  const handleClick = (value) => {
    if (readonly) return;
    setCurrentRating(value);
    if (onRatingChange) {
      onRatingChange(value);
    }
  };

  // Gestion du survol
  const handleMouseEnter = (value) => {
    if (readonly) return;
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  // Déterminer quelle note afficher (survol ou actuelle)
  const displayRating = hoverRating || currentRating;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {/* Étoiles */}
      <div className="flex items-center gap-0.5">
        {[...Array(maxRating)].map((_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= displayRating;

          return (
            <button
              key={starValue}
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onMouseLeave={handleMouseLeave}
              disabled={readonly}
              className={`
                ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                transition-transform
                ${isFilled ? 'text-yellow-400' : 'text-gray-300'}
              `}
              aria-label={`${starValue} étoile${starValue > 1 ? 's' : ''}`}
            >
              {isFilled ? (
                <StarIcon className={sizeClasses[size]} />
              ) : (
                <StarOutlineIcon className={sizeClasses[size]} />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Affichage numérique optionnel */}
      {showCount && (
        <span className="text-sm text-gray-600 ml-1">
          ({currentRating}/{maxRating})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
