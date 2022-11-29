"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class typedetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      typedetail.belongsTo(models.allCodes, {
        foreignKey: "typeKeyMap",
        targetKey: "keyMap",
        as: "typeDetail",
      });
    }
  }
  typedetail.init(
    {
      typeKeyMap: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "typedetail",
    }
  );
  return typedetail;
};
