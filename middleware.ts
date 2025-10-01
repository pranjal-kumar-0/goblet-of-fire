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
    if (url.pathname.startsWith("/game/")) {
      const statusDoc = await dbAdmin.collection("gameStatus").doc("current").get();

      if (!statusDoc.exists) {
        console.log("Game status not found");
        return NextResponse.redirect(new URL("/no-game", request.url));
      }

      const statusData = statusDoc.data();

      // Example: if user visits /game/bingo-time → check Round2 is true
      if (url.pathname.includes("bingo-time") && !statusData?.Round2) {
        console.log("Bingo-time blocked (Round2 is false)");
        const url = request.nextUrl.clone();
            url.pathname = '/404'; 
            return NextResponse.rewrite(url);

      }
      if (url.pathname.includes("find-the-trophy") && !statusData?.Round3) {
        console.log("Find-the-trophy blocked (Round3 is false)");
        const url = request.nextUrl.clone();
            url.pathname = '/404'; 
            return NextResponse.rewrite(url);

      }


      console.log("Frontend route allowed");
      return NextResponse.next();
    }
  return NextResponse.next();
}



// export const config = {
//     matcher: '/api/answer/:path*',
//     runtime: 'nodejs',
// }
export const config = {
  matcher: [
    "/api/answer/:path*",
    "/game/:path*",
  ],
  runtime: "nodejs",
};