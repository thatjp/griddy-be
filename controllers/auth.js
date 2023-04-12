const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const { User } = require('../models/User');

/*--------------------------------------------------
Desc: Register User
Route: Get /api/v1/auth/register
acess: Public
--------------------------------------------------*/

exports.register = asyncHandler(async (req, res, next) => {
  const {
    email,
    password,
    username,
    phone,
    role,
    last_name,
    first_name,
  } = req.body;

  const user = await User.create({
    email,
    password,
    username,
    phone,
    last_name,
    first_name,
    role,
  });

  sendTokenResponse(user, 200, res);
});

/*--------------------------------------------------
Desc: login User
Route: POST /api/v1/auth/login
acess: Public
--------------------------------------------------*/

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

/*--------------------------------------------------
Desc: login User
Route: POST /api/v1/auth/me
acess: Private
--------------------------------------------------*/

exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
});
