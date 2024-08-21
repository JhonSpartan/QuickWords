
import Word from "@/libs/models/word.model";
import { connectToDB } from "@/libs/mongoose";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDB();
  const words = await Word.find();
  return NextResponse.json({ words });
}
