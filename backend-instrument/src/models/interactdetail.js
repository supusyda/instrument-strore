"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class interactDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      interactDetail.belongsTo(models.interact);
    }
  }
  interactDetail.init(
    {
      interactID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "interactDetail",
    }
  );
  return interactDetail;
};
