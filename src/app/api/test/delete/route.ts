import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/shared/utils/getDB";
import { ObjectId } from "mongodb";
export const dynamic = "force-dynamic";

export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const id = String(searchParams.get('id'))

    const db = await getDB()
    const deletedTest = await db.collection('tests').deleteOne({ "_id": new ObjectId(id) })

    return NextResponse.json({ data: { deletedTest }, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 404 });

  }
}