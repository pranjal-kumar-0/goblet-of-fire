import { NextResponse } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";
import * as admin from "firebase-admin"

export async function POST() {
  try {
    const now = new Date();
    const startTime = now.toISOString();
    const endTime = new Date(now.getTime() + 3 * 60 * 1000).toISOString(); // +3 min

    await dbAdmin.collection("game_rounds").doc("round1").set({
      start_time: startTime,
      end_time: endTime,
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({
      message: "Round1 timer set successfully",
      start_time: startTime,
      end_time: endTime,
    });
  } catch (error) {
    console.error("Error setting round1:", error);
    return NextResponse.json(
      { error: "Failed to set round1 timer" },
      { status: 500 }
    );
  }
}
