// components/privacy-policy-generator/ProgressBar.jsx
'use client';

import React from 'react';

const ProgressBar = ({ currentStep, totalSteps }) => {
  const percentage =
    totalSteps > 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-600">
          Question {currentStep + 1} of {totalSteps}
        </span>
        <span className="text-sm font-medium text-gray-600">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
