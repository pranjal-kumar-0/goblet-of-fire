import { dbAdmin } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await dbAdmin.collection("scores").orderBy("score","desc").get();

        const usersWithScore = response.docs.map(doc => ({id: doc.id, userScore: doc.get("score"), ...doc.data() }))
        if(!usersWithScore) {
            return NextResponse.json({ message: "Not a valid user", status: 404});
        }

        return NextResponse.json({ usersWithScore, status: 200 });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message, status: 500});
    }
}