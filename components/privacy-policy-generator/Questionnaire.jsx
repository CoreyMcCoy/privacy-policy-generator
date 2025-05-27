// components/privacy-policy-generator/Questionnaire.jsx
'use client';

import React from 'react';
import { ArrowLeft, ArrowRight, Zap } from 'lucide-react';
import ProgressBar from './ProgressBar';
import OrganicLoading from '../OrganicLoading';
import { Button, buttonVariants } from '@/components/ui/button';

const Questionnaire = ({
  currentStep,
  visibleQuestions,
  answers,
  handleAnswerChange,
  handleNext,
  handleBack,
  isGenerating,
  isLastStep,
  canProceed,
}) => {
  const question = visibleQuestions[currentStep];

  if (!question) return null; // Should not happen if logic is correct

  // Show loading component when generating policy
  if (isGenerating) {
    return <OrganicLoading />;
  }

  return (
    <div>
      <div className="container mx-auto px-4 max-w-2xl">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={visibleQuestions.length}
        />

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 transform transition-all duration-300 animate-in slide-in-from-right-5">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {question.question}
          </h2>
          {question.type === 'text' && (
            <input
              type="text"
              placeholder={question.placeholder}
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="input input-bordered w-full text-lg py-4 px-6 rounded-2xl"
              autoFocus
            />
          )}
          {question.type === 'email' && (
            <input
              type="email"
              placeholder={question.placeholder}
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="input input-bordered w-full text-lg py-4 px-6 rounded-2xl"
              autoFocus
            />
          )}
          {question.type === 'select' && (
            <div className="space-y-3">
              {question.options.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 ${
                    answers[question.id] === option.value
                      ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name={question.id}
                    value={option.value}
                    checked={answers[question.id] === option.value}
                    onChange={(e) =>
                      handleAnswerChange(question.id, e.target.value)
                    }
                    className="radio radio-primary mr-4" // DaisyUI class
                  />
                  <span className="text-lg font-medium text-gray-900">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          )}
          {question.type === 'multiselect' && (
            <div className="space-y-3">
              {question.options.map((option) => {
                const selectedValues = answers[question.id] || [];
                const isSelected = selectedValues.includes(option.value);

                return (
                  <label
                    key={option.value}
                    className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        const newValues = e.target.checked
                          ? [...selectedValues, option.value]
                          : selectedValues.filter((v) => v !== option.value);
                        handleAnswerChange(question.id, newValues);
                      }}
                      className="checkbox checkbox-primary mr-4" // DaisyUI class
                    />
                    <span className="text-lg font-medium text-gray-900">
                      {option.label}
                    </span>
                  </label>
                );
              })}
            </div>
          )}{' '}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={handleBack}
              disabled={isGenerating || (currentStep === 0 && !canProceed)}
            >
              <ArrowLeft className="w-4 h-4" />
              {currentStep > 0 ? 'Back' : 'Cancel'}
            </Button>

            <div className="flex items-center gap-4">
              {currentStep + 1} / {visibleQuestions.length}
            </div>

            <Button
              className="cursor-pointer"
              onClick={handleNext}
              disabled={!canProceed || isGenerating}
            >
              {isGenerating ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>{' '}
                  {/* DaisyUI class */}
                  Generating...
                </>
              ) : isLastStep ? (
                <>
                  Generate Policy
                  <Zap className="w-4 h-4" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questionnaire;
