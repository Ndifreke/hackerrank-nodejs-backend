const repositoryModel = (sequelize, DataTypes) => {
  const repositorySchema = {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      allowNull: false,
      onDelete: "CASCADE"
    },

    name: {
      type: DataTypes.STRING,
      name: DataTypes.STRING,
      allowNull: false
    },

    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // actor_id: {
    //   type: DataTypes.BIGINT,
    //   references: {
    //     model: 'actors',
    //     key: "id",
    //   },
    //   allowNull: false,
    // }
  };

  const repo = sequelize.define("repositories", repositorySchema, {
    freezeTableName: true,
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (actor, options) => {
        return actor;
      }
    }
  });

  repo.associate = (db) => {
    repo.belongsTo(db.actors, {
      foreignKey: "actor_id",
      target: "id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE"
    })
  }

  return repo
};
module.exports = repositoryModel
