"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class interact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      interact.belongsTo(models.musicalInstrument, {
        foreignKey: "instrumentID",
        targetKey: "id",
        as: "interact",
      });
      // musicalInstrument.hasOne(models.interact, {
      //   foreignKey: "id",
      //   as: "interact",
      // });
    }
  }
  interact.init(
    {
      blogID: DataTypes.INTEGER,
      instrumentID: DataTypes.INTEGER,
      view: DataTypes.INTEGER,
      likes: DataTypes.INTEGER,
      dislikes: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "interact",
    }
  );
  return interact;
};
