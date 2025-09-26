import { dbAdmin } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await dbAdmin.collection("questions").get();
        // response se data lekr naya array banega with question ID(joki important hai) and other fields joki "spread" ho rahe hai
        const questions = response.docs.map(doc => ({id: doc.id, ...doc.data()}))

        return NextResponse.json({ questions, status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message, status: 500 });
    }
}