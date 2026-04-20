// src/App.js
import React from "react";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";
import ThemeToggleButton from "./components/ThemeToggleButton";
import Header from "./components/Header";
import { useTheme } from "./context/ThemeContext";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { theme } = useTheme();
  const { tasks, dispatch } = useTasks();

  const background = theme === "light" ? "#ffffff" : "#222222";
  const color = theme === "light" ? "#000000" : "#ffffff";

  return (
    <div style={{ padding: "1rem", fontFamily: "sans-serif", background, color, minHeight: "100vh" }}>
      <Header />
      <ThemeToggleButton />
      <TaskInput
        onAddTask={(task) =>
          dispatch({ type: "ADD_TASK", task: { ...task, done: false } })
        }
      />

      <p>Total tasks: {tasks.length}</p>
      <button onClick={() => dispatch({ type: "CLEAR_COMPLETED" })}>
        Clear completed
      </button>

      <ul style={{ marginTop: "1rem" }}>
        {tasks.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={() => dispatch({ type: "TOGGLE_DONE", id: t.id })}
            onEdit={(newTitle) =>
              dispatch({ type: "EDIT_TASK", id: t.id, newTitle })
            }
          />
        ))}
      </ul>
    </div>
  );
}

export default App;