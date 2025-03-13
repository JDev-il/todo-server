const Joi = require("joi");

module.exports = Joi.object({
  _id: Joi.string().optional(),
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().max(500).optional(),
  dueDate: Joi.date().iso().required(),
  completed: Joi.boolean().optional(),
  priority: Joi.string().valid("Low", "Medium", "High").required(),
});
