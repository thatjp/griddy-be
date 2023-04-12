const ErrorResponse = require('./errorResponse');
const { User } = require('../models/User');

const validateUser = async userId => {
  const user = await User.findById(userId).lean();

  if (!user) {
    throw new ErrorResponse(`user id not valid: ${userId}`, 400);
  }
};

module.exports = { validateUser };
