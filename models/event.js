
const models = require("./index");

const eventModel = (sequelize, DataTypes) => {
  const eventSchema = {

    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      allowNull: false,
      onDelete: "CASCADE"
    },

    type: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  const event = sequelize.define("events", eventSchema, {
    freezeTableName: true,
    timestamps: false,
    hooks: {
      beforeCreate: (event, options) => {
      }
    }
  });

  event.associate = (db) => {
    event.belongsTo(db.actors, {
      foreignKey: "actor_id",
      target: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });

    event.belongsTo(db.repositories, {
      foreignKey: "repository_id",
      target: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    });
  }
  return event;
}

module.exports = eventModel 
