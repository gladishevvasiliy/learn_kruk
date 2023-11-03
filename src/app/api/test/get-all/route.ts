export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getDB } from "@/shared/utils/getDB";

export async function GET() {
  try {
    const db = await getDB()
    const tests = await db.collection('tests').find({}).toArray();
    console.log({ tests })
    return NextResponse.json({ data: { tests }, success: true }, { status: 200 });
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ success: false, error }, { status: 404 });

  }
}