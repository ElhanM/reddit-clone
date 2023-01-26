"use strict";
import { Model } from "sequelize";

interface PostAttributes {
  postId?: string;
  title: string;
  description: string;
  userId?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Post extends Model<PostAttributes> implements PostAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    postId!: string;
    title!: string;
    description!: string;
    userId!: string;
    static associate(models: any) {
      Post.belongsTo(models.Post, {
        foreignKey: {
          name: "userId",
          // type: Sequelize.DataTypes.UUID,
          // allowNull: false,
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
      userId: {
        type: DataTypes.UUID,
        // allowNull: false,
        references: {
          model: "users",
          key: "userId",
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
