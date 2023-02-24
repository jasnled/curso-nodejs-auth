const { USER_TABLE, UserSchema } = require('./../models/user.model');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn(USER_TABLE, 'recovery_token', UserSchema.recoveryToken);
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn(USER_TABLE, 'recovery-token');
  }
};
