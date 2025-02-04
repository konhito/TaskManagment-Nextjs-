import TaskForm from "@/components/TaskForm";

export interface task {
  title: string;
  description: string;
  dueDate?: Date;
  completed: boolean;
}

const initialTasks: task[] = [
  {
    title: "Complete Next.js Project",
    description: "Finish building the task manager app",
    dueDate: new Date("2025-02-10"),
    completed: false,
  },
  {
    title: "Study for React Interview",
    description: "Revise React concepts and practice coding questions",
    dueDate: new Date("2025-02-15"),
    completed: false,
  },
  {
    title: "Buy Groceries",
    description: "Milk, eggs, bread, and vegetables",
    dueDate: new Date(),
    completed: true,
  },
];

export default function HOME() {
  // const [tasks, setTasks] = useState([]);
  // const addTask = (task) => {
  //   setTasks([...tasks, task]);
  // };
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
            Task Manager
          </h1>
          <TaskForm addTask={initialTasks} />
        </div>
      </div>
    </div>
  );
}
