const express = require("express");
const {
  getUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/users");
const Course = require("../models/User");

const router = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedResults");

//protect
const { protect, authorize } = require("../middleware/auth");
const User = require("../models/User");

router.use(protect);
router.use(authorize("admin"));

router.route("/").get(advancedResults(User), getUsers).post(createUser);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
