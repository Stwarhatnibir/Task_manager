const TaskModel = require("../models/taskModel");
const { createError } = require("../utils/errorHandler");

async function getAllTasks(req, res, next) {
  try {
    const tasks = TaskModel.findAll();
    res.json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      throw createError("Title is required and cannot be empty.", 400);
    }

    const task = TaskModel.create({ title, description });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    next(err);
  }
}

async function updateTask(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw createError("Invalid task ID.", 400);
    }

    const existing = TaskModel.findById(id);
    if (!existing) {
      throw createError("Task not found.", 404);
    }

    const allowedFields = ["title", "description", "completed"];
    const updates = {};

    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    if (updates.title !== undefined && updates.title.trim() === "") {
      throw createError("Title cannot be empty.", 400);
    }

    const updated = TaskModel.update(id, updates);
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
}

async function deleteTask(req, res, next) {
  try {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id)) {
      throw createError("Invalid task ID.", 400);
    }

    const removed = TaskModel.remove(id);
    if (!removed) {
      throw createError("Task not found.", 404);
    }

    res.json({ success: true, data: removed });
  } catch (err) {
    next(err);
  }
}

module.exports = { getAllTasks, createTask, updateTask, deleteTask };
