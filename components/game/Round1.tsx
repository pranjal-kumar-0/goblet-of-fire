"use client";
import React, {
  useEffect,
  useMemo,
  useState,
  useRef,
  useCallback,
} from "react";
import HPBackground from "../HPBackground";

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
    style={{ filter: "drop-shadow(0 0 2px rgba(255,209,102,0.2))" }}
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
        <stop offset="1" stopColor="#fca311" stopOpacity={0.35} />
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
}
interface SubmitScoreParams { userId?: string | null; score: number; total: number; round?: number; }
interface SubmitResult { ok: boolean; error?: string; }
interface SelectedAnswers { [questionId: string]: string; }
interface ValidationResult { isCorrect: boolean; correctOptionId: string; }

async function fetchRound1Questions(): Promise<Question[]> {
  return [
    {
      id: "q1",
      text: "Which house at Hogwarts values bravery and chivalry?",
      options: [
        { id: "q1o1", text: "Ravenclaw" },
        { id: "q1o2", text: "Hufflepuff" },
        { id: "q1o3", text: "Gryffindor" },
        { id: "q1o4", text: "Slytherin" },
      ],
      videoUrl: null,
    },
      {
      id: "q2",
      text: "Based on the video, which magical creature was shown?",
      options: [
        { id: "q2o1", text: "Hippogriff" },
        { id: "q2o2", text: "Phoenix" },
        { id: "q2o3", text: "Basilisk" },
        { id: "q2o4", text: "Thestral" },
      ],
      videoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      videoPoster: "https://abc.abc/xyz.jpg",
      videoCaption: "Observe the creature in the Forbidden Forest and answer:",
    },
    {
      id: "q3",
      text: "Which spell is used to disarm an opponent?",
      options: [
        { id: "q3o1", text: "Expelliarmus" },
        { id: "q3o2", text: "Lumos" },
        { id: "q3o3", text: "Wingardium Leviosa" },
        { id: "q3o4", text: "Avada Kedavra" },
      ],
      videoUrl: null,
    },
    {
      id: "q4",
      text: "Who is the Half-Blood Prince?",
      options: [
        { id: "q4o1", text: "Harry Potter" },
        { id: "q4o2", text: "Severus Snape" },
        { id: "q4o3", text: "Tom Riddle" },
        { id: "q4o4", text: "Draco Malfoy" },
      ],
      videoUrl: null,
    },
    {
      id: "q5",
      text: "What platform at King's Cross do students use to board the Hogwarts Express?",
      options: [
        { id: "q5o1", text: "Platform 10" },
        { id: "q5o2", text: "Platform 9" },
        { id: "q5o3", text: "Platform 9¾" },
        { id: "q5o4", text: "Platform 10¾" },
      ],
      videoUrl: null,
    },
    {
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
    },
  ];
}

async function validateAnswerFromServer(
  questionId: string,
  selectedOptionId: string
): Promise<ValidationResult> {
  await new Promise((r) => setTimeout(r, 200));
  const correctOptionId = questionId + "o1";
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
  await new Promise((r) => setTimeout(r, 400));
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
  const [submittingScore, setSubmittingScore] = useState<boolean>(false);
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
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const currentQuestion = useMemo(
    (): Question | null => questions[currentIndex] || null,
    [questions, currentIndex]
  );

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

  const totalQuestions = questions.length;

  const handleOptionChange = async (
    questionId: string,
    optionId: string
  ): Promise<void> => {
    setSelected((prev) => {
      if (prev[questionId]) return prev;
      return { ...prev, [questionId]: optionId };
    });
    setPendingValidations((prev) => [...prev, questionId]);
    try {
      const result = await validateAnswerFromServer(questionId, optionId);
      setValidatedAnswers((prev) => ({ ...prev, [questionId]: result }));
    } catch {
      setValidatedAnswers((prev) => ({
        ...prev,
        [questionId]: { isCorrect: false, correctOptionId: questionId + "o1" },
      }));
    } finally {
      setPendingValidations((prev) => prev.filter((id) => id !== questionId));
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
    return (
      Boolean(selected[currentQuestion.id]) &&
      !pendingValidations.includes(currentQuestion.id) &&
      currentIndex < totalQuestions - 1
    );
  })();

  const goNext = (): void => {
    if (canGoNext) setCurrentIndex((i) => i + 1);
  };
  const goPrev = (): void => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const calculateScore = (): number => {
    if (questions.length === 0) return 0;
    const correctCount = questions.reduce((acc, q) => {
      const validated = validatedAnswers[q.id];
      if (validated && validated.isCorrect) return acc + 1;
      return acc;
    }, 0);
    return correctCount * POINTS_PER_CORRECT;
  };

  const finishQuiz = async (): Promise<void> => {
    const computed = calculateScore();
    setFinalScore(computed);
    setSubmitted(true);
    try {
      setSubmittingScore(true);
      const res = await submitRound1Score({
        score: computed,
        total: totalQuestions * POINTS_PER_CORRECT,
        round: 1,
      });
      setSubmitResult(res);
    } catch {
      setSubmitResult({ ok: false, error: "Failed to submit score." });
    } finally {
      setSubmittingScore(false);
    }
  };

  const shadows = {
    glowGold: "0 0 4px rgba(255,209,102,0.3), 0 0 12px rgba(255,209,102,0.2)",
    softGold: "0 0 2px rgba(255,209,102,0.25)",
    subtleLight: "0 1px 1px rgba(0,0,0,0.4)",
    deep: "0 1px 2px rgba(0,0,0,0.5)",
    ember: "0 0 4px rgba(250,88,44,0.3)",
    jade: "0 0 4px rgba(46,213,115,0.3)",
    rose: "0 0 4px rgba(255,71,87,0.3)",
    lilac: "0 0 4px rgba(199,125,255,0.3)",
  };

  const style = {
    page: {
      minHeight: "100dvh",
      color: "#f7f3e9",
      padding: "24px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative" as const,
      overflow: "hidden" as const,
      background:
        "radial-gradient(1200px 600px at 10% 0%, #1a0f1f 0%, #0d0a0f 35%, #07060a 100%)",
    },
    card: {
      width: "min(900px, 100%)",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
      border: "1px solid rgba(255,255,255,0.10)",
      borderRadius: "16px",
      padding: "28px 24px",
      boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
      backdropFilter: "blur(6px)",
      textAlign: "center" as const,
      position: "relative" as const,
      zIndex: 2,
    },
    title: {
      margin: 0,
      fontSize: "32px",
      letterSpacing: "0.5px",
      display: "inline-flex",
      alignItems: "center",
      gap: "14px",
      color: "#ffd166",
      textShadow: shadows.glowGold,
      filter: "drop-shadow(0 0 4px rgba(255,209,102,0.2))",
    },
    progressWrap: {
      margin: "18px auto 24px",
      maxWidth: 680,
      textShadow: shadows.subtleLight,
    },
    progressMeta: {
      marginTop: 8,
      color: "#e7ddd0",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap" as const,
      gap: 8,
      fontSize: 14,
      textShadow: shadows.deep,
    },
    progressBar: {
      height: "10px",
      width: "100%",
      background: "rgba(255,255,255,0.10)",
      borderRadius: "999px",
      overflow: "hidden" as const,
      boxShadow:
        "inset 0 0 12px rgba(255,209,102,0.10), 0 0 6px rgba(255,209,102,0.15)",
    },
    progressFill: (pct: number): React.CSSProperties => ({
      width: `${pct}%`,
      height: "100%",
      background: "linear-gradient(90deg, #ffd166, #fca311, #c77dff 120%)",
      transition: "width 280ms ease",
      boxShadow: "0 0 12px 2px rgba(255,209,102,0.35)",
    }),
    questionBox: {
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "14px",
      padding: "20px 20px 22px",
      margin: "0 auto 18px",
      background:
        "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
      maxWidth: 720,
      textAlign: "left" as const,
      boxShadow:
        "0 14px 32px -8px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
      position: "relative" as const,
    },
    questionText: {
      fontSize: "22px",
      margin: "0 0 16px",
      color: "#f8efe1",
      textAlign: "center" as const,
      fontWeight: 600,
      letterSpacing: 0.4,
      textShadow:
        "0 1px 2px rgba(0,0,0,0.4), 0 0 4px rgba(255,209,102,0.1)",
    },
    optionsWrap: {
      display: "grid",
      gap: 12,
      justifyItems: "stretch" as const,
    },
    option: (
      checked: boolean,
      isCorrectFeedback: boolean,
      locked: boolean
    ): React.CSSProperties => ({
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "14px 16px",
      borderRadius: "12px",
      cursor: locked ? "default" : "pointer",
      background: checked
        ? "linear-gradient(135deg, rgba(255,209,102,0.20), rgba(255,209,102,0.05))"
        : "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
      border: "1px solid rgba(255,255,255,0.14)",
      transition: "all 180ms ease",
      color: "#f7f3e9",
      position: "relative" as const,
      textShadow: "0 1px 2px rgba(0,0,0,0.4)",
      backdropFilter: "blur(2px)",
      ...(checked && {
        boxShadow:
          "0 0 0 1px rgba(255,209,102,0.55), 0 6px 18px -4px rgba(255,209,102,0.35)",
      }),
      ...(checked &&
        locked && {
          borderColor: isCorrectFeedback
            ? "rgba(46, 213, 115, 0.65)"
            : "rgba(255, 71, 87, 0.7)",
          boxShadow: isCorrectFeedback
            ? "0 0 0 1px rgba(46,213,115,0.6), 0 8px 20px -6px rgba(46,213,115,0.4)"
            : "0 0 0 1px rgba(255,71,87,0.65), 0 8px 20px -6px rgba(255,71,87,0.45)",
          textShadow: isCorrectFeedback ? shadows.jade : shadows.rose,
        }),
      ...(locked && !checked && { opacity: 0.75 }),
    }),
    feedback: (isCorrect: boolean): React.CSSProperties => ({
      marginTop: 14,
      padding: "12px 14px",
      borderRadius: 12,
      border: `1px solid ${
        isCorrect ? "rgba(46,213,115,0.55)" : "rgba(255,71,87,0.65)"
      }`,
      background: isCorrect
        ? "linear-gradient(180deg, rgba(46,213,115,0.18), rgba(46,213,115,0.07))"
        : "linear-gradient(180deg, rgba(255,71,87,0.22), rgba(255,71,87,0.08))",
      color: isCorrect ? "#c4ffe2" : "#ffc7c7",
      textAlign: "center" as const,
      fontWeight: 500,
      textShadow: isCorrect ? shadows.jade : shadows.rose,
      boxShadow: isCorrect
        ? "0 0 14px -4px rgba(46,213,115,0.5)"
        : "0 0 14px -4px rgba(255,71,87,0.55)",
    }),
    validatingFeedback: {
      marginTop: 14,
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid rgba(255,209,102,0.55)",
      background:
        "linear-gradient(180deg, rgba(255,209,102,0.22), rgba(255,209,102,0.08))",
      color: "#ffe6a3",
      textAlign: "center" as const,
      fontWeight: 500,
      textShadow: shadows.softGold,
      boxShadow: "0 0 14px -4px rgba(255,209,102,0.55)",
    },
    controls: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "14px",
      marginTop: "14px",
      flexWrap: "wrap" as const,
      textShadow: "0 1px 2px rgba(0,0,0,0.4)",
    },
    btn: (variant: "ghost" | "primary" = "ghost"): React.CSSProperties => {
      const base: React.CSSProperties = {
        padding: "11px 18px",
        borderRadius: "12px",
        border: "1px solid rgba(255,255,255,0.18)",
        color: "#f7f3e9",
        background:
          "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
        cursor: "pointer",
        transition: "all 160ms ease",
        fontWeight: 600,
        fontSize: 14,
        letterSpacing: 0.4,
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        textShadow: "0 1px 2px rgba(0,0,0,0.4)",
        backdropFilter: "blur(3px)",
      };
      if (variant === "primary") {
        return {
          ...base,
          background:
            "linear-gradient(145deg, rgba(255,209,102,0.30), rgba(255,209,102,0.12))",
          borderColor: "rgba(255,209,102,0.65)",
          color: "#ffd166",
          boxShadow:
            "0 0 0 1px rgba(255,209,102,0.55), 0 8px 24px -8px rgba(255,209,102,0.55)",
          textShadow: shadows.softGold,
        };
      }
      return base;
    },
    scoreBox: {
      margin: "18px auto 0",
      padding: "18px 20px",
      borderRadius: "14px",
      background:
        "linear-gradient(180deg, rgba(46, 213, 115, 0.18), rgba(46, 213, 115, 0.07))",
      border: "1px solid rgba(46, 213, 115, 0.55)",
      color: "#d4ffe6",
      maxWidth: 520,
      textAlign: "center" as const,
      boxShadow:
        "0 0 0 1px rgba(46,213,115,0.35), 0 0 22px -6px rgba(46,213,115,0.55)",
      textShadow: shadows.jade,
    },
    fullScreenGate: {
      position: "fixed" as const,
      inset: 0,
      background:
        "radial-gradient(1200px 600px at 50% 40%, #050307 0%, #000 70%)",
      zIndex: 999,
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      gap: "22px",
    },
    gateVideoContainer: {
      width: "min(100%, 1280px)",
      maxHeight: "80dvh",
      aspectRatio: "16 / 9",
      position: "relative" as const,
      background: "#000",
      borderRadius: "12px",
      overflow: "hidden" as const,
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.08), 0 14px 40px -10px rgba(0,0,0,0.85)",
    },
    gateVideoEl: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
      background: "#000",
    },
    gateMessage: {
      fontSize: 18,
      color: "#ffd166",
      letterSpacing: 0.6,
      textAlign: "center" as const,
      fontWeight: 600,
      textShadow: shadows.glowGold,
    },
    codeWrap: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "12px",
      marginTop: "10px",
    },
    codeShell: {
      position: "relative" as const,
      background:
        "linear-gradient(180deg,#1f1f23 0%, #18181c 60%, #141416 100%)",
      border: "1px solid #2d2d34",
      borderRadius: "12px",
      overflow: "hidden" as const,
      boxShadow:
        "0 0 0 1px rgba(255,255,255,0.05), 0 18px 38px -14px rgba(0,0,0,0.9)",
      fontFamily: "'Source Code Pro', ui-monospace, Menlo, Consolas, monospace",
    },
    codeTopBar: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      padding: "6px 12px",
      background: "linear-gradient(90deg,#23262e,#1c1f25)",
      fontSize: 12,
      color: "#c5c5c5",
      borderBottom: "1px solid #31343b",
      textShadow: "0 1px 1px rgba(0,0,0,0.5)",
    },
    trafficDot: (c: string): React.CSSProperties => ({
      width: 10,
      height: 10,
      borderRadius: "50%",
      background: c,
      boxShadow: `0 0 4px ${c}`,
    }),
    editorArea: {
      display: "flex",
      alignItems: "stretch",
      position: "relative" as const,
    },
    lineNumbers: {
      userSelect: "none" as const,
      background: "#191a1d",
      color: "#4f5561",
      padding: "10px 8px 10px 12px",
      fontSize: 13,
      textAlign: "right" as const,
      borderRight: "1px solid #25262b",
      minWidth: 40,
      lineHeight: "20px",
      textShadow: "0 1px 1px rgba(0,0,0,0.5)",
    },
    textarea: {
      flex: 1,
      fontSize: 13,
      lineHeight: "20px",
      padding: "10px 14px 10px 14px",
      border: "none",
      outline: "none",
      resize: "vertical" as const,
      background: "transparent",
      color: "#e9edf3",
      fontFamily: "'Source Code Pro', ui-monospace, Menlo, Consolas, monospace",
      minHeight: 260,
      textShadow: "0 1px 1px rgba(0,0,0,0.5)",
    },
    hint: {
      fontSize: 13,
      color: "#e8ddcf",
      background:
        "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
      padding: "10px 12px",
      borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.12)",
      textShadow: "0 1px 1px rgba(0,0,0,0.5)",
      backdropFilter: "blur(2px)",
    },
    codeButtons: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: "10px",
      marginTop: 4,
      textShadow: "0 1px 2px rgba(0,0,0,0.4)",
    },
    compileOutputBox: (passed: boolean | null): React.CSSProperties => ({
      whiteSpace: "pre-wrap",
      fontSize: 12,
      lineHeight: "18px",
      background:
        passed === null
          ? "linear-gradient(180deg,#232428,#1b1c1f)"
          : passed
          ? "linear-gradient(180deg,rgba(46,213,115,0.20),rgba(46,213,115,0.07))"
          : "linear-gradient(180deg,rgba(255,71,87,0.28),rgba(255,71,87,0.10))",
      border: `1px solid ${
        passed === null
          ? "rgba(255,255,255,0.12)"
          : passed
          ? "rgba(46,213,115,0.55)"
          : "rgba(255,71,87,0.65)"
      }`,
      color: passed === null ? "#d5d5d5" : passed ? "#b9ffdc" : "#ffc5c5",
      padding: "12px 14px",
      borderRadius: 10,
      marginTop: 8,
      minHeight: 64,
      textShadow: passed
        ? shadows.jade
        : passed === null
        ? "0 1px 1px rgba(0,0,0,0.5)"
        : shadows.rose,
      boxShadow:
        passed === null
          ? "0 0 0 1px rgba(255,255,255,0.05)"
          : passed
          ? "0 0 16px -4px rgba(46,213,115,0.55)"
          : "0 0 16px -4px rgba(255,71,87,0.55)",
    }),
    codeSubmittedBanner: {
      marginTop: 14,
      padding: "12px 14px",
      borderRadius: 12,
      border: "1px solid rgba(46,213,115,0.55)",
      background:
        "linear-gradient(180deg, rgba(46,213,115,0.20), rgba(46,213,115,0.07))",
      color: "#c4ffe4",
      fontSize: 14,
      textAlign: "center" as const,
      fontWeight: 600,
      textShadow: shadows.jade,
      boxShadow: "0 0 18px -6px rgba(46,213,115,0.6)",
    },
    lockOverlay: {
      position: "absolute" as const,
      inset: 0,
      background: "rgba(0,0,0,0.55)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 15,
      fontWeight: 600,
      color: "#ffd166",
      backdropFilter: "blur(2px)",
      zIndex: 2,
      textShadow: shadows.glowGold,
    },
  };

  const progressPct: number =
    totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  const currentSelectedId: string | null = currentQuestion
    ? selected[currentQuestion.id] || null
    : null;
  const currentValidated = currentQuestion
    ? validatedAnswers[currentQuestion.id]
    : null;
  const isLocked: boolean = Boolean(currentSelectedId);
  const isPending = currentQuestion
    ? pendingValidations.includes(currentQuestion.id)
    : false;
  const isCorrectFeedback = Boolean(
    currentSelectedId && isLocked && currentValidated?.isCorrect
  );

  const CodeQuestionEditor: React.FC<{ question: Question }> = ({ question }) => {
    const qid = question.id;
    const code = codeAnswers[qid] ?? question.codeTemplate ?? "";
    const status = codeCompileStatus[qid];
    const submittedCode = Boolean(selected[qid]);
    const running = status?.running;
    const passed = status?.passed ?? null;
    const lines = code.split("\n");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      const textarea = textareaRef.current;
      if (!textarea) return;
      const pending = pendingSelections.current[qid];
      if (pending) {
        textarea.focus();
        textarea.setSelectionRange(pending.start, pending.end);
        pendingSelections.current[qid] = null;
      }
    }, [code, qid]);

    const setGlobalRef = useCallback((el: HTMLTextAreaElement | null) => {
      codeEditorRefs.current[qid] = el;
      textareaRef.current = el;
    }, [qid]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const el = e.currentTarget;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const indent = "  ";
        const newValue = el.value.slice(0, start) + indent + el.value.slice(end);
        handleCodeChange(qid, newValue, el);
        requestAnimationFrame(() => {
          el.selectionStart = el.selectionEnd = start + indent.length;
        });
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleCompileCode(qid);
      }
    };

    return (
      <div>
        <div style={style.hint}>
          {question.evaluationHint ||
            "Write the required code. Use 'Compile & Test' to run automatic tests."}
        </div>
        <div style={style.codeWrap}>
          <div style={style.codeShell}>
            <div style={style.codeTopBar}>
              <div style={style.trafficDot("#ff5f56")} />
              <div style={style.trafficDot("#ffbd2e")} />
              <div style={style.trafficDot("#27c93f")} />
              <span style={{ marginLeft: 8, color: "#b9c2cc" }}>
                {question.language || "code"} — challenge.ts
              </span>
            </div>
            <div style={{ position: "relative" }}>
              {submittedCode && (
                <div style={style.lockOverlay}>Submitted ✓ (read-only)</div>
              )}
              <div style={style.editorArea}>
                <pre aria-hidden="true" style={style.lineNumbers}>
                  {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </pre>
                <textarea
                  ref={setGlobalRef}
                  spellCheck={false}
                  value={code}
                  disabled={submittedCode}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => handleCodeChange(qid, e.target.value, e.target)}
                  style={style.textarea}
                  aria-label="Code editor"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </div>
            </div>
          </div>

          <div style={style.codeButtons}>
            <button
              style={style.btn("ghost")}
              disabled={running || submittedCode}
              onClick={() => handleCompileCode(qid)}
            >
              {running ? "Compiling..." : "Compile & Test"}
            </button>
            <button
              style={style.btn("primary")}
              disabled={
                submittedCode ||
                !status ||
                status.passed !== true ||
                running ||
                codeSubmitting[qid]
              }
              onClick={() => handleSubmitCode(qid)}
            >
              {codeSubmitting[qid] ? "Submitting..." : "Submit Code"}
            </button>
          </div>

          <div style={style.compileOutputBox(passed)}>
            {running && "Running tests..."}
            {!running && status?.output
              ? status.output
              : !running && !status?.output
              ? "Awaiting compilation..."
              : null}
          </div>

          {submittedCode && (
            <div style={style.codeSubmittedBanner}>
              Code submitted and validated! +{POINTS_PER_CORRECT} points.
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div style={style.page}>
      <HPBackground />
      {showVideoGate && currentQuestion?.videoUrl && (
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
              poster={currentQuestion.videoPoster || undefined}
              crossOrigin="anonymous"
            >
              <source src={currentQuestion.videoUrl} />
              Your browser does not support the video tag.
            </video>
          </div>
          <div style={style.gateMessage}>Watch till end to unlock question</div>
        </div>
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
                <span>+{POINTS_PER_CORRECT} pts per correct</span>
              </div>
            </div>

            {currentQuestion && !showVideoGate && (
              <div style={style.questionBox}>
                <h2 style={style.questionText}>{currentQuestion.text}</h2>

                {isCodeQuestion(currentQuestion) ? (
                  <CodeQuestionEditor question={currentQuestion} />
                ) : (
                  <>
                    <div style={style.optionsWrap}>
                      {currentQuestion.options.map((opt) => {
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
                              name={currentQuestion.id}
                              value={opt.id}
                              checked={isChecked}
                              onChange={() =>
                                handleOptionChange(currentQuestion.id, opt.id)
                              }
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
                        {currentValidated && !isPending && (
                          <div
                            style={style.feedback(currentValidated.isCorrect)}
                            aria-live="polite"
                          >
                            {currentValidated.isCorrect ? (
                              <>Correct! +{POINTS_PER_CORRECT} points</>
                            ) : (
                              <>Incorrect.</>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {!showVideoGate && (
              <div style={style.controls}>
                <button
                  style={style.btn("ghost")}
                  onClick={goPrev}
                  disabled={currentIndex === 0}
                >
                  ← Previous
                </button>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    style={style.btn("primary")}
                    onClick={goNext}
                    disabled={!canGoNext}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    style={style.btn("primary")}
                    onClick={finishQuiz}
                    disabled={
                      !currentSelectedId ||
                      isPending ||
                      (isCodeQuestion(currentQuestion) &&
                        !validatedAnswers[currentQuestion.id])
                    }
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
            <div style={{ fontSize: 16, textShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
              Score:{" "}
              <strong style={{ color: "#a7ffcf", textShadow: shadows.jade }}>
                {finalScore} / {totalQuestions * POINTS_PER_CORRECT}
              </strong>
            </div>
            <div
              style={{
                marginTop: 10,
                color: "#e9ddcf",
                textShadow: "0 1px 1px rgba(0,0,0,0.5)",
              }}
            >
              {submittingScore
                ? "Dispatching your score by owl..."
                : submitResult?.ok
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