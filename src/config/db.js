const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db.sqlite",
});

const Account = require("../models/account")(sequelize);
const Destination = require("../models/destination")(sequelize);

Account.hasMany(Destination, { onDelete: "CASCADE" });
Destination.belongsTo(Account);

module.exports = sequelize;
module.exports.Account = Account;
module.exports.Destination = Destination;
