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
      // musicalInstrument.belongsTo(models.receiptsDetail);
      // musicalInstrument.belongsTo(models.receiptsDetail, {
      //   foreignKey: "id",
      //   targetKey: "instrumentID",
      //   as:"instrument"
      // });
      musicalInstrument.hasMany(models.receiptsDetail, {
        foreignKey: "id",
        as: "instrument",
      });
      musicalInstrument.hasOne(models.interact, {
        foreignKey: "instrumentID",
        as: "interact",
      });
      // musicalInstrument.hasMany(models.comment, {
      //   foreignKey: "id",
      //   as: "comments",
      // });
      // define association here
    }
  }
  musicalInstrument.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      price: DataTypes.INTEGER,
      inStock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "musicalInstrument",
    }
  );
  return musicalInstrument;
};
