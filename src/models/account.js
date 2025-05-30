const { DataTypes } = require("sequelize");
module.exports = (sequelize) =>
  sequelize.define("Account", {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    website: { type: DataTypes.STRING },
    secret_token: { type: DataTypes.STRING, unique: true, allowNull: false },
  });
