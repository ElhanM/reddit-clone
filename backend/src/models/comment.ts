"use strict";
import { Model } from "sequelize";

interface IComment {
  commentId?: string;
  comment: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Comment extends Model<IComment> implements IComment {
    commentId?: string;
    comment!: string;
    static associate(models: any) {
      Comment.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
          // allowNull: false,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Comment.belongsTo(models.Post, {
        foreignKey: {
          name: "postId",
          // allowNull: false,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Comment.init(
    {
      commentId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      comment: {
        // TODO: Add zlib compress, make it validate before compressing
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Comment is required",
          },
          len: {
            args: [1, 255],
            msg: "Comment must be between 1 and 255 characters",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Comment",
      tableName: "comments",
    },
  );
  return Comment;
};
