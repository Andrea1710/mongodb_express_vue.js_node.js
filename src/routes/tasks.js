const { Router } = require("express");
const router = Router();

const Task = require("../models/Task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  res.json(task);
});

router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json({
    status: "Task saved successfully"
  });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndUpdate(id, req.body);
  res.json({
    status: "Task updated successfully"
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndRemove(id);
  res.json({
    status: "Task Deleted successfully"
  });
});

module.exports = router;
