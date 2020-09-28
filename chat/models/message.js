const { Model, DataTypes } = require("sequelize");
const sequelize = require("../lib/sequelize.js");

class Message extends Model {}

Message.init(
  {
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Message",
  }
);

Message.sync();
module.exports = Message;
