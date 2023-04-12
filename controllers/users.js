const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { User } = require('../models/User');

/*--------------------------------------------------
Desc: Get All Users
Route: GET /api/v1/users
Access: Public
--------------------------------------------------*/
exports.getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  if (!users.length) {
    return next(new ErrorResponse('No users found', 404));
  }

  res.status(200).json({ success: true, data: users });
});

/*--------------------------------------------------
Desc: Get Single Users
Route: GET /api/v1/users/:id
Access: Public
--------------------------------------------------*/
exports.getSingleUserById = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: user });
});

/*--------------------------------------------------
Desc: Create Single Users
Route: POST /api/v1/users
Access: Private
--------------------------------------------------*/
exports.createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  res.status(201).json({
    success: true,
    data: user
  });
});

/*--------------------------------------------------
Desc: Update Single Users
Route: PUT /api/v1/users/:id
Access: Private
--------------------------------------------------*/
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, user: { ...user._doc } });
});

/*--------------------------------------------------
Desc: Delete Single Users
Route: DELETE /api/v1/users/:id
Access: Private
--------------------------------------------------*/
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorResponse(`User not found with id: ${req.params.id}`, 404)
    );
  }

  user.remove();

  res.status(200).json({ success: true, data: {} });
});
