import { NextResponse } from "next/server";
import admin from "firebase-admin";

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

export async function GET(request: Request) {
  try {
    const snapshot = await db.collection("qr").get();
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return NextResponse.json({ data }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error message:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }

    return NextResponse.json({ error: "Failed to fetch QR data" }, { status: 500 });
  }
}