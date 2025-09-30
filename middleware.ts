import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { dbAdmin } from "@/lib/firebaseAdmin";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;
  console.log("Middleware called on path:", url.pathname); // Debug

  if (url.pathname.startsWith("/api/answer")) {
    try {
      const roundDoc = await dbAdmin.collection("game_rounds").doc("round1").get();
      if (!roundDoc.exists) {
        console.log("Round1 doc not found");
        return NextResponse.redirect(new URL("/no-round", request.url));
      }

      const data = roundDoc.data();
      const startTime = new Date(data?.start_time).getTime();
      const endTime = new Date(data?.end_time).getTime();
      const now = Date.now();

      console.log("Now:", new Date(now), "Start:", new Date(startTime), "End:", new Date(endTime));

      if (now < startTime || now > endTime) {
        console.log("Request blocked due to time window");
        return NextResponse.json(
          { error: "Answer submissions are closed for this round." },
          { status: 403 }
        );
      }

      console.log("Request allowed");
      return NextResponse.next();

    } catch (error) {
      console.error("Middleware error:", error);
      return NextResponse.redirect(new URL("/error", request.url));
    }
  }
  return NextResponse.next();
}



export const config = {
    matcher: '/api/answer/:path*',
    runtime: 'nodejs',
}
