
import Word from "@/libs/models/word.model";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDB();
  const words = await Word.find();
  return NextResponse.json({ words });
}

export async function POST(request: Request) {
  const word = await request.json();
  const { text, fontSize, color, uniqueKey } = word;

  await connectToDB();
  await Word.create({ text, fontSize, color, uniqueKey });
  return NextResponse.json({ message: "Car Created" }, { status: 201 });
}
