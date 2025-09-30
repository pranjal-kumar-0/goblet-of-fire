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
}) => {  return (
    <div style={style.questionBox}>
      <div style={style.optionsWrap}>
        {question.options.map((opt) => {
          const isChecked = currentSelectedId === opt.id;
          const isCorrectForOption = isChecked && isCorrectFeedback;
          return (
            <label
              key={opt.id}
              style={style.option(isChecked, isCorrectForOption, isLocked)}
              aria-disabled={isLocked}
            >
              <input
                type="radio"
                name={question.id}
                value={opt.id}
                checked={isChecked}
                onChange={() => onOptionChange(question.id, opt.id)}
                disabled={isLocked}
                style={{ accentColor: "#ffd166" }}
              />
              <span>{opt.text}</span>
            </label>
          );
        })}
      </div>

      {currentSelectedId && (
        <>
          {isPending && (
            <div style={style.validatingFeedback} aria-live="polite">
              Validating your answer with the Ministry...
            </div>
          )}
          {validatedAnswer && !isPending && (
            <div
              style={style.feedback(validatedAnswer.isCorrect)}
              aria-live="polite"
            >
              {validatedAnswer.isCorrect ? (
                <>Correct! +{pointsPerCorrect} points</>
              ) : (
                <>Incorrect.</>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizQuestion;
