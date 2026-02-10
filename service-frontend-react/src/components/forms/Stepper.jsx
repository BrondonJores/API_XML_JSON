import React from 'react';

// Composant Stepper pour indicateur de progression multi-etapes
const Stepper = ({ steps = [], currentStep = 0, className = '' }) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          // Determine l'etat de chaque etape
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isUpcoming = index > currentStep;

          return (
            <React.Fragment key={index}>
              {/* Etape individuelle */}
              <div className="flex flex-col items-center flex-1">
                {/* Cercle numerote */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    font-semibold text-sm transition-colors
                    ${isCompleted 
                      ? 'bg-blue-600 text-white' 
                      : isCurrent 
                        ? 'bg-blue-600 text-white ring-4 ring-blue-200' 
                        : 'bg-gray-200 text-gray-600'
                    }
                  `}
                >
                  {isCompleted ? (
                    // Icone de validation pour les etapes completees
                    <svg 
                      className="w-5 h-5" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  ) : (
                    // Numero de l'etape
                    index + 1
                  )}
                </div>
                
                {/* Label de l'etape */}
                <div className="mt-2 text-center">
                  <p
                    className={`
                      text-sm font-medium
                      ${isCurrent 
                        ? 'text-blue-600' 
                        : isCompleted 
                          ? 'text-gray-700' 
                          : 'text-gray-500'
                      }
                    `}
                  >
                    {step.label || step}
                  </p>
                  {step.description && (
                    <p className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Ligne de connexion entre les etapes */}
              {index < steps.length - 1 && (
                <div
                  className={`
                    h-0.5 flex-1 mx-2 mt-[-40px] transition-colors
                    ${index < currentStep 
                      ? 'bg-blue-600' 
                      : 'bg-gray-200'
                    }
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Stepper;
