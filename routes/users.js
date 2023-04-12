const express = require("express");
const {validateUser} = require('../validators/userValidator')

const {
  getAllUsers,
  getSingleUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

const router = express.Router();

router
  .route("/")
  .get(getAllUsers)
  .post(validateUser, createUser);

router
  .route("/:id")
  .get(getSingleUserById)
  .put(validateUser, updateUser)
  .delete(deleteUser);

module.exports = router;
