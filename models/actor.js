
const models = require("./index");

const actorModel = (sequelize, DataTypes) => {
  const actorSchema = {
    id: {
      type: DataTypes.TEXT,
      primaryKey: true,
      unique: true,
      allowNull: false,
      onDelete: "CASCADE"
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    avater_url: {
      type: DataTypes.STRING,
      allowNull: false
    }
  };

  const Actor = sequelize.define("Actor", actorSchema, {
    freezeTableName: true,
    hooks: {
      beforeCreate: (article, options) => {
        article.slug = generateUniqueSlug(article.title);
        article.readTime = calculateReadTime(article.content);
        return article;
      }
    }
  });

  Article.associate = db => {
    Article.belongsTo(db.Users, {
      foreignKey: "authorId",
      target: "id",
      as: "author",
      onDelete: "CASCADE"
    });

    Article.hasMany(db.Favorites, {
      foreignKey: "articleId",
      target: "id",
      as: "favourite",
      onDelete: "CASCADE"
    });

    Article.hasMany(db.Comments, {
      foreignKey: "articleId",
      as: "articleComments",
      target: "id",
      onDelete: "CASCADE"
    });

    Article.hasMany(db.Reactions, {
      scopes: {
        articleReactions: {
          include: [
            {
              model: db.Reactions,
              where: { sourceType: ARTICLE_REACTION }
            }
          ]
        }
      },
      foreignKey: "articleId",
      target: "id",
      as: "articleReactions",
      onDelete: "CASCADE"
    });

    Article.belongsToMany(db.Tags, {
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
  };
  Article.fetchArticles = function(options) {
    const { pageLimit, offset } = pagination(options.query);
    return this.findAll({
      order: [["createdAt", "DESC"]],
      // where: options.whereConditions,
      /* TODO: Add join for ArticleTags */
      include: [
        {
          model: models.Users,
          as: "author",
          attributes: ["firstName", "lastName", "imageURL"]
        },
        {
          model: models.Reactions,
          as: "articleReactions",
          required: false
        },
        {
          model: models.Comments,
          as: "articleComments",
          required: false
        }
      ],
      limit: pageLimit,
      offset
    });
  };

  return Article;
};
export default getArticleModel;
