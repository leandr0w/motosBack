const Repair = require('../models/repair.models');
const catchAsync = require('../utils/catchAsync');
const User = require('./../models/user.models');

exports.findAllRepair = catchAsync(async (req, res) => {
  const repair = await Repair.findAll({
    where: {
      status: 'pending',
    },
    attributes: {
      exclude: ['userId'],
    },
    include: [
      {
        model: User,
        attributes: ['id', 'name'],
      },
    ],
  });
  res.status(200).json({
    status: 'success',
    message: 'Repairs pending',
    results: repair.length,
    repair,
  });
});
exports.createRepair = catchAsync(async (req, res) => {
  const { date, userId } = req.body;
  const { id } = req.params;
  const repair = await Repair.create({
    date,
    userId,
  });
  res.json({
    status: 'success',
    message: 'The repair has been acorded',
    repair,
  });
});
exports.findOneRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  res.status(200).json({
    status: 'success',
    message: 'hello from the getbyid',
    repair,
  });
});
exports.updateRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({
    status: 'completed',
  });
  res.status(200).json({
    status: 'success',
    message: 'The repair has been completed',
    repair,
  });
});
exports.deleteRepair = catchAsync(async (req, res) => {
  const { repair } = req;
  await repair.update({
    status: 'cancelled',
  });
  res.status(200).json({
    status: 'success',
    message: 'The repair has been cancelled',
    repair,
  });
});
