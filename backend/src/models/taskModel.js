let tasks = [];
let nextId = 1;

const TaskModel = {
  findAll() {
    return tasks;
  },

  findById(id) {
    return tasks.find((task) => task.id === id) || null;
  },

  create({ title, description = "" }) {
    const task = {
      id: nextId++,
      title: title.trim(),
      description: description.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };
    tasks.push(task);
    return task;
  },

  update(id, fields) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;

    tasks[index] = { ...tasks[index], ...fields };
    return tasks[index];
  },

  remove(id) {
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) return null;

    const [removed] = tasks.splice(index, 1);
    return removed;
  },
};

module.exports = TaskModel;
