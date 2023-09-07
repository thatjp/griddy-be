const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { Todo } = require('../models/Todo');

/*--------------------------------------------------
Desc: Get All Todos
Route: GET /api/v1/todos
Access: Public
--------------------------------------------------*/
exports.getAllTodos = asyncHandler(async (req, res, next) => {
  const todos = await Todo.find();

  if (!todos.length) {
    return next(new ErrorResponse('No todos found', 404));
  }

  res.status(200).json({ success: true, data: todos });
});

/*--------------------------------------------------
Desc: Create New Todo
Route: POST /api/v1/todo
Access: Private
--------------------------------------------------*/
exports.createTodo = asyncHandler(async (req, res, next) => {
  const todo = await Todo.create(req.body);

  res.status(201).json({
    success: true,
    data: todo
  });
});
