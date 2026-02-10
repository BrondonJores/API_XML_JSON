import React from 'react';

// Composant Skeleton pour les placeholders de chargement
const Skeleton = ({ 
  variant = 'text',
  width,
  height,
  className = '',
  count = 1,
  ...props 
}) => {
  // Classes de base avec animation de pulsation
  const baseClasses = 'animate-pulse bg-gray-200 rounded';
  
  // Classes selon la variante
  const variantClasses = {
    text: 'h-4',
    title: 'h-6',
    subtitle: 'h-5',
    circle: 'rounded-full',
    rectangular: 'rounded-md',
  };
  
  // Style inline pour les dimensions personnalisées
  const style = {
    width: width || undefined,
    height: height || variantClasses[variant] || undefined,
  };
  
  // Combinaison des classes
  const skeletonClasses = `${baseClasses} ${variantClasses[variant] || ''} ${className}`;
  
  // Gérer plusieurs skeletons
  if (count > 1) {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, index) => (
          <div 
            key={index}
            className={skeletonClasses}
            style={style}
            {...props}
          />
        ))}
      </div>
    );
  }
  
  return (
    <div 
      className={skeletonClasses}
      style={style}
      {...props}
    />
  );
};

// Composants pré-configurés pour usage courant
export const SkeletonText = (props) => <Skeleton variant="text" {...props} />;
export const SkeletonTitle = (props) => <Skeleton variant="title" {...props} />;
export const SkeletonCircle = (props) => <Skeleton variant="circle" {...props} />;
export const SkeletonCard = ({ className = '', ...props }) => (
  <div className={`p-4 border border-gray-200 rounded-lg ${className}`} {...props}>
    <SkeletonTitle className="w-3/4 mb-4" />
    <SkeletonText count={3} />
  </div>
);

export default Skeleton;
