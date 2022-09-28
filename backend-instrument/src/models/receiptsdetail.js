'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class receiptsDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  receiptsDetail.init({
    instrumentID: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    money: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'receiptsDetail',
  });
  return receiptsDetail;
};