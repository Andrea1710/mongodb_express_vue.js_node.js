const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const taskSchema = new Schema({
  title: { type: String },
  description: { type: String }
});

module.exports = model("Task", taskSchema);
