const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

const Account = require("../models/account")(sequelize);
const Destination = require("../models/destination")(sequelize);

Account.hasMany(Destination, { foreignKey: "account_id", onDelete: "CASCADE" });
Destination.belongsTo(Account, { foreignKey: "account_id" });

module.exports = sequelize;
module.exports.Account = Account;
module.exports.Destination = Destination;
