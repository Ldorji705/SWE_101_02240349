// src/components/TaskInput.jsx
import React, { useState } from "react";

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("normal");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;           // don't add empty tasks
    onAddTask({ id: Date.now(), title: title.trim(), priority });
    setTitle("");                        // clear the form
    setPriority("normal");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        style={{ marginLeft: "0.5rem" }}
      >
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <button type="submit" style={{ marginLeft: "0.5rem" }}>Add</button>
      <button type="button" onClick={() => setTitle("")} style={{ marginLeft: "0.5rem" }}>
        Clear
      </button>
      <div style={{ marginTop: "0.5rem", fontSize: "0.9rem" }}>
        Preview: "{title || "(empty)"}" (priority: {priority})
      </div>
    </form>
  );
}

export default TaskInput;