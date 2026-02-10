import clsx from 'clsx'

function Stepper({ steps, currentStep, onChange }) {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <button
                onClick={() => onChange?.(index)}
                disabled={index > currentStep}
                className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition',
                  index < currentStep && 'bg-primary-600 text-white',
                  index === currentStep && 'bg-primary-600 text-white ring-4 ring-primary-100',
                  index > currentStep && 'bg-gray-200 text-gray-500 cursor-not-allowed'
                )}
              >
                {index + 1}
              </button>
              <span className={clsx(
                'mt-2 text-sm font-medium',
                index <= currentStep ? 'text-gray-900' : 'text-gray-500'
              )}>
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={clsx(
                'flex-1 h-1 mx-4',
                index < currentStep ? 'bg-primary-600' : 'bg-gray-200'
              )} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stepper
