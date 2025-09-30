"use client";
import React from "react";
import { style } from "./styles";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  isCodeQuestion?: boolean;
}

interface ValidationResult {
  isCorrect: boolean;
  correctOptionId: string;
}

interface QuizQuestionProps {
  question: Question;
  currentSelectedId: string | null;
  validatedAnswer: ValidationResult | null;
  isPending: boolean;
  isLocked: boolean;
  isCorrectFeedback: boolean;
  pointsPerCorrect: number;
  onOptionChange: (questionId: string, optionId: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  currentSelectedId,
  validatedAnswer,
  isPending,
  isLocked,
  isCorrectFeedback,
  pointsPerCorrect,
  onOptionChange,
}) => {
  // Helper function to detect if text contains code
  const isCodeText = (text: string): boolean => {
    const codePatterns = [
      /def\s+\w+/,           // Python function definition
      /print\s*\(/,          // Print statements
      /for\s+\w+\s+in/,      // For loops
      /if\s+.*:/,            // If statements
      /lambda\s+/,           // Lambda functions
      /range\s*\(/,          // Range function
      /\[.*\]/,              // List syntax
      /\{.*\}/,              // Dict syntax
      /=\s*\[/,              // Assignment to list
      /=\s*\{/,              // Assignment to dict
    ];
    
    return codePatterns.some(pattern => pattern.test(text));
  };

  // Helper function to render text with proper formatting
  const renderText = (text: string) => {
    if (isCodeText(text)) {
      return (
        <pre style={{
          fontFamily: "'Fira Code', 'Courier New', monospace",
          fontSize: "14px",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          padding: "8px 12px",
          borderRadius: "6px",
          margin: "4px 0",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          border: "1px solid rgba(255, 209, 102, 0.2)",
          color: "#e9ddcf",
          lineHeight: "1.4",
        }}>
          <code>{text}</code>
        </pre>
      );
    }
    
    return (
      <span style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
      }}>
        {text}
      </span>
    );
  };

  return (
    <div style={style.questionBox}>
      <div style={style.optionsWrap}>
        {question.options.map((opt) => {
          const isChecked = currentSelectedId === opt.id;
          // Always show selected options as correct (green) regardless of actual correctness
          const isCorrectForOption = isChecked;
          return (
            <label
              key={opt.id}
              style={{
                ...style.option(isChecked, isCorrectForOption, false),
                ...(isCodeText(opt.text) ? {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  padding: '12px',
                } : {})
              }}
              aria-disabled={false}
            >
              <div style={{
                display: 'flex',
                alignItems: isCodeText(opt.text) ? 'flex-start' : 'center',
                width: '100%',
                gap: '8px'
              }}>
                <input
                  type="radio"
                  name={question.id}
                  value={opt.id}
                  checked={isChecked}
                  onChange={() => onOptionChange(question.id, opt.id)}
                  disabled={false} // Always allow changes
                  style={{ 
                    accentColor: "#ffd166",
                    marginTop: isCodeText(opt.text) ? '4px' : '0',
                    flexShrink: 0
                  }}
                />
                <div style={{ flex: 1 }}>
                  {renderText(opt.text)}
                </div>
              </div>
            </label>
          );
        })}
      </div>

      {/* Remove all feedback - no validation messages */}
    </div>
  );
};

export default QuizQuestion;
