const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("database", "", "", {
  dialect: "sqlite",
  storage: ".database/database.sqlite",
});

sequelize
  .authenticate()
  .then((res) => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = sequelize;
