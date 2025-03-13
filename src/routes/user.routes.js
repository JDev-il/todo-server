const express = require("express");
const TodoController = require("../controllers/todo.controller");

const router = express.Router();

router.get("", TodoController.getAllTodos);
router.post("/user", TodoController.createTodo);
router.put("/user/:id", TodoController.updateTodo);

module.exports = router;
