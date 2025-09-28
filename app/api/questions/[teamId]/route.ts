import { dbAdmin } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: { params: Promise<{ teamId: string }>}) {
    try {
        const { teamId } = await params;
        const team = await dbAdmin.collection("teams").doc(teamId).get();
        if(!team) {
            return NextResponse.json({ message: "Team not found", status: 404 });
        }
        const teamDoc = team.data();
        const attemptedQuestions: string[] = teamDoc?.questionsAttempted || [];

        const questions = await dbAdmin.collection("question").get();
        const questionWithIds = questions.docs.map(doc => doc.id);

        const unattemptedQuestions = questionWithIds.filter(id => !attemptedQuestions.includes(id));

        return NextResponse.json({ attemptedQuestions: team.get("questionsAttempted"),unattemptedQuestions, status: 200 })
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message, status: 500})
    }
}