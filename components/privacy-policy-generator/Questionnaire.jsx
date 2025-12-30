"use client";

import React from "react";
import { ArrowLeft, ArrowRight, Zap, Loader2 } from "lucide-react";
import ProgressBar from "./ProgressBar";
import OrganicLoading from "../OrganicLoading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  if (!question) return null;

  // Show loading component when generating policy
  if (isGenerating) {
    return <OrganicLoading />;
  }

  return (
    <main className="max-w-2xl mx-auto px-4 pt-12">
      <ProgressBar
        currentStep={currentStep}
        totalSteps={visibleQuestions.length}
      />

      <Card className="mt-8 animate-in slide-in-from-right-5 duration-300">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {question.type === "text" && (
            <div className="flex flex-col space-y-2">
              {/* Label is the question title usually, but putting one for accessibility if needed, though header covers it. */}
              <Input
                type="text"
                placeholder={question.placeholder}
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                autoFocus
                className=""
              />
            </div>
          )}
          {question.type === "email" && (
            <div className="flex flex-col space-y-2">
              <Input
                type="email"
                placeholder={question.placeholder}
                value={answers[question.id] || ""}
                onChange={(e) =>
                  handleAnswerChange(question.id, e.target.value)
                }
                autoFocus
                className=""
              />
            </div>
          )}
          {question.type === "select" && (
            <RadioGroup
              value={answers[question.id]}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
              className="space-y-3"
            >
              {question.options.map((option) => (
                <div
                  key={option.value}
                  className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-muted ${
                    answers[question.id] === option.value
                      ? "border-primary bg-muted"
                      : "border-input"
                  }`}
                  onClick={() => handleAnswerChange(question.id, option.value)}
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label
                    htmlFor={option.value}
                    className="font-medium flex-1 cursor-pointer"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
          {question.type === "multiselect" && (
            <div className="space-y-3">
              {question.options.map((option) => {
                const selectedValues = answers[question.id] || [];
                const isSelected = selectedValues.includes(option.value);

                return (
                  <div
                    key={option.value}
                    className={`flex items-center space-x-3 space-y-0 rounded-md border p-4 cursor-pointer hover:bg-muted ${
                      isSelected ? "border-primary bg-muted" : "border-input"
                    }`}
                    onClick={() => {
                      const newValues = isSelected
                        ? selectedValues.filter((v) => v !== option.value)
                        : [...selectedValues, option.value];
                      handleAnswerChange(question.id, newValues);
                    }}
                  >
                    <Checkbox
                      id={option.value}
                      checked={isSelected}
                      onCheckedChange={(checked) => {
                        // Logic handled by wrapping div click mostly, but keeping this for direct interactions
                        const newValues = checked
                          ? [...selectedValues, option.value]
                          : selectedValues.filter((v) => v !== option.value);
                        if (checked !== isSelected)
                          handleAnswerChange(question.id, newValues);
                      }}
                    />
                    <Label
                      htmlFor={option.value}
                      className="font-medium flex-1 cursor-pointer"
                    >
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between pt-6">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={isGenerating || (currentStep === 0 && !canProceed)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {currentStep > 0 ? "Back" : "Cancel"}
          </Button>

          <span className="text-sm text-muted-foreground font-medium">
            {currentStep + 1} / {visibleQuestions.length}
          </span>

          <Button onClick={handleNext} disabled={!canProceed || isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : isLastStep ? (
              <>
                Generate Policy
                <Zap className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
};

export default Questionnaire;
