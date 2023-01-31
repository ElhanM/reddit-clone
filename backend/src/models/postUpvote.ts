"use strict";
import { Model } from "sequelize";

export interface IPostUpvote {
  postUpvoteId?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class PostUpvote extends Model<IPostUpvote> implements IPostUpvote {
    postUpvoteId!: string;
    static associate(models: any) {
      PostUpvote.belongsTo(models.User, {
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      PostUpvote.belongsTo(models.Post, {
        foreignKey: {
          name: "postId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  PostUpvote.init(
    {
      postUpvoteId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: "PostUpvote",
      tableName: "postUpvotes",
    },
  );

  return PostUpvote;
};
