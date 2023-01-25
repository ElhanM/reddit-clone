import { DataTypes, Model } from "sequelize";
import db from "config/config";
import { User } from "./user";

interface IPost {
  postId?: string;
  title: string;
  description: string;
}

export class Post extends Model<IPost> {}

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
    sequelize: db,
    tableName: "posts",
  },
);

// Post.belongsTo(User, {
//   foreignKey: {
//     name: "userId",
//     // type: Sequelize.DataTypes.UUID,
//     allowNull: false,
//   },
//   onDelete: "CASCADE",
//   onUpdate: "CASCADE",
// });
