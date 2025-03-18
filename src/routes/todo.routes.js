const express = require("express");
const TodoController = require("../controllers/todo.controller");

const router = express.Router();

router.get("", TodoController.getAllTodos);
router.post("/add", TodoController.createTodo);
router.put("/update/:id", TodoController.updateTodo);
router.patch("/update/many", TodoController.updateManyTodos);
router.post("/delete/:id", TodoController.deleteTodo);

module.exports = router;
