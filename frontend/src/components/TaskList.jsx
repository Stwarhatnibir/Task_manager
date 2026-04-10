import TaskItem from "./TaskItem";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "completed", label: "Completed" },
];

function TaskList({
  tasks,
  filter,
  onFilterChange,
  onToggle,
  onDelete,
  onEdit,
}) {
  const filtered = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <span className="task-list-label">Tasks</span>
        <span className="task-count">{filtered.length}</span>
      </div>

      <div className="filter-tabs">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`filter-tab ${filter === f.key ? "active" : ""}`}
            onClick={() => onFilterChange(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-title">No tasks here</p>
          <p className="empty-state-subtitle">
            {filter === "all"
              ? "Add a task above to get started."
              : `No ${filter} tasks at the moment.`}
          </p>
        </div>
      ) : (
        filtered.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
