const User = require('./../models/user.models');
const Repair = require('./../models/repair.models');

const initModel = () => {
  User.hasMany(Repair, { foreignKey: 'userId' });
  Repair.belongsTo(User, { foreignKey: 'userId' });
};

module.exports = initModel;
