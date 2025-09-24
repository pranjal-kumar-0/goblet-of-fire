// auth/utils/authService.ts
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  sendPasswordResetEmail,
  User
} from "firebase/auth";
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit, 
  where, 
  writeBatch 
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import { Score } from "../types";

export class AuthService {
  // Authentication methods
  static async signup(email: string, password: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  static async login(email: string, password: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  static async logout(): Promise<void> {
    await signOut(auth);
  }

  static async resetPassword(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  }

  static async deleteAccount(): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("No user logged in.");
    }

    // Delete user's scores first
    const scoresRef = collection(db, "scores");
    const q = query(scoresRef, where("uid", "==", user.uid));
    const snapshot = await getDocs(q);

    const batch = writeBatch(db);
    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    // Delete the user account
    await user.delete();
  }

  // Leaderboard methods
  static async addScore(score: number): Promise<void> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Must be logged in to submit score.");
    }

    await addDoc(collection(db, "scores"), {
      uid: user.uid,
      email: user.email,
      score: score,
      timestamp: new Date(),
    });
  }

  static async getLeaderboard(limitCount: number = 10): Promise<Score[]> {
    const q = query(
      collection(db, "scores"), 
      orderBy("score", "desc"), 
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: data.uid,
        email: data.email,
        score: data.score,
        timestamp: data.timestamp,
      } as Score;
    });
  }

  // Error handling
  private static handleAuthError(error: any): Error {
    switch (error.code) {
      case "auth/email-already-in-use":
        return new Error("Email already in use. Try logging in.");
      case "auth/invalid-email":
        return new Error("Invalid email address.");
      case "auth/weak-password":
        return new Error("Password should be at least 6 characters.");
      case "auth/user-not-found":
        return new Error("No account found with this email.");
      case "auth/wrong-password":
        return new Error("Incorrect password.");
      case "auth/requires-recent-login":
        return new Error("Please log in again to perform this action.");
      default:
        return new Error(error.message || "An authentication error occurred.");
    }
  }
}