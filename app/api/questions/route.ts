import { dbAdmin } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await dbAdmin.collection("question").get();
        // response se data lekr naya array banega with question ID(joki important hai) and other fields joki "spread" ho rahe hai
        // Remove correctAnswer from frontend response for security
        const questions = response.docs.map(doc => {
            const { correctAnswer, ...questionData } = doc.data();
            return { id: doc.id, ...questionData };
        });

        // Randomize the order of questions using Fisher-Yates shuffle algorithm
        const shuffledQuestions = [...questions];
        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
        }

        return NextResponse.json({ questions: shuffledQuestions, status: 200 })
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message, status: 500 });
    }
}