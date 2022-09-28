'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  markdown.init({
    contentMarkDown: DataTypes.STRING,
    description: DataTypes.STRING,
    contentHTML: DataTypes.STRING,
    userID: DataTypes.INTEGER,
    dateCreate: DataTypes.DATE,
    instrusmentID: DataTypes.INTEGER,
    blogID: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'markdown',
  });
  return markdown;
};