
import Word from "@/libs/models/word.model";
import { connectToDB } from "@/libs/mongoose";
import { ParamsShape } from "@/types";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params: {id} }: ParamsShape ) {
  await connectToDB();
  const word = await Word.findOne({ _id: id });
  return NextResponse.json({ word }, { status: 200 });
}

export async function PUT(request: Request, { params : {id} }: ParamsShape ) {
  const word  = await request.json();
  const { text, fontSize, color } = word;
  await connectToDB();
  await Word.findByIdAndUpdate(id, { text, fontSize, color });
  return NextResponse.json({ message: "Word updated" }, { status: 200 });
}


export async function DELETE(request: Request, { params: {id} }: ParamsShape ) {
  await connectToDB();
  await Word.findByIdAndDelete(id);
  return NextResponse.json({ message: "Word Deleted" }, { status: 200 });
}
