import { NextResponse } from "next/server";
import teamCredentials from "@/data/team-credentials.json";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      teams: teamCredentials.teams,
      totalTeams: teamCredentials.teams.length,
      settings: teamCredentials.settings
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { teamId, password } = await request.json();
    
    const team = teamCredentials.teams.find(t => 
      t.teamId === teamId && t.password === password
    );

    if (team) {
      return NextResponse.json({
        success: true,
        team: {
          teamId: team.teamId,
          name: team.name,
          house: team.house,
          email: team.email
        },
        message: "Authentication successful"
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Invalid request" },
      { status: 400 }
    );
  }
}
