import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Task from "@/models/Task";
export default function Tasks() {
  return (
    <>
      <TaskForm />
      <TaskList />
    </>
  );
}
