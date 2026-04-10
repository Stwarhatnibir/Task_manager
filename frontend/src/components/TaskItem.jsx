import { useState, useRef, useEffect } from "react";

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);
  const [editError, setEditError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  function handleEditStart() {
    setEditValue(task.title);
    setEditError("");
    setIsEditing(true);
  }

  function handleEditCancel() {
    setIsEditing(false);
    setEditError("");
  }

  function handleEditSave() {
    const trimmed = editValue.trim();
    if (!trimmed) {
      setEditError("Title cannot be empty.");
      return;
    }
    if (trimmed === task.title) {
      setIsEditing(false);
      return;
    }
    onEdit(task.id, trimmed);
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleEditSave();
    if (e.key === "Escape") handleEditCancel();
  }

  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="task-checkbox-wrapper">
        <input
          type="checkbox"
          className="task-checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
          aria-label={`Mark "${task.title}" as ${task.completed ? "pending" : "complete"}`}
        />
      </div>

      <div className="task-body">
        {isEditing ? (
          <div className="task-edit-wrapper">
            <input
              ref={inputRef}
              className="form-input task-edit-input"
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Edit task title"
            />
            {editError && <p className="form-error">{editError}</p>}
            <div className="task-edit-actions">
              <button
                className="btn btn-primary btn-sm"
                onClick={handleEditSave}
              >
                Save
              </button>
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleEditCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="task-title">{task.title}</p>
            {task.description && (
              <p className="task-description">{task.description}</p>
            )}
            <p className="task-meta">Added {formatDate(task.createdAt)}</p>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="task-actions">
          <button
            className="btn btn-icon"
            onClick={handleEditStart}
            aria-label={`Edit "${task.title}"`}
            title="Edit title"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
          <button
            className="btn btn-danger"
            onClick={() => onDelete(task.id)}
            aria-label={`Delete "${task.title}"`}
            title="Delete task"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
