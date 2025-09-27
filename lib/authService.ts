import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/firebase.config";
import teamCredentials from "@/data/team-credentials.json";

export interface Team {
  teamId: string;
  password: string;
  name: string;
  house: string;
  email: string;
}

export interface AuthResult {
  success: boolean;
  team?: Team;
  error?: string;
  method: 'firebase' | 'fallback';
}

export class AuthService {
  private static teams: Team[] = teamCredentials.teams;

  // Primary authentication via Firebase
  static async authenticateWithFirebase(teamId: string, password: string): Promise<AuthResult> {
    try {
      const email = `${teamId}@goblet-of-fire.local`;
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      const team = this.teams.find(t => t.teamId === teamId);
      
      return {
        success: true,
        team: team,
        method: 'firebase'
      };
    } catch (error: any) {
      console.log('Firebase auth failed, trying fallback...', error.message);
      throw error; // Let fallback method handle it
    }
  }

  // Fallback authentication via local JSON
  static authenticateWithFallback(teamId: string, password: string): AuthResult {
    const team = this.teams.find(t => 
      t.teamId === teamId && t.password === password
    );

    if (team) {
      return {
        success: true,
        team: team,
        method: 'fallback'
      };
    }

    return {
      success: false,
      error: 'Invalid Team ID or Password',
      method: 'fallback'
    };
  }

  // Main authentication method with fallback
  static async authenticate(teamId: string, password: string): Promise<AuthResult> {
    try {
      // Try Firebase first
      return await this.authenticateWithFirebase(teamId, password);
    } catch (firebaseError) {
      console.log('Firebase unavailable, using fallback authentication');
      
      // Fallback to local JSON
      return this.authenticateWithFallback(teamId, password);
    }
  }

  // Get all teams (for admin purposes)
  static getAllTeams(): Team[] {
    return this.teams;
  }

  // Get team by ID
  static getTeamById(teamId: string): Team | undefined {
    return this.teams.find(t => t.teamId === teamId);
  }

  // Validate team credentials
  static validateCredentials(teamId: string, password: string): boolean {
    const team = this.teams.find(t => 
      t.teamId === teamId && t.password === password
    );
    return !!team;
  }

  // Get random teams for testing
  static getRandomTeams(count: number = 5): Team[] {
    const shuffled = [...this.teams].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Check if Firebase is available
  static async isFirebaseAvailable(): Promise<boolean> {
    try {
      // Simple test to check Firebase connectivity
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), 3000);
        auth.onAuthStateChanged(() => {
          clearTimeout(timeout);
          resolve(true);
        });
      });
      return true;
    } catch {
      return false;
    }
  }
}
