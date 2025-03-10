require("dotenv").config();
require("./config/database"); // Auto-connects on import
const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/todos", todoRoutes);

module.exports = app;
