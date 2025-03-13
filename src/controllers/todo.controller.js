const TodoService = require("../services/todo.service");
const WebSocketManager = require("../utils/WebSocket");

class TodoController {
  static async getAllTodos(req, res) {
    try {
      const todos = await TodoService.getAllTodos();
      WebSocketManager.broadcast({ type: "READ", todos });
      res.status(200).json(todos);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async createTodo(req, res) {
    try {
      const todo = await TodoService.createTodo(req.body);
      const todos = await TodoService.getAllTodos();

      WebSocketManager.broadcast({ type: "CREATE", todo });
      WebSocketManager.broadcast({ type: "READ", todos });

      res.status(201).json(todo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async updateTodo(req, res) {
    console.log(req);

    try {
      const updatedTodo = await TodoService.updateTodo(req.params.id, req.body);
      if (!updatedTodo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      WebSocketManager.broadcast({ type: "UPDATE", todo: updatedTodo });
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteTodo(req, res) {
    try {
      const deletedTodo = await TodoService.deleteTodo(req.params.id);
      if (!deletedTodo) {
        console.log("error deleting....");
        return res.status(404).json({ message: "Todo not found" });
      }
      WebSocketManager.broadcast({ type: "DELETE", id: req.params.id });
      res.json({ message: "Todo Successfully Deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = TodoController;
