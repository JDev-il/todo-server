require("dotenv").config();
require("./config/database"); // Auto-connects on import

const express = require("express");
const cors = require("cors");
const todoRoutes = require("./routes/todo.routes");
const userRoutes = require("./routes/user.routes");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/users", userRoutes);

module.exports = app;
