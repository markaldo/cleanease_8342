import React from 'react';
import Icon from '../../../components/AppIcon';


const SpecialInstructions = ({ 
  instructions = '', 
  onInstructionsChange,
  className = '' 
}) => {
  const commonInstructions = [
    'Please remove shoes when entering',
    'Pet-friendly cleaning products only',
    'Focus extra attention on kitchen',
    'Avoid moving fragile items',
    'Use eco-friendly products',
    'Please be quiet (baby sleeping)',
    'Extra attention to bathroom tiles',
    'Organize items while cleaning'
  ];

  const handleQuickAdd = (instruction) => {
    const currentInstructions = instructions.trim();
    const newInstruction = currentInstructions 
      ? `${currentInstructions}\n• ${instruction}`
      : `• ${instruction}`;
    onInstructionsChange(newInstruction);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2">
        <Icon name="FileText" size={20} className="text-text-secondary" />
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Special Instructions
        </h3>
      </div>

      {/* Instructions Textarea */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-primary">
          Additional cleaning instructions or preferences
        </label>
        <textarea
          value={instructions}
          onChange={(e) => onInstructionsChange(e.target.value)}
          placeholder="Enter any specific instructions for your cleaner...\n\nFor example:\n• Please use eco-friendly products\n• Focus extra attention on the kitchen\n• Avoid moving items on the desk"
          rows={6}
          className="w-full px-3 py-2 border border-border rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical text-sm"
        />
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>Be specific to help your cleaner provide the best service</span>
          <span>{instructions.length}/500</span>
        </div>
      </div>

      {/* Quick Add Instructions */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-text-primary">
          Quick Add Common Instructions:
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {commonInstructions.map((instruction, index) => (
            <button
              key={index}
              onClick={() => handleQuickAdd(instruction)}
              className="flex items-center space-x-2 p-3 text-left border border-border rounded-lg bg-surface hover:bg-secondary-50 hover:border-primary-200 transition-smooth"
            >
              <Icon name="Plus" size={14} className="text-text-secondary flex-shrink-0" />
              <span className="text-sm text-text-primary">{instruction}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Access Instructions */}
      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Key" size={16} className="text-warning-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-warning-800">
              Access Information
            </h4>
            <p className="text-xs text-warning-700">
              Please include details about how the cleaner can access your property:
            </p>
            <ul className="text-xs text-warning-700 space-y-1 ml-4">
              <li>• Door codes or key location</li>
              <li>• Parking instructions</li>
              <li>• Building entry procedures</li>
              <li>• Contact information for emergencies</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-primary-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-primary-800">
              Pro Tips for Better Service
            </h4>
            <ul className="text-xs text-primary-700 space-y-1">
              <li>• Clear surfaces before the cleaner arrives</li>
              <li>• Secure or move valuable items</li>
              <li>• Provide cleaning supplies if you have preferences</li>
              <li>• Leave contact information for questions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialInstructions;