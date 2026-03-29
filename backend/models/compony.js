const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Company = sequelize.define("Company", {
  name: DataTypes.STRING,
  country: DataTypes.STRING,
  currency: DataTypes.STRING
});

module.exports = Company;