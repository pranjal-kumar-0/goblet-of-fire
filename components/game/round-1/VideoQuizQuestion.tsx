"use client";
import React, { useRef, useCallback } from "react";
import { style } from "./styles";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  text: string;
  options: Option[];
  videoUrl: string;
  videoPoster?: string | null;
  videoCaption?: string | null;
}

interface ValidationResult {
  isCorrect: boolean;
  correctOptionId: string;
}

interface VideoQuizQuestionProps {
  question: Question;
  currentSelectedId: string | null;
  validatedAnswer: ValidationResult | null;
  isPending: boolean;
  isLocked: boolean;
  isCorrectFeedback: boolean;
  pointsPerCorrect: number;
  showVideoGate: boolean;
  onOptionChange: (questionId: string, optionId: string) => void;
  onVideoEnded: () => void;
}

const VideoQuizQuestion: React.FC<VideoQuizQuestionProps> = ({
  question,
  currentSelectedId,
  validatedAnswer,
  isPending,
  isLocked,
  isCorrectFeedback,
  pointsPerCorrect,
  showVideoGate,
  onOptionChange,
  onVideoEnded,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleVideoEnded = useCallback(() => {
    onVideoEnded();
  }, [onVideoEnded]);

  if (showVideoGate) {
    return (
      <div style={style.fullScreenGate} aria-live="polite">
        <div style={style.gateVideoContainer}>
          <video
            ref={videoRef}
            style={style.gateVideoEl}
            controls
            autoPlay
            playsInline
            preload="auto"
            controlsList="nodownload"
            disablePictureInPicture
            onEnded={handleVideoEnded}
            poster={question.videoPoster || undefined}
            crossOrigin="anonymous"
          >
            <source src={question.videoUrl} />
            Your browser does not support the video tag.
          </video>
        </div>
        <div style={style.gateMessage}>Watch till end to unlock question</div>
      </div>
    );
  }
  return (
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

export default VideoQuizQuestion;
