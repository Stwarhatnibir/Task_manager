import { useState } from "react";

function TaskForm({ onAdd, loading }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    onAdd({ title: title.trim(), description: description.trim() });
    setTitle("");
    setDescription("");
  }

  return (
    <div className="task-form">
      <p className="task-form-title">New Task</p>

      <div className="form-group">
        <label className="form-label" htmlFor="task-title">
          Title
        </label>
        <input
          id="task-title"
          className="form-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          autoComplete="off"
        />
        {error && <p className="form-error">{error}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="task-description">
          Description{" "}
          <span style={{ fontWeight: 400, color: "var(--color-text-muted)" }}>
            (optional)
          </span>
        </label>
        <input
          id="task-description"
          className="form-input"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add more detail..."
          autoComplete="off"
        />
      </div>

      <div className="form-actions">
        <button
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </div>
    </div>
  );
}

export default TaskForm;
