import { useState, useEffect } from "react";
import { taskService } from "./services/api";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const STORAGE_KEY = "task-manager-filter";

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(
    () => localStorage.getItem(STORAGE_KEY) || "all",
  );
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoadingFetch(true);
    setError("");
    try {
      const data = await taskService.getAll();
      setTasks(data);
    } catch {
      setError("Failed to load tasks. Is the server running?");
    } finally {
      setLoadingFetch(false);
    }
  }

  async function handleAdd(payload) {
    setLoadingAdd(true);
    setError("");
    try {
      const task = await taskService.create(payload);
      setTasks((prev) => [task, ...prev]);
    } catch (err) {
      setError(
        err.response?.data?.error || "Failed to add task. Please try again.",
      );
    } finally {
      setLoadingAdd(false);
    }
  }

  async function handleToggle(task) {
    const optimisticTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, completed: !t.completed } : t,
    );
    setTasks(optimisticTasks);

    try {
      const updated = await taskService.update(task.id, {
        completed: !task.completed,
      });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch {
      setTasks(tasks); // rollback
      setError("Failed to update task.");
    }
  }

  async function handleEdit(id, title) {
    const original = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, title } : t)));

    try {
      const updated = await taskService.update(id, { title });
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
    } catch {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, title: original.title } : t)),
      );
      setError("Failed to update task title.");
    }
  }

  async function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await taskService.remove(id);
    } catch {
      fetchTasks(); // refetch on failure
      setError("Failed to delete task.");
    }
  }

  function handleFilterChange(newFilter) {
    setFilter(newFilter);
    localStorage.setItem(STORAGE_KEY, newFilter);
  }

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-layout">
      <Header totalCount={tasks.length} completedCount={completedCount} />

      <main className="app-content">
        {error && <div className="status-error">{error}</div>}

        <TaskForm onAdd={handleAdd} loading={loadingAdd} />

        {loadingFetch ? (
          <div className="status-loading">Loading tasks...</div>
        ) : (
          <TaskList
            tasks={tasks}
            filter={filter}
            onFilterChange={handleFilterChange}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </main>
    </div>
  );
}

export default App;
