"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class musicalInstrument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      musicalInstrument.belongsTo(models.allCodes, {
        foreignKey: "type",
        targetKey: "keyMap",
        as: "typeOfInstrument",
      });
      // define association here
    }
  }
  musicalInstrument.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "musicalInstrument",
    }
  );
  return musicalInstrument;
};
