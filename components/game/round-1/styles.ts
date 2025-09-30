import { CSSProperties } from "react";

export const shadows = {
  glowGold: "0 0 4px rgba(255,209,102,0.3), 0 0 12px rgba(255,209,102,0.2)",
  softGold: "0 0 2px rgba(255,209,102,0.25)",
  subtleLight: "0 1px 1px rgba(0,0,0,0.4)",
  deep: "0 1px 2px rgba(0,0,0,0.5)",
  ember: "0 0 4px rgba(250,88,44,0.3)",
  jade: "0 0 4px rgba(46,213,115,0.3)",
  rose: "0 0 4px rgba(255,71,87,0.3)",
  lilac: "0 0 4px rgba(199,125,255,0.3)",
};

export const style = {  page: {
    minHeight: "100vh",
    height: "100vh",
    color: "#f7f3e9",
    padding: "8px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative" as const,
    overflow: "hidden" as const,
    background: "linear-gradient(to bottom, #1a1a2e 0%, #16213e 40%, #0f0f23 100%)",
    userSelect: "none" as const,
    WebkitUserSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
    WebkitTouchCallout: "none" as const,
    WebkitTapHighlightColor: "transparent",
  },card: {
    width: "min(1000px, 95vw)",
    maxHeight: "95vh",
    overflowY: "auto" as const,
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "16px",
    padding: "28px 32px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
    backdropFilter: "blur(6px)",
    textAlign: "center" as const,
    position: "relative" as const,
    zIndex: 2,
    userSelect: "none" as const,
    WebkitUserSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
    WebkitTouchCallout: "none" as const,
    WebkitTapHighlightColor: "transparent",
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
  },  progressWrap: {
    margin: "20px auto 28px",
    maxWidth: 800,
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
  progressFill: (pct: number): CSSProperties => ({
    width: `${pct}%`,
    height: "100%",
    background: "linear-gradient(90deg, #ffd166, #f77f00, #e85d04 120%)",
    transition: "width 280ms ease",
    boxShadow: "0 0 12px 2px rgba(255,209,102,0.35)",
  }),  questionBox: {
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "14px",
    padding: "28px 32px",
    margin: "0 auto 24px",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
    maxWidth: 800,
    textAlign: "left" as const,
    boxShadow:
      "0 14px 32px -8px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)",
    position: "relative" as const,
    userSelect: "none" as const,
    WebkitUserSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
    WebkitTouchCallout: "none" as const,
    WebkitTapHighlightColor: "transparent",
  },questionText: {
    fontSize: "26px",
    margin: "0 0 24px",
    color: "#f8efe1",
    textAlign: "center" as const,
    fontWeight: 600,
    letterSpacing: 0.4,
    textShadow:
      "0 1px 2px rgba(0,0,0,0.4), 0 0 4px rgba(255,209,102,0.1)",
    userSelect: "none" as const,
    WebkitUserSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
    WebkitTouchCallout: "none" as const,
    WebkitTapHighlightColor: "transparent",
  },optionsWrap: {
    display: "grid",
    gap: 18,
    justifyItems: "stretch" as const,
    marginTop: 8,
  },  option: (
    checked: boolean,
    isCorrectFeedback: boolean,
    locked: boolean
  ): CSSProperties => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "20px 24px",
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
    fontSize: "16px",
    fontWeight: 500,
    userSelect: "none" as const,
    WebkitUserSelect: "none" as const,
    MozUserSelect: "none" as const,
    msUserSelect: "none" as const,
    WebkitTouchCallout: "none" as const,
    WebkitTapHighlightColor: "transparent",
    ...(checked && {
      boxShadow:
        "0 0 0 1px rgba(255,209,102,0.55), 0 6px 18px -4px rgba(255,209,102,0.35)",
    }),
    ...(checked &&
      locked && {
        borderColor: isCorrectFeedback
          ? "rgba(46, 213, 115, 0.65)"
          : "rgba(46, 213, 115, 0.65)",
        boxShadow: isCorrectFeedback
          ? "0 0 0 1px rgba(46,213,115,0.6), 0 8px 20px -6px rgba(46,213,115,0.4)"
          : "0 0 0 1px rgba(46,213,115,0.6), 0 8px 20px -6px rgba(46,213,115,0.4)",
        textShadow: isCorrectFeedback ? shadows.jade : shadows.rose,
      }),
    ...(locked && !checked && { opacity: 0.75 }),
  }),
  feedback: (isCorrect: boolean): CSSProperties => ({
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
  },  controls: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "18px",
    marginTop: "24px",
    flexWrap: "wrap" as const,
    textShadow: "0 1px 2px rgba(0,0,0,0.4)",
  },  btn: (variant: "ghost" | "primary" = "ghost", disabled: boolean = false): CSSProperties => {
    const base: CSSProperties = {
      padding: "11px 18px",
      borderRadius: "12px",
      border: "1px solid rgba(255,255,255,0.18)",
      color: "#f7f3e9",
      background:
        "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
      cursor: disabled ? "not-allowed" : "pointer",
      transition: "all 160ms ease",
      fontWeight: 600,
      fontSize: 14,
      letterSpacing: 0.4,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      textShadow: "0 1px 2px rgba(0,0,0,0.4)",
      backdropFilter: "blur(3px)",
      opacity: disabled ? 0.5 : 1,
    };

    if (variant === "primary") {
      return {
        ...base,
        background: disabled 
          ? "linear-gradient(145deg, rgba(120,120,120,0.20), rgba(120,120,120,0.08))"
          : "linear-gradient(145deg, rgba(255,209,102,0.30), rgba(255,209,102,0.12))",
        borderColor: disabled 
          ? "rgba(120,120,120,0.35)" 
          : "rgba(255,209,102,0.65)",
        color: disabled ? "#999" : "#ffd166",
        boxShadow: disabled 
          ? "0 0 0 1px rgba(120,120,120,0.25), 0 4px 12px -4px rgba(120,120,120,0.25)"
          : "0 0 0 1px rgba(255,209,102,0.55), 0 8px 24px -8px rgba(255,209,102,0.55)",
        textShadow: disabled ? "0 1px 1px rgba(0,0,0,0.5)" : shadows.softGold,
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
  },  fullScreenGate: {
    position: "fixed" as const,
    inset: 0,
    background:
      "radial-gradient(1200px 600px at 50% 40%, #050307 0%, #000 70%)",
    zIndex: 999,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "center",
    padding: "0",
    gap: "0",
  },  gateVideoContainer: {
    width: "min(100%, 1800px)",
    height: "85vh",
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
  trafficDot: (c: string): CSSProperties => ({
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
  },  textarea: {
    flex: 1,
    fontSize: 14,
    lineHeight: "22px",
    padding: "16px 18px",
    border: "none",
    outline: "none",
    resize: "vertical" as const,
    background: "transparent",
    color: "#e9edf3",
    fontFamily: "'Source Code Pro', ui-monospace, Menlo, Consolas, monospace",
    minHeight: 450,
    maxHeight: "50vh",
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
  compileOutputBox: (passed: boolean | null): CSSProperties => ({
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
