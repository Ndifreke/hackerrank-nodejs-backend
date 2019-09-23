const actorModel = (sequelize, DataTypes) => {
  const actorSchema = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    avatar_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  const Actor = sequelize.define("actors", actorSchema, {
    freezeTableName: true,
    timestamps: true,
    underscored: true
    // hooks: { 
    //   beforeCreate: (actor, options) => {
    //     actor.created_at = Date.now()
    //     return actor;
    //   }
    // }
  });
  return Actor
};
module.exports = actorModel
