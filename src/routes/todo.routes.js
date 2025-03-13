const express = require("express");
const TodoController = require("../controllers/todo.controller");

const router = express.Router();

router.get("", TodoController.getAllTodos);
router.post("/todo", TodoController.createTodo);
router.put("/update/:id", TodoController.updateTodo);
router.delete("/delete/:id", TodoController.deleteTodo);

module.exports = router;
