"use strict";
import { Model } from "sequelize";
import * as zlib from "zlib";
interface IComment {
  commentId?: string;
  comment: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Comment extends Model<IComment> implements IComment {
    commentId!: string;
    comment!: string;
    static associate(models: any) {
      Comment.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Comment.belongsTo(models.Post, {
        foreignKey: {
          name: "postId",
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
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Comment is required",
          },
          len: {
            args: [1, 1000],
            msg: "Comment too long",
          },
        },
        set(value: string) {
          const compressed = zlib.deflateSync(value).toString("base64");
          this.setDataValue("comment", compressed);
        },
        get() {
          const compressed = this.getDataValue("comment");
          const decompressed = zlib.inflateSync(Buffer.from(compressed, "base64"));
          return decompressed.toString();
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
