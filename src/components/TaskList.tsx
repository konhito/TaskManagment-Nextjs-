"use client";

import GetTask from "@/components/Taskfetch";
import Backend_url from "@/context/Backendurl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({
    id: "",
    title: "",
    description: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const data = await GetTask();
      if (data?.task) {
        setTasks(data.task);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }

  async function handleUpdate() {
    try {
      await axios.put(`${Backend_url}/api/tasks`, {
        id: editedTask.id,
        title: editedTask.title,
        description: editedTask.description,
      });
      setIsEditing(false);
      fetchData();
    } catch (error) {
      console.log("Error while updating the tasks", error);
    }
  }

  async function deleteTask(id) {
    try {
      await axios.delete(`${Backend_url}/api/tasks`, { data: { id } });
      fetchData();
    } catch (error) {
      console.log("Unable to delete");
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task Managment</h1>
      <motion.ul
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <motion.li
              key={task._id}
              className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-xl flex justify-between items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {task.description}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600"
                  onClick={() => {
                    setEditedTask({
                      id: task._id,
                      title: task.title,
                      description: task.description,
                    });
                    setIsEditing(true);
                  }}
                >
                  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px  shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
                  <span className="relative z-20">Edit</span>
                </button>

                <button
                  className="px-6 py-2 rounded-full bg-red-500 text-white "
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </motion.li>
          ))
        ) : (
          <motion.p
            className="text-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No tasks available
          </motion.p>
        )}
      </motion.ul>

      <AnimatePresence>
        {isEditing && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
              <input
                type="text"
                value={editedTask.title}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, title: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded-lg"
                placeholder="Title"
              />
              <textarea
                value={editedTask.description}
                onChange={(e) =>
                  setEditedTask({ ...editedTask, description: e.target.value })
                }
                className="w-full p-2 border rounded-lg"
                placeholder="Description"
              />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
