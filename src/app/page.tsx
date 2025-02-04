"use client";
import TaskForm from "@/components/TaskForm";
import GetTask from "@/components/Taskfetch";
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

  return (
    <div>
      <TaskForm />
      <div>
        <h1>Task List</h1>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task._id}>
                <strong>{task.title}</strong>: {task.description} -{" "}
                {task.completed ? "Completed" : "Not Completed"}
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
