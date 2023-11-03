import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/shared/utils/getDB";
import { ObjectId } from "mongodb";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
import { isEmailValid } from '@/shared/utils/isEmailValid'
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    const db = await getDB()

    if (!isEmailValid(email)) {
      return NextResponse.json({ message: "Некоректный email", success: false }, { status: 400 });
    }

    if (!Boolean(password.length)) {
      return NextResponse.json({ message: "Введите пароль", success: false }, { status: 400 });
    }

    const user = await db.collection('users').find({ email }).toArray();

    if (!user) {
      return NextResponse.json({ message: "Пользователь не найден", success: false }, { status: 404 });
    }

    const isMatchPassword = await bcrypt.compare(password, user[0].password);

    if (!isMatchPassword) {
      return NextResponse.json({ message: "Неверный пароль, попробуйне снова", success: false }, { status: 404 });
    }

    const token = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return NextResponse.json({ token, userId: user[0].id }, { status: 200 });
  } catch (error) {
    console.log({ error })
    return NextResponse.json({ success: false }, { status: 404 });
  }
}