"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class allCodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // allcode.hasMany(models.User, {
      //   foreignKey: "positionID",
      //   as: "positionData",
      // });
      allCodes.hasMany(models.musicalInstrument, {
        foreignKey: "type",
        as: "typeOfInstrument",
      });
    }
  }
  allCodes.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEN: DataTypes.STRING,
      valueVN: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "allCodes",
    }
  );
  return allCodes;
};
