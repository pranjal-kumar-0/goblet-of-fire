// auth/types/index.ts
import { User } from "firebase/auth";

export interface AuthUser extends User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export interface Score {
  uid: string;
  email: string;
  score: number;
  timestamp?: any; // Firebase timestamp
}

export interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  deleteAccount: () => Promise<void>;
}

export interface MessageType {
  text: string;
  type: 'success' | 'error';
}