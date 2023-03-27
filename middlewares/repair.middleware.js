const Repair = require('../models/repair.models');

exports.validExistRepair = async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });
  if (!repair) {
    return res.status(404).json({
      status: 'Error',
      message: `Repair with id: ${id} not found`,
    });
  }
  req.repair = repair;
  next();
};
