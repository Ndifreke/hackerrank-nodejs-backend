
const models = require("./index");

const eventModel = (sequelize, DataTypes) => {
  const eventSchema = {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      unique: true,
      allowNull: false,
      onDelete: "CASCADE"
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    actor_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    event_id: {

    }
  };

  const Event = sequelize.define("Event", actorSchema, {
    freezeTableName: false,
    hooks: {
      beforeCreate: (event, options) => {
        return article;
      }
    }
  });
  Event.belongsToMany(db.Actor, {
    through: {
      model: "ArticleTags",
      unique: false
    },
    timestamps: false,
    foreignKey: "articleId",
    target: "id",
    onDelete: "RESTRICT",
    onUpdate: "CASCADE"
  });
  return Event;

}
