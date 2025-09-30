"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { style } from "./styles";

interface Question {
  id: string;
  text: string;
  codeTemplate?: string;
  language?: string;
  evaluationHint?: string;
}

interface CodeCompileStatus {
  running: boolean;
  output: string;
  passed: boolean | null;
}

interface CodeQuestionProps {
  question: Question;
  code: string;
  compileStatus: CodeCompileStatus | undefined;
  isSubmitted: boolean;
  isSubmitting: boolean;
  pointsPerCorrect: number;
  onCodeChange: (qid: string, value: string, textarea?: HTMLTextAreaElement) => void;
  onCompileCode: (qid: string) => void;
  onSubmitCode: (qid: string) => void;
  codeEditorRef: React.MutableRefObject<{ [qid: string]: HTMLTextAreaElement | null }>;
  pendingSelections: React.MutableRefObject<{ [qid: string]: { start: number; end: number } | null }>;
}

const CodeQuestion: React.FC<CodeQuestionProps> = ({
  question,
  code,
  compileStatus,
  isSubmitted,
  isSubmitting,
  pointsPerCorrect,
  onCodeChange,
  onCompileCode,
  onSubmitCode,
  codeEditorRef,
  pendingSelections,
}) => {
  const qid = question.id;
  const codeValue = code ?? question.codeTemplate ?? "";
  const status = compileStatus;
  const submittedCode = isSubmitted;
  const running = status?.running;
  const passed = status?.passed ?? null;
  const lines = codeValue.split("\n");
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
  }, [codeValue, qid, pendingSelections]);

  const setGlobalRef = useCallback((el: HTMLTextAreaElement | null) => {
    codeEditorRef.current[qid] = el;
    textareaRef.current = el;
  }, [qid, codeEditorRef]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const indent = "  ";
      const newValue = el.value.slice(0, start) + indent + el.value.slice(end);
      onCodeChange(qid, newValue, el);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + indent.length;
      });
    } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
      e.preventDefault();
      onCompileCode(qid);
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
                value={codeValue}
                disabled={submittedCode}
                onKeyDown={handleKeyDown}
                onChange={(e) => onCodeChange(qid, e.target.value, e.target)}
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
            onClick={() => onCompileCode(qid)}
          >
            {running ? "Compiling..." : "Compile & Test"}
          </button>
          <button
            style={style.btn("primary")}
            disabled={
              Boolean(
                submittedCode ||
                !status ||
                status.passed !== true ||
                running ||
                isSubmitting
              )
            }
            onClick={() => onSubmitCode(qid)}
          >
            {isSubmitting ? "Submitting..." : "Submit Code"}
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
            Code submitted and validated! +{pointsPerCorrect} points.
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeQuestion;
