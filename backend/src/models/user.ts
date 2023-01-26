"use strict";
import { Model } from "sequelize";

interface IUser {
  userId?: string;
  username: string;
  email: string;
  password: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<IUser> implements IUser {
    userId!: string;
    username!: string;
    email!: string;
    password!: string;
    static associate(models: any) {
      User.hasMany(models.Post, {
        foreignKey: {
          name: "userId",
          // allowNull: false,
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  User.init(
    {
      userId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "Username already exists",
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
          len: {
            args: [4, 25],
            msg: "Username must be between 1 and 25 characters",
          },
          is: {
            args: /^[a-zA-Z0-9_.-]+$/,
            msg: "Username can only contain letters, numbers, dash, underscore and dot",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: "Username already exists",
        validate: {
          notEmpty: {
            msg: "Email is required",
          },
          isEmail: {
            msg: "Invalid email",
          },
          len: {
            args: [4, 255],
            msg: "Email must be between 4 and 255 characters",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [8, 32],
            msg: "Password must be between 8 and 32 characters",
          },
          is: {
            args: /^[a-zA-Z0-9_.-]+$/,
            msg: "Password can only contain letters, numbers, dash, underscore and dot",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
    },
  );
  return User;
};
