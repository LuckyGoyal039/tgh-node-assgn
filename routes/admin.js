const { createTask, createStudent } = require("../controller/admin");
const { userLogin } = require("../controller/common");
const express = require("express");
const router = express.Router();

router.post("/login", userLogin);
router.post("/createStudent", createStudent);
router.post("/createTask", createTask);

module.exports = router;
