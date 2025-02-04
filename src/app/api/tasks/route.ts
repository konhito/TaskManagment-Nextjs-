import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { title, description, date } = await req.json();
    return NextResponse.json({
      msg: `${title} ${description}`,
    });
    const newTask = new Task({ title, description, date });
    await newTask.save();
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body", error },
      { status: 400 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    msg: "working",
  });
}
