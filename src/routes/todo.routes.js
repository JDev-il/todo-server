const express = require("express");
const TodoController = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", TodoController.getAllTodos);
router.post("/", TodoController.createTodo);
router.put("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);

module.exports = router;
