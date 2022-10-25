"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class receiptsDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // receiptsDetail.hasMany(models.receipts, {
      //   foreignKey: "id",
      //   as: "IDofReceipt",
      // });
      receiptsDetail.belongsTo(models.receipts);
      // receiptsDetail.hasOne(models.musicalInstrument, {
      //   foreignKey: "id",
      //   as: "instrument",
      // });
      receiptsDetail.belongsTo(models.musicalInstrument, {
        foreignKey: "instrumentID",
        targetKey: "id",
        as:"instrument"
      });
    }
  }
  receiptsDetail.init(
    {
      instrumentID: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      money: DataTypes.INTEGER,
      receiptID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "receiptsDetail",
    }
  );
  return receiptsDetail;
};
