const { DataTypes } = require("sequelize");
module.exports = (sequelize) =>
  sequelize.define("Account", {
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    website: { type: DataTypes.STRING },
    secretToken: { type: DataTypes.STRING, unique: true, allowNull: false },
  });
