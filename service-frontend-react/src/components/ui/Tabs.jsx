import React, { useState } from 'react';

// Composant Tabs pour afficher plusieurs onglets
const Tabs = ({ 
  tabs = [],
  defaultTab = 0,
  onChange,
  className = '',
  ...props 
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // Gérer le changement d'onglet
  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) {
      onChange(index);
    }
  };
  
  return (
    <div className={className} {...props}>
      {/* En-têtes des onglets */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => handleTabClick(index)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${
                  activeTab === index
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
              aria-current={activeTab === index ? 'page' : undefined}
            >
              {/* Icône optionnelle */}
              {tab.icon && (
                <span className="mr-2 inline-block">
                  {tab.icon}
                </span>
              )}
              {tab.label}
              
              {/* Badge optionnel */}
              {tab.badge && (
                <span className={`
                  ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                  ${
                    activeTab === index
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }
                `}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Contenu de l'onglet actif */}
      <div className="py-4">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
