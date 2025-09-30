import { NextResponse } from "next/server";

// Simple in-memory tournament state (in production, use a database)
let tournamentState: any = null;

export async function GET() {
  return NextResponse.json({ 
    tournamentState,
    serverTime: Date.now()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, roundDuration = 3600000 } = body; // Default 1 hour
    
    if (action === 'start') {
      tournamentState = {
        roundStartTime: Date.now(),
        roundDuration: roundDuration, // Duration in milliseconds
        currentRound: 1,
        status: 'active',
        createdAt: new Date().toISOString()
      };
      
      return NextResponse.json({ 
        success: true, 
        tournamentState,
        message: 'Tournament started successfully'
      });
    }
    
    if (action === 'stop') {
      tournamentState = null;
      return NextResponse.json({ 
        success: true,
        message: 'Tournament stopped'
      });
    }
    
    if (action === 'status') {
      return NextResponse.json({ 
        success: true,
        tournamentState,
        serverTime: Date.now()
      });
    }
    
    return NextResponse.json({ 
      error: 'Invalid action. Use: start, stop, or status' 
    }, { status: 400 });
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to process request' 
    }, { status: 500 });
  }
}


