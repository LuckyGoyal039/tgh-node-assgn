const express = require("express");
const router = express.Router();
const {
  viewAllTask,
  viewTask,
  changeStatus,
} = require("../controller/student");
const { userLogin } = require("../controller/common");

router.post("/login", userLogin);
router.post("/viewTask", viewAllTask);
router.post("/viewTask/:id", viewTask);
router.post("/changeStatus/:id", changeStatus);

module.exports = router;
