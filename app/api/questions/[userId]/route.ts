import { dbAdmin } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: { params: Promise<{ userId: string }>}) {
    try {
        const { userId } = await params;
        const user = await dbAdmin.collection("users").doc(userId).get();
        if(!user) {
            return NextResponse.json({ message: "User not found", status: 404 });
        }
        const userDoc = user.data();
        const attemptedQuestions: string[] = userDoc?.attemptedQuestions || [];

        const questions = await dbAdmin.collection("questions").get();
        const questionWithIds = questions.docs.map(doc => doc.id);

        const unattemptedQuestions = questionWithIds.filter(id => !attemptedQuestions.includes(id));

        return NextResponse.json({ unattemptedQuestions, status: 200 })
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message, status: 500})
    }
}