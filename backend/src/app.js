const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const { errorHandler } = require("./utils/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found." });
});

app.use(errorHandler);

module.exports = app;
