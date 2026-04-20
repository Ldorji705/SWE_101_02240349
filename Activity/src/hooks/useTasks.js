// src/hooks/useTasks.js
import { useReducer, useEffect } from "react";
import { taskReducer, initialTaskState } from "../reducers/taskReducer";

export function useTasks() {
  const [state, dispatch] = useReducer(taskReducer, initialTaskState);

  // Load once on mount
  useEffect(() => {
    const stored = localStorage.getItem("tasks");
    if (stored) {
      dispatch({ type: "LOAD_FROM_STORAGE", tasks: JSON.parse(stored) });
    }
  }, []);

  // Sync on every change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state.tasks));
  }, [state.tasks]);

  useEffect(() => {
    document.title = `Tasks: ${state.tasks.length}`;
  }, [state.tasks.length]);

  return { tasks: state.tasks, dispatch };
}