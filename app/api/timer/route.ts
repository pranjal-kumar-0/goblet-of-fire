import { dbAdmin } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
  
    const roundDoc = await dbAdmin.collection("game_rounds").doc("round1").get();
 

    const roundData = roundDoc.data();
    console.log(roundData)
    return NextResponse.json({
      startTime: roundData?.start_time,
      endTime: roundData?.end_time,
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      status: 500,
    });
  }
}
