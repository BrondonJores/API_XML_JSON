import { useState } from 'react'
import clsx from 'clsx'

// Composant Tabs
function Tabs({ children, defaultTab = 0, onChange }) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = (index) => {
    setActiveTab(index)
    onChange?.(index)
  }

  return (
    <div className="w-full">
      {/* Navigation des tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {children.map((child, index) => (
            <button
              key={index}
              onClick={() => handleTabChange(index)}
              className={clsx(
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                activeTab === index
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              {child.props.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Contenu du tab actif */}
      <div className="mt-6">
        {children[activeTab]}
      </div>
    </div>
  )
}

// Composant TabPanel
Tabs.Panel = function TabPanel({ children, label }) {
  return <div>{children}</div>
}

export default Tabs
