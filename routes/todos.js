const express = require("express")
const { validateTodo } = require("../validators/todoValidator")

const {
  getAllTodos,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo
} = require("../controllers/todos")

const router = express.Router()

router
  .route("/")
  .get(getAllTodos)
  .post(validateTodo, createTodo)

// router
//   .route("/:id")
//   .get(getSingleTodo)
//   .put(validateTodo, updateTodo)
//   .delete(deleteTodo)

module.exports = router;
