const Users = require('../models/users.models');

exports.finAllUsers = async (req, res) => {
  const user = await Users.findAll({
    where: {
      status: 'available',
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'All users',
    results: user.length,
    user,
  });
};
exports.finOneUser = (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    message: 'Userid',
    user,
  });
};
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await Users.create({
    name,
    email,
    password,
  });
  res.json({
    status: 'success',
    message: 'User created',
    user,
  });
};
exports.updateUser = async (req, res) => {
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
};
exports.deleteUser = async (req, res) => {
  const { user } = req;
  await user.update({
    status: false,
  });
  res.json({
    status: 'success',
    message: 'User removed',
    user,
  });
};
