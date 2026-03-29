const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  manager_id: DataTypes.INTEGER,
  company_id: DataTypes.INTEGER
});

module.exports = User;