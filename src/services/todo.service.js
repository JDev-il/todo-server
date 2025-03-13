const Todo = require("../models/todo.model");

class TodoService {
  static async getAllTodos() {
    return await Todo.find();
  }

  static async getTodoById(id) {
    return await Todo.findById(id);
  }

  static async createTodo(data) {
    const todo = new Todo(data);
    return await todo.save();
  }

  static async updateTodo(id, data) {
    return await Todo.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteTodo(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = TodoService;
