"use client";
import TaskForm from "@/components/TaskForm";
import GetTask from "@/components/Taskfetch";
import Backend_url from "@/context/Backendurl";
import axios from "axios";
import { useEffect, useState } from "react";

interface task {
  id: string;
  title: string;
  description: string;
  date: string;
  completed?: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await GetTask();
      if (data?.task) {
        setTasks(data.task);
      }
    }
    fetchData();
  }, []);

  async function handelUpdate(id, title, description) {
    try {
      const response = await axios.put(`${Backend_url}/api/tasks`, {
        id,
        title,
        description,
      });
      console.log(response.data);
    } catch (error) {
      console.log("error while updating the tasks", error);
    }
  }

  async function deleteTask() {
    try {
      const response = await axios.delete(`${Backend_url}/api/tasks`, {
        id,
      });
    } catch (error) {
      console.log("unable to delete");
    }
  }

  return (
    <div>
      <TaskForm />
      <div>
        <h1>Task List</h1>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <strong>{task.title}</strong>: {task.description} - :
                {task.completed ? "Completed" : "Not Completed"}
                <button
                  className="border-2 px-2 py-1"
                  onClick={() =>
                    handelUpdate(task._id, task.title, task.description)
                  }
                >
                  Edit
                </button>
                <button
                  className="border-2 px-2 py-1"
                  onClick={() => deleteTask(task._id)}
                >
                  delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available</p>
        )}
      </div>
    </div>
  );
}
