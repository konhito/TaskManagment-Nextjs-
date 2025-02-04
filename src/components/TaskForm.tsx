"use client";
import { useState } from "react";
import axios from "axios";
import Backend_url from "@/context/Backendurl";

export default function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    try {
      const response = await axios.post(`${Backend_url}/api/tasks`, {
        title,
        description,
        date,
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
