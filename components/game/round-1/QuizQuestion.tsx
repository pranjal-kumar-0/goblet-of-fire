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
              style={style.option(isChecked, isCorrectForOption, false)} // Never lock options
              aria-disabled={false}
            >
              <input
                type="radio"
                name={question.id}
                value={opt.id}
                checked={isChecked}
                onChange={() => onOptionChange(question.id, opt.id)}
                disabled={false} // Always allow changes
                style={{ accentColor: "#ffd166" }}
              />
              <span style={{
                userSelect: "none",
                WebkitUserSelect: "none",
                MozUserSelect: "none",
                msUserSelect: "none",
                WebkitTouchCallout: "none",
                WebkitTapHighlightColor: "transparent",
              }}>{opt.text}</span>
            </label>
          );
        })}
      </div>

      {/* Remove all feedback - no validation messages */}
    </div>
  );
};

export default QuizQuestion;
