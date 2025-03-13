const Todo = require("../models/todo.model");
const createTodoDTO = require("../models/dto/todo.dto");

class TodoService {
  static async getAllTodos() {
    return await Todo.find();
  }

  static async getTodoById(id) {
    return await Todo.findById(id);
  }

  static async createTodo(data) {
    const { error, value } = createTodoDTO.validate(data);
    if (error) throw new Error(error.details[0].message);

    const newTodo = new Todo({
      ...value,
      completed: false,
      createdBy: data.createdBy,
    });

    return await newTodo.save();
  }

  static async updateTodo(id, data) {
    const { error, value } = createTodoDTO.validate(data);
    if (error) throw new Error(error.details[0].message);

    return await Todo.findByIdAndUpdate(id, value, {
      new: true,
      runValidators: true,
    });
  }

  static async deleteTodo(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = TodoService;
