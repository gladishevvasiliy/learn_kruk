import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/shared/utils/getDB";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = String(searchParams.get('id'))

    const db = await getDB()
    const user = (await db.collection('users').find({ _id: new ObjectId(id) }).toArray())?.[0]

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ data: { stat: user.statistics }, success: true }, { status: 200 });
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
