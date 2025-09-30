interface TournamentState {
  roundStartTime: number;
  roundDuration: number;
  currentRound: number;
  status: 'active' | 'inactive' | 'completed';
  createdAt: string;
}

interface TeamProgress {
  [teamId: string]: {
    round1Completed: boolean;
    round2Completed: boolean;
    round3Completed: boolean;
    round1StartTime?: number;
    round1EndTime?: number;
    round1Score?: number;
    round2Score?: number;
    round3Score?: number;
  };
}

export class TournamentTimer {
  private timeOffset: number = 0;
  private tournamentState: TournamentState | null = null;
  private teamProgress: TeamProgress = {};
  private isInitialized: boolean = false;

  async initialize(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // Calculate time offset between client and server
      await this.calculateTimeOffset();
      
      // Load tournament state
      await this.loadTournamentState();
      
      // Load team progress from localStorage
      this.loadTeamProgress();
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize TournamentTimer:', error);
      // Fallback to localStorage only
      this.loadFromLocalStorage();
      this.isInitialized = true;
    }
  }

  private async calculateTimeOffset(): Promise<void> {
    try {
      const clientTime = Date.now();
      const response = await fetch('/api/time');
      const data = await response.json();
      this.timeOffset = data.serverTime - clientTime;
    } catch (error) {
      console.warn('Failed to get server time, using client time');
      this.timeOffset = 0;
    }
  }

  private async loadTournamentState(): Promise<void> {
    try {
      const response = await fetch('/api/tournament');
      const data = await response.json();
      
      if (data.tournamentState) {
        this.tournamentState = data.tournamentState;
        // Save to localStorage as backup
        localStorage.setItem('tournamentState', JSON.stringify(data.tournamentState));
      } else {
        // Fallback to localStorage
        const localState = localStorage.getItem('tournamentState');
        this.tournamentState = localState ? JSON.parse(localState) : null;
      }
    } catch (error) {
      console.warn('Failed to load tournament state from server, using localStorage');
      const localState = localStorage.getItem('tournamentState');
      this.tournamentState = localState ? JSON.parse(localState) : null;
    }
  }

  private loadTeamProgress(): void {
    const teamInfo = this.getTeamInfo();
    if (!teamInfo) return;

    const savedProgress = localStorage.getItem(`teamProgress_${teamInfo.teamId}`);
    if (savedProgress) {
      this.teamProgress = JSON.parse(savedProgress);
    }
  }

  private loadFromLocalStorage(): void {
    const localState = localStorage.getItem('tournamentState');
    this.tournamentState = localState ? JSON.parse(localState) : null;
    this.loadTeamProgress();
  }

  private getTeamInfo(): any {
    try {
      const teamInfo = localStorage.getItem('teamInfo');
      return teamInfo ? JSON.parse(teamInfo) : null;
    } catch {
      return null;
    }
  }

  private saveTeamProgress(): void {
    const teamInfo = this.getTeamInfo();
    if (teamInfo) {
      localStorage.setItem(`teamProgress_${teamInfo.teamId}`, JSON.stringify(this.teamProgress));
    }
  }

  getSynchronizedTime(): number {
    return Date.now() + this.timeOffset;
  }

  getTournamentState(): TournamentState | null {
    return this.tournamentState;
  }

  isTournamentActive(): boolean {
    return this.tournamentState?.status === 'active';
  }

  getTimeUntilRoundStart(roundNumber: number): number {
    if (!this.tournamentState) return 0;
    
    const now = this.getSynchronizedTime();
    const roundStartTime = this.tournamentState.roundStartTime + 
                          ((roundNumber - 1) * this.tournamentState.roundDuration);
    
    return Math.max(0, roundStartTime - now);
  }

  getTimeUntilRoundEnd(roundNumber: number): number {
    if (!this.tournamentState) return 0;
    
    const now = this.getSynchronizedTime();
    const roundStartTime = this.tournamentState.roundStartTime + 
                          ((roundNumber - 1) * this.tournamentState.roundDuration);
    const roundEndTime = roundStartTime + this.tournamentState.roundDuration;
    
    return Math.max(0, roundEndTime - now);
  }

  isRoundActive(roundNumber: number): boolean {
    if (!this.tournamentState) return false;
    
    const now = this.getSynchronizedTime();
    const roundStartTime = this.tournamentState.roundStartTime + 
                          ((roundNumber - 1) * this.tournamentState.roundDuration);
    const roundEndTime = roundStartTime + this.tournamentState.roundDuration;
    
    return now >= roundStartTime && now < roundEndTime;
  }

  canAccessRound(roundNumber: number): boolean {
    const teamInfo = this.getTeamInfo();
    if (!teamInfo || !this.tournamentState) return false;

    // Round 1: Available if not completed by this team
    if (roundNumber === 1) {
      return !this.teamProgress[teamInfo.teamId]?.round1Completed;
    }

    // Round 2: Only if Round 1 completed AND Round 2 time has started
    if (roundNumber === 2) {
      const round1Completed = this.teamProgress[teamInfo.teamId]?.round1Completed;
      const round2Started = this.isRoundActive(2) || this.getTimeUntilRoundStart(2) === 0;
      return round1Completed && round2Started;
    }

    // Round 3: Only if Round 2 completed AND Round 3 time has started
    if (roundNumber === 3) {
      const round2Completed = this.teamProgress[teamInfo.teamId]?.round2Completed;
      const round3Started = this.isRoundActive(3) || this.getTimeUntilRoundStart(3) === 0;
      return round2Completed && round3Started;
    }

    return false;
  }

  getRoundStatus(roundNumber: number): 'waiting' | 'active' | 'completed' | 'locked' {
    const timeUntilStart = this.getTimeUntilRoundStart(roundNumber);
    const timeUntilEnd = this.getTimeUntilRoundEnd(roundNumber);
    const canAccess = this.canAccessRound(roundNumber);

    if (!canAccess) return 'locked';
    if (timeUntilStart > 0) return 'waiting';
    if (timeUntilEnd > 0) return 'active';
    return 'completed';
  }

  markRoundCompleted(roundNumber: number, score: number): void {
    const teamInfo = this.getTeamInfo();
    if (!teamInfo) return;

    if (!this.teamProgress[teamInfo.teamId]) {
      this.teamProgress[teamInfo.teamId] = {
        round1Completed: false,
        round2Completed: false,
        round3Completed: false,
      };
    }

    const now = this.getSynchronizedTime();
    
    if (roundNumber === 1) {
      this.teamProgress[teamInfo.teamId].round1Completed = true;
      this.teamProgress[teamInfo.teamId].round1Score = score;
      this.teamProgress[teamInfo.teamId].round1EndTime = now;
    } else if (roundNumber === 2) {
      this.teamProgress[teamInfo.teamId].round2Completed = true;
      this.teamProgress[teamInfo.teamId].round2Score = score;
    } else if (roundNumber === 3) {
      this.teamProgress[teamInfo.teamId].round3Completed = true;
      this.teamProgress[teamInfo.teamId].round3Score = score;
    }

    this.saveTeamProgress();
  }

  getTeamProgress(): any {
    const teamInfo = this.getTeamInfo();
    if (!teamInfo) return null;
    return this.teamProgress[teamInfo.teamId];
  }

  // Admin functions
  async startTournament(roundDuration: number = 3600000): Promise<boolean> {
    try {
      const response = await fetch('/api/tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'start',
          roundDuration: roundDuration,
        }),
      });

      const data = await response.json();
      if (data.success) {
        this.tournamentState = data.tournamentState;
        localStorage.setItem('tournamentState', JSON.stringify(data.tournamentState));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to start tournament:', error);
      return false;
    }
  }

  async stopTournament(): Promise<boolean> {
    try {
      const response = await fetch('/api/tournament', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'stop',
        }),
      });

      const data = await response.json();
      if (data.success) {
        this.tournamentState = null;
        localStorage.removeItem('tournamentState');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to stop tournament:', error);
      return false;
    }
  }
}

// Singleton instance
export const tournamentTimer = new TournamentTimer();
