const Todo = require("../models/todo.model");
const createTodoDTO = require("../models/dto/todo.dto");
const Joi = require("joi");

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

  static async updateManyTodos(todos) {
    const schema = Joi.object({
      todos: Joi.array()
        .items(
          Joi.object({
            _id: Joi.string().required(),
            completed: Joi.boolean().required(),
          })
        )
        .required(),
    });

    const { error, value } = schema.validate({ todos });
    if (error) throw new Error(error.details[0].message);
    const bulkOps = value.todos.map((todo) => ({
      updateOne: {
        filter: { _id: todo._id },
        update: { $set: { completed: todo.completed } },
      },
    }));
    const result = await Todo.bulkWrite(bulkOps);
    if (result.modifiedCount > 0) {
      return await Todo.find();
    } else {
      throw new Error("No todos were updated");
    }
  }

  static async deleteTodo(id) {
    return await Todo.findByIdAndDelete(id);
  }
}

module.exports = TodoService;
