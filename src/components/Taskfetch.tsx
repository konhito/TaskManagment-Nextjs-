import axios from "axios";
import Backend_url from "@/context/Backendurl";

export default async function GetTask() {
  try {
    const response = await axios.get(`${Backend_url}/api/tasks`);
    const task = response.data;
    localStorage.setItem("task", task);
    console.log(task);
    return task;
  } catch (error) {
    console.error("Error while fetching the data:", error);
    return null;
  }
}
