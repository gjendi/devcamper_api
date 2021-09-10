const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const User = require("../models/User");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });
  //Create toke
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  //validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password"), 400);
  }
  //Check for user
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorResponse("Invalid credentials"), 401);
  }
  //Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials"), 401);
  }
  //Create toke
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    token,
  });
});
