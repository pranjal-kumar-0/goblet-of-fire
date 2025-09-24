// auth/index.ts
// Components
export { AuthDashboard } from "./components/AuthDashboard";
export { AuthForm } from "./components/AuthForm";
export { Leaderboard } from "./components/Leaderboard";
export { Message } from "./components/Message";
export { TriwizardTournament } from "./components/TriwizardTournament";

// Hooks
export { useAuth, AuthProvider } from "./hooks/useAuth";
export { useMessage } from "./hooks/useMessage";

// Utils
export { AuthService } from "./utils/authService";
export { EnrollmentAuthService } from "./utils/enrollmentAuth";
export type { EnrollmentData } from "./utils/enrollmentAuth";

// Types
export type { AuthUser, Score, AuthContextType, MessageType } from "./types";

// Firebase config
export { auth, db } from "../firebase/firebase.config";