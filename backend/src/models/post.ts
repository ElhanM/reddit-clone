"use strict";
import { Model } from "sequelize";

interface IPost {
  postId?: string;
  title: string;
  description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model<IPost> implements IPost {
    postId!: string;
    title!: string;
    description!: string;
    static associate(models: any) {
      Post.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Post.hasMany(models.Comment, {
        foreignKey: {
          name: "postId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // post belongs to one community
      Post.belongsTo(models.Community, {
        foreignKey: {
          name: "communityId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Post.init(
    {
      postId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Title is required",
          },
          len: {
            args: [1, 255],
            msg: "Title must be between 1 and 255 characters",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
          len: {
            args: [1, 255],
            msg: "Description must be between 1 and 255 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Post",
      tableName: "posts",
    },
  );
  return Post;
};
