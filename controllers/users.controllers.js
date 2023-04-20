const User = require('../models/user.models');
const catchAsync = require('../utils/catchAsync');

exports.finAllUsers = catchAsync(async (req, res) => {
  const user = await User.findAll({
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'success',
    results: user.length,
    user,
  });
});
exports.finOneUser = catchAsync(async (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    message: 'Userid',
    user,
  });
});
exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  res.json({
    status: 'success',
    message: 'User created',
    user,
  });
});
exports.updateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;
  await user.update({
    name,
    email,
  });
  res.json({
    status: 'success',
    message: 'Changed data',
    user,
  });
});
exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({
    status: false,
  });
  res.json({
    status: 'success',
    message: 'User removed',
    user,
  });
});
