import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/shared/utils/getDB";
const bcrypt = require("bcryptjs");
import { isEmailValid } from '@/shared/utils/isEmailValid'
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;
    const db = await getDB()
    const candidateByEmail = await db.collection('users').find({ email }).toArray();
    const candidateByName = await db.collection('users').find({ name }).toArray();

    if (!isEmailValid(email)) {
      return NextResponse.json({ message: "Некоректный email", success: false }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: "Минимальная длина пароля 6 символов", success: false }, { status: 400 });
    }

    if (candidateByEmail.length !== 0) {
      return NextResponse.json({ message: "Пользователь с таким email уже существует.", success: true }, { status: 400 });
    }

    if (candidateByName.length !== 0) {
      return NextResponse.json({ message: "Пользователь с таким именем уже существует.", success: true }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await db.collection('users').insertMany([{ email, password: hashedPassword, name }])

    return NextResponse.json({ data: { user }, message: "Пользователь создан", success: true }, { status: 200 });
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ success: false }, { status: 404 });
  }
}