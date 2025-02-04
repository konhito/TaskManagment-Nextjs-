"use client";
import { useState } from "react";

export default function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return; // removes leading and trailing whitespace.
    addTask({
      title,
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      completed: false,
    });
    setTitle("");
    setDescription("");
    setDueDate("");
  };

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-gray-600 p-2 mb-4 border rounded"
        required
      />
      <textarea
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full text-gray-600 p-2 mb-4 border rounded"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full text-gray-600 p-2 mb-4 border rounded"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        onClick={handleSubmit}
      >
        Add Task
      </button>
    </div>
  );
}
