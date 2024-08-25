"use server"

import { revalidateTag } from "next/cache";
import Car from "../models/word.model";
import { connectToDB } from "../mongoose";
import { WordShape } from "@/types";
import Word from "../models/word.model";

export async function getWords() {
  try {
    await connectToDB();
    const data = await Word.find();
    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function createCarAction(word: WordShape) {
  try {
    const { text, fontSize, color, uniqueKey } = word;
    await connectToDB();
    await Word.create({ text, fontSize, color, uniqueKey });
    revalidateTag("words");
  } catch (error) {
    console.log(error);
  }
}

export async function updateCarsAction(car: any, id: string | undefined) {
  try {   
    const { text, fontSize, color } = car;
    await connectToDB();
    await Car.findOneAndUpdate({_id: id }, { text, fontSize, color });
    revalidateTag("cars");
  } catch (error) {
    console.log(error);
  } 
}

export async function deleteCarAction(id: string | undefined) {
  try {  
    await connectToDB();
    await Car.findByIdAndDelete(id);
    revalidateTag("cars");
  } catch (error) {
    console.log(error);
  }
}

