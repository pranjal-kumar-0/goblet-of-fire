"use client";
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import { style, shadows } from "./styles";
import QuizQuestion from "./QuizQuestion";
import VideoQuizQuestion from "./VideoQuizQuestion";
import CodeQuestion from "./CodeQuestion";

const iconProps = {
  width: 22,
  height: 22,
  strokeWidth: 1.6,
  fill: "none",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const IconLightning: React.FC<{ title?: string }> = ({ title = "Lightning" }) => (
  <svg
    {...iconProps}
    viewBox="0 0 24 24"
    stroke="#ffd166"
    role="img"
    aria-label={title}
    style={{ filter: "drop-shadow(0 0 2px rgba(255,209,102,0.3))" }}
  >
    <title>{title}</title>
    <path
      d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z"
      fill="rgba(255,209,102,0.15)"
      stroke="currentColor"
    />
  </svg>
);

const IconFlag: React.FC<{ title?: string }> = ({ title = "Finish" }) => (
  <svg
    {...iconProps}
    viewBox="0 0 24 24"
    stroke="#ffd166"
    role="img"
    aria-label={title}
    style={{ marginLeft: 6 }}
  >
    <title>{title}</title>
    <path d="M4 4v16" />
    <path
      d="M4 5s1.5-1 4-1 4 1 6 1 4-1 4-1v9s-1.5 1-4 1-4-1-6-1-4 1-4 1V5Z"
      fill="url(#flagGrad)"
      stroke="currentColor"
    />
    <defs>
      <linearGradient id="flagGrad" x1="4" x2="22" y1="4" y2="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#ffd166" stopOpacity={0.55} />
        <stop offset="1" stopColor="#f77f00" stopOpacity={0.35} />
      </linearGradient>
    </defs>
  </svg>
);

interface Option { id: string; text: string; }
interface Question {
  id: string;
  text: string;
  options: Option[];
  videoUrl?: string | null;
  videoPoster?: string | null;
  videoCaption?: string | null;
  codeTemplate?: string;
  language?: string;
  evaluationHint?: string;
  correctAnswer?: number;
  difficulty?: string;
  isCodeQuestion?: boolean;
}
interface SubmitScoreParams { userId?: string | null; score: number; total: number; round?: number; }
interface SubmitResult { ok: boolean; error?: string; }
interface SelectedAnswers { [questionId: string]: string; }
interface ValidationResult { isCorrect: boolean; correctOptionId: string; }

async function fetchRound1Questions(): Promise<Question[]> {
  const response = await fetch('/api/questions');
  const data = await response.json();
  const teamId = localStorage.getItem('teamId');
  let attemptedQuestionIds: string[] = [];
  
  if (teamId) {
    try {
      const attemptedResponse = await fetch(`/api/questions/${teamId}`);
      if (attemptedResponse.ok) {
        const attemptedData = await attemptedResponse.json();
        attemptedQuestionIds = attemptedData.attemptedQuestions || [];
      }
    } catch (error) {
      console.error('Failed to fetch attempted questions:', error);
    }
  }
    const filteredQuestions = data.questions.filter((item: any) => 
    !attemptedQuestionIds.includes(item.id)
  );
  
  // Helper function to format code text by unescaping and adding proper line breaks
  const formatCodeText = (text: string): string => {
    return text
      .replace(/\\n/g, '\n')  // Convert \n to actual line breaks
      .replace(/\\"/g, '"')   // Convert \" to actual quotes
      .replace(/\\\\/g, '\\'); // Convert \\ to actual backslashes
  };
  
  // Helper function to check if a question contains code
  const isCodeQuestion = (question: string, options: string[]): boolean => {
    // Check if question or any option contains code patterns
    const codePatterns = [
      /def\s+\w+/,           // Python function definition
      /print\s*\(/,          // Print statements
      /for\s+\w+\s+in/,      // For loops
      /if\s+.*:/,            // If statements
      /lambda\s+/,           // Lambda functions
      /range\s*\(/,          // Range function
      /\[.*\]/,              // List syntax
      /\{.*\}/,              // Dict syntax
    ];
    
    const textToCheck = question + ' ' + options.join(' ');
    return codePatterns.some(pattern => pattern.test(textToCheck));
  };
  
  const apiQuestions = filteredQuestions.map((item: any) => {
    const questionText = item.question || '';
    const optionsArray = item.option || item.options || [];
    const isCode = isCodeQuestion(questionText, optionsArray);
    
    return {
      id: item.id,
      text: isCode ? formatCodeText(questionText) : questionText,
      options: optionsArray.map((opt: string, index: number) => ({
        id: `${item.id}o${index + 1}`,
        text: isCode ? formatCodeText(opt) : opt,
      })),
      videoUrl: item.videoUrl || null,
      videoPoster: null,
      videoCaption: null,
      correctAnswer: item.correctAnswer,
      difficulty: item.difficulty,
      isCodeQuestion: isCode,
    };
  });

  const codeQuestion: Question = {
    id: "q6",
    text: "Code Challenge: Implement a function sum(a, b) that returns the sum of two numbers.",
    options: [],
    codeTemplate: `// Implement sum so all tests pass
// Return the sum of a and b
export function sum(a: number, b: number) {
  // your code here
}
`,
    language: "typescript",
    evaluationHint:
      "Implement the sum function correctly. Use 'Compile & Test' to verify with unit tests, then 'Submit Code' when all pass.",
    difficulty: "code",
  };

  return [...apiQuestions, codeQuestion];
}

async function validateAnswerFromServer(
  question: Question,
  selectedOptionId: string
): Promise<ValidationResult> {
  const correctIndex = question.correctAnswer! - 1;
  const correctOptionId = question.options[correctIndex].id;
  return {
    isCorrect: selectedOptionId === correctOptionId,
    correctOptionId,
  };
}

async function submitRound1Score({
  userId = null,
  score,
  total,
  round = 1,
}: SubmitScoreParams): Promise<SubmitResult> {
  return { ok: true };
}

async function submitcodetobackend(qid: string, code: string): Promise<{ok: boolean; error?: string}> {
  await new Promise((r) => setTimeout(r, 500));
  return { ok: true };
}

const POINTS_PER_CORRECT = 10;

async function compileAndTestCode(source: string): Promise<{
  passed: boolean;
  output: string;
}> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  try {
    const stripped = source
      .replace(/:\s*number/g, "")
      .replace(/export\s+function/g, "function");
    const testHarness = `
${stripped}
const results = [];
function assert(name, cond){
  results.push((cond ? "✓" : "✗") + " " + name + (cond ? "" : " (failed)"));
}
try {
  assert("Test 1", sum(2,3)===5);
  assert("Test 2", sum(-1,1)===0);
  assert("Test 3", sum(0,0)===0);
  const all = results.every(r => r.startsWith("✓"));
  return { passed: all, output: results.join("\\n") };
} catch(e){
  return { passed:false, output: "Runtime error: " + e.message };
}
`;
    const fn = new Function(testHarness);
    return fn();
  } catch (e: any) {
    return { passed: false, output: "Compilation error: " + e.message };
  }
}

const Round1: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [selected, setSelected] = useState<SelectedAnswers>({});
  const [validatedAnswers, setValidatedAnswers] = useState<{
    [questionId: string]: ValidationResult;
  }>({});
  const [pendingValidations, setPendingValidations] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [finalScore, setFinalScore] = useState<number | null>(null);
  const [submitResult, setSubmitResult] = useState<SubmitResult | null>(null);

  const [codeAnswers, setCodeAnswers] = useState<{ [qid: string]: string }>({});
  const [codeCompileStatus, setCodeCompileStatus] = useState<{
    [qid: string]: { running: boolean; output: string; passed: boolean | null };
  }>({});
  const [codeSubmitting, setCodeSubmitting] = useState<{ [qid: string]: boolean }>(
    {}
  );
  const codeEditorRefs = useRef<{ [qid: string]: HTMLTextAreaElement | null }>({});
  const pendingSelections = useRef<{ [qid: string]: { start: number; end: number } | null }>({});
  const [videoWatched, setVideoWatched] = useState<{ [qid: string]: boolean }>({});
  const [showVideoGate, setShowVideoGate] = useState<boolean>(false);
  const currentQuestion = useMemo(
    (): Question | null => questions[currentIndex] || null,
    [questions, currentIndex]
  );
  // DevTools protection and text selection prevention
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+A, Ctrl+C
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && (e.key === "U" || e.key === "a" || e.key === "A" || e.key === "c" || e.key === "C"))
      ) {
        e.preventDefault();
      }
    };

    const handleSelectStart = (e: Event) => e.preventDefault();
    const handleDragStart = (e: Event) => e.preventDefault();

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("dragstart", handleDragStart);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("dragstart", handleDragStart);
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const qs = await fetchRound1Questions();
        if (mounted) {
          setQuestions(qs || []);
          setLoadError("");
        }
      } catch {
        if (mounted) setLoadError("Failed to load questions. Please try again.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (currentQuestion?.videoUrl) {
      if (!videoWatched[currentQuestion.id]) {
        setShowVideoGate(true);
      } else {
        setShowVideoGate(false);
      }
    } else {
      setShowVideoGate(false);
    }
  }, [currentQuestion?.id, currentQuestion?.videoUrl, videoWatched]);

  const handleVideoEnded = useCallback(() => {
    if (!currentQuestion) return;
    setVideoWatched((prev) => ({ ...prev, [currentQuestion.id]: true }));
    setShowVideoGate(false);
  }, [currentQuestion]);

  const totalQuestions = questions.length;  const handleOptionChange = async (
    questionId: string,
    optionId: string
  ): Promise<void> => {
    setSelected((prev) => ({
      ...prev,
      [questionId]: optionId
    }));
    
  };

  const submitAnswerToBackend = async (questionId: string, optionId: string): Promise<void> => {
    const optionIndex = parseInt(optionId.slice(-1)) - 1; // Convert from 1-based to 0-based
    
    const teamId = localStorage.getItem('teamId');
    if (!teamId) {
      console.error('Team ID not found in localStorage');
      return;
    }
    
    // Send answer to backend
    try {
      const response = await fetch('/api/answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          teamId: teamId,
          questionId: questionId,
          selectedAnswer: optionIndex
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const responseData = await response.json();
      console.log('Answer submitted successfully:', responseData);
      
    } catch (error) {
      console.error('Failed to submit answer to backend:', error);
      // Don't block the UI even if backend submission fails
    }
  };

  const isCodeQuestion = (q: Question | null): boolean => Boolean(q && q.codeTemplate);

  const handleCodeChange = useCallback((qid: string, value: string, textarea?: HTMLTextAreaElement) => {
    if (textarea) {
      pendingSelections.current[qid] = {
        start: textarea.selectionStart,
        end: textarea.selectionEnd,
      };
    }
    setCodeAnswers((prev) => ({ ...prev, [qid]: value }));
    setCodeCompileStatus((prev) => ({
      ...prev,
      [qid]: { running: false, output: "", passed: null },
    }));
  }, []);

  const handleCompileCode = async (qid: string) => {
    const code = codeAnswers[qid] ?? "";
    setCodeCompileStatus((prev) => ({
      ...prev,
      [qid]: { running: true, output: "", passed: null },
    }));
    const res = await compileAndTestCode(code);
    setCodeCompileStatus((prev) => ({
      ...prev,
      [qid]: { running: false, output: res.output, passed: res.passed },
    }));
  };

  const handleSubmitCode = async (qid: string) => {
    const status = codeCompileStatus[qid];
    if (!status?.passed) return;
    setCodeSubmitting((prev) => ({ ...prev, [qid]: true }));
    const code = codeAnswers[qid] ?? "";
    try {
      const backendRes = await submitcodetobackend(qid, code);
      if (!backendRes.ok) {
        console.error(backendRes.error);
        return;
      }
      setSelected((prev) => ({ ...prev, [qid]: "__code__" }));
      setValidatedAnswers((prev) => ({
        ...prev,
        [qid]: { isCorrect: true, correctOptionId: "code" },
      }));
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setCodeSubmitting((prev) => ({ ...prev, [qid]: false }));
    }
  };

  useEffect(() => {
    if (currentQuestion && isCodeQuestion(currentQuestion)) {
      const qid = currentQuestion.id;
      const t = setTimeout(() => {
        if (!selected[qid]) {
          codeEditorRefs.current[qid]?.focus();
        }
      }, 50);
      return () => clearTimeout(t);
    }
  }, [currentQuestion?.id, selected]);
  const canGoNext: boolean = (() => {
    if (!currentQuestion) return false;
    if (isCodeQuestion(currentQuestion)) {
      return Boolean(selected[currentQuestion.id]) && currentIndex < totalQuestions - 1;
    }
    // Remove validation dependency - just check if option is selected
    return Boolean(selected[currentQuestion.id]) && currentIndex < totalQuestions - 1;
  })();
  const goNext = (): void => {
    if (canGoNext) {
      // Submit current answer to backend before moving to next question
      if (currentQuestion && currentSelectedId) {
        submitAnswerToBackend(currentQuestion.id, currentSelectedId);
      }
      setCurrentIndex((i) => i + 1);
    }
  };

  const calculateScore = (): number => {
    if (questions.length === 0) return 0;
    const correctCount = questions.reduce((acc, q) => {
      const validated = validatedAnswers[q.id];
      if (validated && validated.isCorrect) return acc + 1;
      return acc;
    }, 0);
    return correctCount * POINTS_PER_CORRECT;
  };  const finishQuiz = async (): Promise<void> => {
    // Submit the last answer before finishing
    if (currentQuestion && currentSelectedId) {
      await submitAnswerToBackend(currentQuestion.id, currentSelectedId);
    }
    
    // Remove score calculation and just finish
    setSubmitted(true);
    const res = await submitRound1Score({
      score: 0, // Backend will calculate actual score
      total: totalQuestions * POINTS_PER_CORRECT,
      round: 1,
    });
    setSubmitResult(res);
  };

  const progressPct: number =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;  const currentSelectedId: string | null = currentQuestion
    ? selected[currentQuestion.id] || null
    : null;
  const currentValidated = null; // Remove validation feedback
  const isLocked: boolean = false; // Never lock options - always allow changes
  const isPending = false; // Remove pending state
  const isCorrectFeedback = false; // Remove correct feedback
  return (
    <div style={style.page}>
      
      {showVideoGate && currentQuestion?.videoUrl && (
        <VideoQuizQuestion
          question={currentQuestion as any}
          currentSelectedId={currentSelectedId}
          validatedAnswer={currentValidated}
          isPending={isPending}
          isLocked={isLocked}
          isCorrectFeedback={isCorrectFeedback}
          pointsPerCorrect={POINTS_PER_CORRECT}
          showVideoGate={showVideoGate}
          onOptionChange={handleOptionChange}
          onVideoEnded={handleVideoEnded}
        />
      )}

      <div style={style.card} aria-live="polite">
        <h1 style={style.title}>
          <IconLightning />
          <span>The Triwizard Trivia</span>
          <IconLightning />
        </h1>

        {loading && (
          <div
            style={{
              marginTop: 24,
              fontSize: 16,
              letterSpacing: 0.4,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            Summoning questions from the Room of Requirement...
          </div>
        )}
        {loadError && (
          <div
            style={{
              color: "#ff8b8b",
              marginTop: 20,
              fontWeight: 500,
              textShadow: "0 1px 2px rgba(0,0,0,0.5), 0 0 3px rgba(255,71,87,0.3)",
            }}
          >
            {loadError}
          </div>
        )}

        {!loading && !loadError && totalQuestions > 0 && !submitted && (
          <>
            <div style={style.progressWrap}>
              <div style={style.progressBar}>
                <div style={style.progressFill(progressPct)} />
              </div>
              <div style={style.progressMeta}>
                <span>Question {currentIndex + 1} of {totalQuestions}</span>
              </div>
            </div>            
            {currentQuestion && !showVideoGate && (
              <>
                {currentQuestion.videoUrl && showVideoGate ? (
                  <VideoQuizQuestion
                    question={currentQuestion as any}
                    currentSelectedId={currentSelectedId}
                    validatedAnswer={currentValidated}
                    isPending={isPending}
                    isLocked={isLocked}
                    isCorrectFeedback={isCorrectFeedback}
                    pointsPerCorrect={POINTS_PER_CORRECT}
                    showVideoGate={showVideoGate}
                    onOptionChange={handleOptionChange}
                    onVideoEnded={handleVideoEnded}
                  />                ) : (
                  <>
                    {/* Helper function to detect and render code in question text */}
                    {(() => {
                      const isCodeText = (text: string): boolean => {
                        const codePatterns = [
                          /def\s+\w+/,          
                          /print\s*\(/,        
                          /for\s+\w+\s+in/,      
                          /if\s+.*:/,            
                          /lambda\s+/,        
                          /range\s*\(/,        
                          /\[.*\]/,            
                          /\{.*\}/,              
                          /=\s*\[/,             
                          /=\s*\{/,              
                        ];
                        
                        return codePatterns.some(pattern => pattern.test(text));
                      };

                      const renderQuestionText = (text: string) => {
                        if (isCodeText(text)) {
                          return (
                            <div>                              <h2 style={{
                                ...style.questionText,
                                userSelect: "none",
                                WebkitUserSelect: "none",
                                MozUserSelect: "none",
                                msUserSelect: "none",
                                WebkitTouchCallout: "none",
                                WebkitTapHighlightColor: "transparent",
                                marginBottom: "12px"
                              }}>
                                Fix the code:
                              </h2>
                              <pre style={{
                                fontFamily: "'Fira Code', 'Courier New', monospace",
                                fontSize: "16px",
                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                padding: "16px",
                                borderRadius: "8px",
                                margin: "0 0 16px 0",
                                whiteSpace: "pre-wrap",
                                wordBreak: "break-word",
                                border: "1px solid rgba(255, 209, 102, 0.3)",
                                color: "#e9ddcf",
                                lineHeight: "1.5",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                                textAlign: "left", 
                              }}>
                                <code style={{ textAlign: "left" }}>{text}</code>
                              </pre>
                            </div>
                          );
                        }
                        
                        return (
                          <h2 style={{
                            ...style.questionText,
                            userSelect: "none",
                            WebkitUserSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                            WebkitTouchCallout: "none",
                            WebkitTapHighlightColor: "transparent",
                          }}>
                            {text}
                          </h2>
                        );
                      };

                      return renderQuestionText(currentQuestion.text);
                    })()}
                    
                    <div style={{ fontSize: 14, color: "#ffd166", marginBottom: 10, marginTop: -15, textShadow: "0 1px 2px rgba(0,0,0,0.5)" }}>
                      Difficulty: {currentQuestion.difficulty}
                    </div>

                    {isCodeQuestion(currentQuestion) ? (
                      <CodeQuestion
                        question={currentQuestion}
                        code={codeAnswers[currentQuestion.id] ?? currentQuestion.codeTemplate ?? ""}
                        compileStatus={codeCompileStatus[currentQuestion.id]}
                        isSubmitted={Boolean(selected[currentQuestion.id])}
                        isSubmitting={codeSubmitting[currentQuestion.id] || false}
                        pointsPerCorrect={POINTS_PER_CORRECT}
                        onCodeChange={handleCodeChange}
                        onCompileCode={handleCompileCode}
                        onSubmitCode={handleSubmitCode}
                        codeEditorRef={codeEditorRefs}
                        pendingSelections={pendingSelections}
                      />
                    ) : currentQuestion.videoUrl ? (
                      <VideoQuizQuestion
                        question={currentQuestion as any}
                        currentSelectedId={currentSelectedId}
                        validatedAnswer={currentValidated}
                        isPending={isPending}
                        isLocked={isLocked}
                        isCorrectFeedback={isCorrectFeedback}
                        pointsPerCorrect={POINTS_PER_CORRECT}
                        showVideoGate={showVideoGate}
                        onOptionChange={handleOptionChange}
                        onVideoEnded={handleVideoEnded}
                      />
                    ) : (
                      <QuizQuestion
                        question={currentQuestion}
                        currentSelectedId={currentSelectedId}
                        validatedAnswer={currentValidated}
                        isPending={isPending}
                        isLocked={isLocked}
                        isCorrectFeedback={isCorrectFeedback}
                        pointsPerCorrect={POINTS_PER_CORRECT}
                        onOptionChange={handleOptionChange}
                      />
                    )}
                  </>
                )}
              </>
            )}

            {!showVideoGate && (
              <div style={style.controls}>                {currentIndex < totalQuestions - 1 ? (
                  <button
                    style={style.btn("primary", !canGoNext)}
                    onClick={goNext}
                    disabled={!canGoNext}
                  >
                    Next →
                  </button>
                ) : (                  <button
                    style={style.btn("primary", !currentSelectedId)}
                    onClick={finishQuiz}
                    disabled={!currentSelectedId}
                    aria-label="Finish quiz"
                  >
                    Finish
                    <IconFlag />
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {!loading && !loadError && submitted && (
          <div style={style.scoreBox}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 700,
                marginBottom: 8,
                textShadow: shadows.jade,
              }}
            >
              Results are in!
            </div>
            <div
              style={{
                marginTop: 10,
                color: "#e9ddcf",
                textShadow: "0 1px 1px rgba(0,0,0,0.5)",
              }}
            >
              {submitResult?.ok
                ? "Score delivered to the Ministry of Magic."
                : submitResult
                ? submitResult.error || "The owl got lost. Try again later."
                : "—"}
            </div>
          </div>
        )}

        {!loading && !loadError && totalQuestions === 0 && (
          <div
            style={{
              marginTop: 24,
              fontSize: 16,
              textShadow: "0 1px 2px rgba(0,0,0,0.5)",
            }}
          >
            No questions found for Round 1.
          </div>
        )}
      </div>
    </div>
  );
};

export default Round1;