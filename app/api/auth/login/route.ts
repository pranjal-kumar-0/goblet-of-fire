import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { teamName, password } = body;

    console.log("Login attempt:", { teamName });

    if (!teamName || !password) {
      return NextResponse.json(
        { error: "Team name and password are required" },
        { status: 400 }
      );
    }

    // Get team document from Firestore
    const teamDoc = await dbAdmin.collection("teams").doc(teamName).get();

    if (!teamDoc.exists) {
      return NextResponse.json(
        { error: "Invalid team credentials" },
        { status: 401 }
      );
    }

    const teamData = teamDoc.data();

    // Verify password
    if (teamData?.password !== password) {
      return NextResponse.json(
        { error: "Invalid team credentials" },
        { status: 401 }
      );
    }

    // Return success response with team info
    return NextResponse.json({
      message: "Login successful",
      team: {
        teamId: teamName,
        name: teamData?.name,
        house: teamData?.house,
      },
    }, { status: 200 });

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Login error:", error.message);
    } else {
      console.error("Unexpected login error:", error);
    }

    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  return NextResponse.json({
    message: "Auth login endpoint is working!"
  });
}