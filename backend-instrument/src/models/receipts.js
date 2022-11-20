"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class receipts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      receipts.hasMany(models.receiptsDetail, {
        foreignKey: "receiptID",
        as: "ReceiptDetails",
      });
      // receipts.belongsTo(models.receiptsDetail, {
      //   foreignKey: "id",
      //   targetKey: "receiptID",
      //   as: "IDofReceipt",
      // });
    }
  }
  receipts.init(
    {
      receiptDetailID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
      totalMoney: DataTypes.INTEGER,
      payment: DataTypes.TEXT,
      deliverAddress: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "receipts",
    }
  );
  return receipts;
};
