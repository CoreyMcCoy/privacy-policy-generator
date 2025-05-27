'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { questions as allQuestions } from '@/lib/questions'; // Adjust path if needed
import { generatePrivacyPolicy } from '@/lib/actions/action'; // Adjust path if needed
import HeroSection from '@/components/privacy-policy-generator/HeroSection';
import Questionnaire from '@/components/privacy-policy-generator/Questionnaire';

const PrivacyPolicyGeneratorPage = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(-1); // -1 for hero, 0 onwards for questions
  const [answers, setAnswers] = useState({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [visibleQuestions, setVisibleQuestions] = useState([]);

  useEffect(() => {
    const newVisibleQuestions = allQuestions.filter(
      (q) => !q.condition || q.condition(answers)
    );
    setVisibleQuestions(newVisibleQuestions);

    // Adjust currentStep if it's out of bounds after filtering
    if (
      currentStep >= newVisibleQuestions.length &&
      newVisibleQuestions.length > 0
    ) {
      setCurrentStep(newVisibleQuestions.length - 1);
    }
  }, [answers, currentStep]);

  const isLastStep =
    currentStep >= 0 && currentStep === visibleQuestions.length - 1;

  // Memoize canProceed to prevent re-calculation on every render
  const canProceed = useCallback(() => {
    if (currentStep < 0 || currentStep >= visibleQuestions.length) return false;
    const currentQuestionId = visibleQuestions[currentStep]?.id;
    if (!currentQuestionId) return false;

    const answer = answers[currentQuestionId];
    if (Array.isArray(answer)) return answer.length > 0; // For multiselect
    return !!answer; // For text, email, select
  }, [currentStep, visibleQuestions, answers]);

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };
  const handleNext = async () => {
    if (isLastStep) {
      setIsGenerating(true);
      try {
        const result = await generatePrivacyPolicy(answers);
        if (result.success) {
          // Store the policy and answers in sessionStorage
          sessionStorage.setItem('generatedPolicy', result.policy);
          sessionStorage.setItem('policyAnswers', JSON.stringify(answers));

          // Redirect to the policy display page
          router.push('/privacy-policy-result');
          // Don't set isGenerating to false here since we're navigating away
        } else {
          console.error('Failed to generate policy:', result.error);
          alert(`Error: ${result.error}`);
          setIsGenerating(false); // Only set to false on error
        }
      } catch (error) {
        console.error('Failed to generate policy:', error);
        alert('Failed to generate policy. Please try again.');
        setIsGenerating(false); // Only set to false on error
      }
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const resetGenerator = () => {
    setCurrentStep(-1); // Back to hero
    setAnswers({});
  };

  const startGenerator = () => {
    setCurrentStep(0); // Move to the first question
  };
  // Initial Hero Section
  if (currentStep === -1) {
    return <HeroSection onStartBuilding={startGenerator} />;
  }

  // Questionnaire Section
  if (currentStep >= 0 && currentStep < visibleQuestions.length) {
    return (
      <Questionnaire
        currentStep={currentStep}
        visibleQuestions={visibleQuestions}
        answers={answers}
        handleAnswerChange={handleAnswerChange}
        handleNext={handleNext}
        handleBack={handleBack}
        isGenerating={isGenerating}
        isLastStep={isLastStep}
        canProceed={canProceed()}
      />
    );
  }

  // Fallback or loading state if needed, though current logic should cover states
  return null;
};

export default PrivacyPolicyGeneratorPage;
