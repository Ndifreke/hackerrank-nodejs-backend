
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
    },
    repository_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'repositories',
        key: "id",
      },
      allowNull: false,
    },
    created_at:{
      type: DataTypes.DATE,
      allowNull: false
    }
  };

  const event = sequelize.define("events", eventSchema, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
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
      onUpdate: "CASCADE",
      as: "actor"
    });

    event.belongsTo(db.repositories, {
      foreignKey: "repository_id",
      as:"repo",
      target: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  }
  return event;
}

module.exports = eventModel 
