import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { ThemeProvider } from "@/components/theme-context";
export default function Tasks() {
  return (
    <>
      <ThemeProvider attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        <TaskForm />
        <TaskList />
      </ThemeProvider>
    </>
  );
}
