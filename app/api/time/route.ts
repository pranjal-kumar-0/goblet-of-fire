import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    serverTime: Date.now(),
    timestamp: new Date().toISOString(),
    timezone: 'UTC'
  });
}


