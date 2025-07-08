import React from 'react';

const AuthToggle = ({ activeTab, onTabChange, isLoading }) => {
  const tabs = [
    { id: 'login', label: 'Sign In' },
    { id: 'register', label: 'Sign Up' }
  ];

  return (
    <div className="flex bg-secondary-50 rounded-lg p-1 mb-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          disabled={isLoading}
          className={`
            flex-1 py-2 px-4 text-sm font-medium rounded-md transition-smooth
            ${activeTab === tab.id
              ? 'bg-surface text-primary shadow-sm'
              : 'text-text-secondary hover:text-text-primary'
            }
            ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AuthToggle;