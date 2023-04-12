const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const asyncHandler = require('./async');
const ErrorResponse = require('../utils/errorResponse');
const User = mongoose.model('User');

exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.header.authorization &&
    req.headers.authorization.startswith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id).lean();

    next();
  } catch (err) {
    console.log('err', err);
  }
});

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.user_type)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route.`,
          403
        )
      );
    }
    next();
  };
};
