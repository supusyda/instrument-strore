const dbConfig = require("../config/dbConfig");
const database = dbConfig.DB;
const username = dbConfig.USER;
const password = dbConfig.PASSWORD;
const host = dbConfig.HOST;
const dialect = dbConfig.dialect;

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: dialect,
});


module.exports=sequelize;
