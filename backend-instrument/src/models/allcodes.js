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
      // allCodes.belongsTo(models.musicalInstrument, {
      //   foreignKey: "keyMap",
      //   targetKey: "type",
      //   as: "sameTypeInstrument",
      // });
      allCodes.hasMany(
        models.musicalInstrument,
        {
          foreignKey: "type",
          as: "sameTypeItem",
        }
        //   , {
        //   foreignKey: {
        //     name: "type",
        //     allowNull: false,
        //   },
        //   as: "sameIntrumentType",
        // }
      );
      // allCodes.belongsTo(models.musicalInstrument, {
      //   foreignKey: "keyMap",
      //   targetKey: "type",

      //   // as: "sameIntrumentType2",
      // });
      allCodes.hasMany(models.typedetail, {
        foreignKey: "typeKeyMap",
        as: "typeDetail",
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
