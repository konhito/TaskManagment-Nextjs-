import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { title, description, date } = await req.json();

    const newTask = new Task({ title, description, date });
    await newTask.save();

    return NextResponse.json({
      msg: `${title} ${description}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body", details: error.message },
      { status: 400 }
    );
  }
}

//here
export async function GET() {
  await dbConnect();
  try {
    const task = await Task.find();
    return NextResponse.json({
      task: task,
    });
  } catch (error) {
    console.log("error while retiving", error);
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  try {
    const { id, title, description, date } = await req.json(); // Extract data from request body

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true, runValidators: true } // Return updated task & validate input
    );

    if (!updatedTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      msg: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update task", details: error.message },
      { status: 500 }
    );
  }
}
