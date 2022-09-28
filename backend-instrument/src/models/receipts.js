'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class receipts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  receipts.init({
    receiptDetailID: DataTypes.INTEGER,
    userID: DataTypes.INTEGER,
    totalMoney: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'receipts',
  });
  return receipts;
};