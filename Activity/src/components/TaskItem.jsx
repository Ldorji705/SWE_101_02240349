// src/components/TaskItem.jsx
import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';

function TaskItem({ task, onToggle, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  const handleConfirm = () => {
    if (!draft.trim()) return;   // don't allow empty title
    onEdit(draft.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(task.title);        // reset to original
    setIsEditing(false);
  };

  return (
    <li style={{ marginBottom: "0.5rem" }}>
      {isEditing ? (
        // ── Edit mode ──────────────────────────────
        <>
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleConfirm();
              if (e.key === "Escape") handleCancel();
            }}
            autoFocus
          />
          <button onClick={handleConfirm} style={{ marginLeft: "0.5rem" }}>
            <FontAwesomeIcon icon={faCheck} />
          </button>
          <button onClick={handleCancel} style={{ marginLeft: "0.25rem" }}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </>
      ) : (
        // ── View mode ──────────────────────────────
        <label>
          <input
            type="checkbox"
            checked={task.done}
            onChange={onToggle}
          />
          <span style={{
            textDecoration: task.done ? "line-through" : "none",
            marginLeft: "0.5rem",
          }}>
            {task.title} ({task.priority})
          </span>
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginLeft: "0.75rem", fontSize: "0.8rem" }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </label>
      )}
    </li>
  );
}

export default TaskItem;