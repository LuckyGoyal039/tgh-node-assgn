const { Task } = require("../model/task.js");
const { User } = require("../model/user.js");

const createTask = async (req, res) => {
  try {
    const user = await User.findById(req.body.adminId);

    if (!user || !user?.isAdmin) {
      return res.status(404).json({ message: "Access denied" });
    }
    const taskData = {
      assigned: req.body.userId,
      description: req.body.description,
      dueDate: req.body.dueDate,
    };
  
    const result = new Task(taskData);
    const doc = await result.save();
    if (!result) res.status(404).json({ errorMessage: "Something went wrong" });
    res.status(200).json({ task: result });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
};

const createStudent = async (req, res) => {
  try {
    const user = await User.findById(req.body.adminId);
    if (user?.isAdmin) {
      return res.status(404).json({ message: "Access denied" });
    }
    const createdUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      department: req.body.department,
    });
    if (!createdUser)
      res.status(404).json({ errorMessage: "Something went wrong" });
    res.status(200).json({ message: "User created successsfully" });
  } catch (error) {
    res.status(404).json({ errorMessage: error });
  }
};

module.exports = { createTask, createStudent };
