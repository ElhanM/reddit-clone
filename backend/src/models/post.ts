"use strict";
import { Model } from "sequelize";
import * as zlib from "zlib";
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
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Description is required",
          },
          len: {
            args: [1, 1000],
            msg: "Description too long",
          },
        },
        // zlib adds compression to the data. makes it smaller
        set(value: string) {
          const compressed = zlib.deflateSync(value).toString("base64");
          this.setDataValue("description", compressed);
        },
        get() {
          const compressed = this.getDataValue("description");
          const decompressed = zlib.inflateSync(Buffer.from(compressed, "base64"));
          return decompressed.toString();
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
