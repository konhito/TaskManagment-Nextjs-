import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Task from "@/models/Task";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { title, description, date } = await req.json();

    if (!title) {
      return NextResponse.json({
        msg: "title is required",
      });
    }

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

//here getting all the response
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
    const { id, title, description, date } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, date },
      { new: true, runValidators: true }
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

export async function DELETE(req: Request) {
  await dbConnect();
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Task ID is required" },
        { status: 400 }
      );
    }

    const deleteTask = await Task.findByIdAndDelete(id);

    if (!deleteTask) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({
      msg: "Task updated successfully",
      task: deleteTask,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete task", details: error.message },
      { status: 500 }
    );
  }
}
