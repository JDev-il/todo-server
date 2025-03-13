const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    dueDate: { type: Date },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    editedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    isEditing: { type: Boolean, default: false },
  },
  { timestamps: true }
);

TodoSchema.index({ createdBy: 1 });
TodoSchema.index({ dueDate: 1 });

module.exports = mongoose.model("Todo", TodoSchema);
