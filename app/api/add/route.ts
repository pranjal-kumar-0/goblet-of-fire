
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import admin from "firebase-admin"

export function GET(request: Request) {
    return NextResponse.json({
        message: "Backend in working bhai!!!!!!!"
    })
}


// export async function POST(request: Request){
//     let data = request.json()
//     console.log(data)
//     return NextResponse.json({success: true, data: "yes"})
// }
if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.NEXT_FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.NEXT_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });
  }

  const db = admin.firestore();

  export async function POST(req: Request) {
    try {
      const body = await req.json();
      console.log("Request body:", body);
  
      const docRef = await db.collection("users").add(body);
  
      return NextResponse.json({ message: "User onboarded successfully", id: docRef.id }, { status: 200 });
    } catch (error: any) {
      console.error(error);
      return NextResponse.json({ error: "Failed to onboard Users" }, { status: 500 });
    }
  }
  