const TodoService = require("../services/todoService");
const { broadcast } = require("../utils/WebSocket");

class TodoController {
  static async getAllTodos(req, res) {
    try {
      const todos = await TodoService.getAllTodos();
      res.json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createTodo(req, res) {
    try {
      const todo = await TodoService.createTodo(req.body);
      broadcast({ type: "CREATE", todo });
      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateTodo(req, res) {
    try {
      const updatedTodo = await TodoService.updateTodo(req.params.id, req.body);
      if (!updatedTodo)
        return res.status(404).json({ message: "Todo not found" });

      broadcast({ type: "UPDATE", todo: updatedTodo });
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteTodo(req, res) {
    try {
      const deletedTodo = await TodoService.deleteTodo(req.params.id);
      if (!deletedTodo)
        return res.status(404).json({ message: "Todo not found" });

      broadcast({ type: "DELETE", id: req.params.id });
      res.json({ message: "Todo deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = TodoController;
