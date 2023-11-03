import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/shared/utils/getDB";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = String(searchParams.get('id'))

    const db = await getDB()
    const test = (await db.collection('tests').find({ "_id": new ObjectId(id) }).toArray())?.[0];

    return NextResponse.json({ data: { test }, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 404 });

  }
}