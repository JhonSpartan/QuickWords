
import Word from "@/libs/models/word.model";
import { connectToDB } from "@/libs/mongoose";
import { ParamsShape } from "@/types";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params: {id} }: ParamsShape ) {
  await connectToDB();
  const word = await Word.findOne({ _id: id });
  return NextResponse.json({ word }, { status: 200 });
}
