import { dbAdmin } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import * as admin from "firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { teamId, questionId, selectedAnswer } = body;

    const isValidQuestion = await dbAdmin
      .collection("question")
      .doc(questionId)
      .get();
    if (!isValidQuestion.exists) {
      return NextResponse.json({ message: "Invalid question", status: 404 });
    }

    const isValidUser = await dbAdmin.collection("teams").doc(teamId).get();
    if (!isValidUser.exists) {
      return NextResponse.json({ message: "User Id not found", status: 401 });
    }

    const question = isValidQuestion.data();
    const user = isValidUser.data();
    const userScore = (selectedAnswer === question?.correctAnswer)
      ? (
        (question?.difficulty === "easy" && 3) ||
        (question?.difficulty === "medium" && 5) ||
        (question?.difficulty === "hard" && 10) ||
        0
      )
    : 0;


    await dbAdmin.collection("teams").doc(teamId).update({
      score: admin.firestore.FieldValue.increment(userScore),
      questionsAttempted: admin.firestore.FieldValue.arrayUnion(questionId)
    })
    return NextResponse.json({ achievedScore: userScore })
  } catch (error) {
    return NextResponse.json({
      message: (error as Error).message,
      status: 500,
    });
  }
}
