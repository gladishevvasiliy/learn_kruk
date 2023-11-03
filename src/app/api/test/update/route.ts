import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/shared/utils/getDB";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { questions, icon, description, name, id } = body;

    const db = await getDB()
    const result = await db.collection('tests').findOneAndReplace(
      { "_id": new ObjectId(id) },
      { questions, icon, description, name }
    )

    return NextResponse.json({ data: { result }, success: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}