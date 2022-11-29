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
      // musicalInstrument.belongsTo(models.allCodes, {
      //   foreignKey: "type",
      //   targetKey: "keyMap",
      //   as: "typeOfInstrument",
      // });
      musicalInstrument.belongsTo(models.allCodes, {
        foreignKey: "type",
        targetKey: "keyMap",
        as: "typeOfInstrument",
      });
      musicalInstrument.hasMany(models.receiptsDetail, {
        foreignKey: "instrumentID",
        as: "receiptsDetail",
      });
      musicalInstrument.hasOne(models.interact, {
        foreignKey: "instrumentID",
        as: "interact",
      });
      musicalInstrument.hasOne(models.markdown, {
        foreignKey: "instrumentID",
        as: "musicalInstrumentDetail",
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
      isActive: DataTypes.BOOLEAN,
      image: DataTypes.BLOB("long"),
    },
    {
      sequelize,
      modelName: "musicalInstrument",
    }
  );
  return musicalInstrument;
};
