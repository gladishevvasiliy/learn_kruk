import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/shared/utils/getDB";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const db = await getDB()
    const users = await db.collection('users').find({}).toArray()

    return NextResponse.json({ data: { users }, success: true }, { status: 200 });
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ success: false }, { status: 500 });
  }
}