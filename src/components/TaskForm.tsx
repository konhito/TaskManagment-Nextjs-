"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Backend_url from "@/context/Backendurl";
import { Plus, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TaskForm() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  async function handleSubmit(event: { preventDefault: () => void }) {
    event.preventDefault();
    try {
      const response = await axios.post(`${Backend_url}/api/tasks`, {
        title,
        description,
        date,
      });
      console.log("Response:", response.data);
      setIsOpen(false);
      setTitle("");
      setDescription("");
      setDate("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }
  const handleReload = () => {
    router.refresh();
  };

  return (
    <div className="fixed bottom-10 right-20 z-50">
      {!isOpen && (
        <motion.button
          initial={{ scale: 1.2 }}
          animate={{ scale: 1.3 }}
          whileHover={{ scale: 1.5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="p-4 bg-blue-500 text-white rounded-full shadow-lg flex items-center justify-center"
        >
          <Plus size={24} />
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white p-6 rounded-2xl shadow-2xl w-80"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
          <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              placeholder="Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded p-2 w-full"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
              onClick={handleReload}
            >
              Submit
            </button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
