import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    // Get game status from Firebase
    const gameStatusDoc = await dbAdmin.collection("gameStatus").doc("current").get();
    
    if (!gameStatusDoc.exists) {
      // If no game status exists, create default one
      const defaultStatus = {
        Round1: false,
        Round2: false,
        Round3: false,
        lastUpdated: new Date().toISOString()
      };
      
      await dbAdmin.collection("gameStatus").doc("current").set(defaultStatus);
      
      return NextResponse.json(defaultStatus);
    }
    
    const gameStatus = gameStatusDoc.data();
    
    return NextResponse.json({
      Round1: gameStatus?.Round1 || false,
      Round2: gameStatus?.Round2 || false,
      Round3: gameStatus?.Round3 || false,
      lastUpdated: gameStatus?.lastUpdated || null
    });
    
  } catch (error) {
    console.error("Error fetching game status:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch game status",
        Round1: false,
        Round2: false,
        Round3: false
      },
      { status: 500 }
    );
  }
}
