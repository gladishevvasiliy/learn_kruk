import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/shared/utils/getDB";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { testId, name, correctAnswers, totalQuestions } = body;

    const searchParams = request.nextUrl.searchParams
    const id = String(searchParams.get('id'))

    const db = await getDB()

    const user = (await db.collection('users').find({ _id: new ObjectId(id) }).toArray())?.[0]

    if (!Boolean(user.statistics)) {
      user.statistics = []
    }

    // Проверяем, есть ли уже объект с данным testId в массиве statistics
    const existingStatistics = user?.statistics?.find(
      (stat) => stat.testId === testId
    );

    console.log({ existingStatistics })

    if (existingStatistics) {
      // Если объект с таким testId уже существует, заменяем его
      if (correctAnswers > existingStatistics.correctAnswers) {
        existingStatistics.correctAnswers = correctAnswers;
        existingStatistics.errorAnswers = totalQuestions - correctAnswers;
      }
    } else {
      // Если объекта с таким testId нет, добавляем новый объект в массив statistics
      user.statistics.push({
        testId,
        name,
        correctAnswers,
        errorAnswers: totalQuestions - correctAnswers,
      });
    }

    const updatedUser = await db.collection('users').findOneAndReplace({ _id: new ObjectId(id) }, user)

    return NextResponse.json({ data: { updatedUser }, message: "Statistics updated successfully", success: true }, { status: 200 });
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
