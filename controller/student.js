const { Task } = require("../model/task.js");

async function updateStatus(taskId, newStatus) {
  const result = await Task.findOne({ _id: taskId });
  if (!result) return false;
  result.status = newStatus;
  const doc = await result.save();
  return doc ? doc : false;
}

const viewAllTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const result = await Task.find({ assigned: userId });
    result.forEach((ele) => {
      const currentDate = new Date();
      const dueDate = ele.dueDate;
      if (
        currentDate.getTime() < dueDate.getTime() &&
        ele.status !== "completed"
      )
        updateStatus(ele._id, "overdue");
    });
    const updatedDoc = await Task.find({ assigned: userId });
    res.status(200).json({ taskList: updatedDoc });
  } catch (error) {
    res.status(404).json({ errorMessage: "Something went wrong" });
  }
};

const viewTask = async (req, res) => {
  try {
    const userId = req.body.userId;
    const result = await Task.findOne({ assigned: userId, _id: req.params.id });
    if (!result) res.status(200).json({ messsage: "No task found" });
    res.status(200).json({ taskList: result });
  } catch (error) {
    res.status(404).json({ errorMessage: "Something went wrong" });
  }
};

const changeStatus = async (req, res) => {
  try {
    const result = await updateStatus(req.params.id, "completed");
    if (!result) return res.status(200).json({ messsage: "No task found" });
    res.status(200).json({ taskList: result });
  } catch (error) {
    res.status(500).json({ errorMessage: "Something went wrong" });
  }
};

module.exports = { viewAllTask, viewTask, changeStatus };
