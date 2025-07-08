import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 4, 
  steps = [],
  onStepClick = null,
  variant = 'dots',
  className = ''
}) => {
  const defaultSteps = [
    { label: 'Service Selection', description: 'Choose your cleaning service' },
    { label: 'Schedule', description: 'Pick date and time' },
    { label: 'Details', description: 'Add special instructions' },
    { label: 'Payment', description: 'Complete your booking' }
  ];

  const stepData = steps.length > 0 ? steps : defaultSteps.slice(0, totalSteps);

  const getStepStatus = (stepIndex) => {
    const stepNumber = stepIndex + 1;
    if (stepNumber < currentStep) return 'completed';
    if (stepNumber === currentStep) return 'current';
    return 'upcoming';
  };

  if (variant === 'dots') {
    return (
      <div className={`flex items-center justify-center space-x-2 py-4 ${className}`}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const status = getStepStatus(index);
          const isClickable = onStepClick && (status === 'completed' || status === 'current');
          
          return (
            <button
              key={index}
              onClick={isClickable ? () => onStepClick(index + 1) : undefined}
              disabled={!isClickable}
              className={`
                w-3 h-3 rounded-full transition-smooth
                ${status === 'completed' ? 'bg-success' : ''}
                ${status === 'current' ? 'bg-primary' : ''}
                ${status === 'upcoming' ? 'bg-secondary-200' : ''}
                ${isClickable ? 'hover:scale-110 cursor-pointer' : 'cursor-default'}
              `}
              aria-label={`Step ${index + 1}${stepData[index] ? `: ${stepData[index].label}` : ''}`}
            />
          );
        })}
      </div>
    );
  }

  return (
    <div className={`bg-surface border-b border-border ${className}`}>
      <div className="px-4 py-4">
        {/* Mobile Progress Bar */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-text-primary">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm text-text-secondary">
              {Math.round((currentStep / totalSteps) * 100)}%
            </span>
          </div>
          
          <div className="w-full bg-secondary-100 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          
          {stepData[currentStep - 1] && (
            <div className="mt-3">
              <h3 className="text-base font-medium text-text-primary">
                {stepData[currentStep - 1].label}
              </h3>
              <p className="text-sm text-text-secondary">
                {stepData[currentStep - 1].description}
              </p>
            </div>
          )}
        </div>

        {/* Desktop Step Indicator */}
        <div className="hidden md:block">
          <div className="flex items-center justify-between">
            {stepData.map((step, index) => {
              const status = getStepStatus(index);
              const isClickable = onStepClick && (status === 'completed' || status === 'current');
              const stepNumber = index + 1;
              
              return (
                <div key={index} className="flex items-center flex-1">
                  <button
                    onClick={isClickable ? () => onStepClick(stepNumber) : undefined}
                    disabled={!isClickable}
                    className={`
                      flex items-center space-x-3 p-2 rounded-lg transition-smooth
                      ${isClickable ? 'hover:bg-secondary-50 cursor-pointer' : 'cursor-default'}
                    `}
                  >
                    {/* Step Circle */}
                    <div
                      className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                        ${status === 'completed' ? 'bg-success text-success-foreground' : ''}
                        ${status === 'current' ? 'bg-primary text-primary-foreground' : ''}
                        ${status === 'upcoming' ? 'bg-secondary-200 text-text-secondary' : ''}
                      `}
                    >
                      {status === 'completed' ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        stepNumber
                      )}
                    </div>
                    
                    {/* Step Info */}
                    <div className="text-left">
                      <div
                        className={`
                          text-sm font-medium
                          ${status === 'current' ? 'text-primary' : ''}
                          ${status === 'completed' ? 'text-success' : ''}
                          ${status === 'upcoming' ? 'text-text-secondary' : ''}
                        `}
                      >
                        {step.label}
                      </div>
                      <div className="text-xs text-text-muted">
                        {step.description}
                      </div>
                    </div>
                  </button>
                  
                  {/* Connector Line */}
                  {index < stepData.length - 1 && (
                    <div className="flex-1 h-px mx-4">
                      <div
                        className={`
                          h-full
                          ${stepNumber < currentStep ? 'bg-success' : 'bg-secondary-200'}
                        `}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;