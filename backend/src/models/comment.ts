import { DataTypes, Model } from "sequelize";
import db from "config/config";
import { v4 as uuidv4 } from "uuid";

interface IComment {
  commentId?: string;
  comment: string;
}

export class Comment extends Model<IComment> {}

Comment.init(
  {
    commentId: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4(),
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
    sequelize: db,
    tableName: "comments",
  },
);
