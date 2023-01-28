"use strict";
import { Model } from "sequelize";
import bcrypt from "bcryptjs";

export interface IUser {
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
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.hasMany(models.Comment, {
        foreignKey: {
          name: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      User.belongsToMany(models.Community, {
        through: "CommunityUser",
        // userId as join key reffering to userId in User
        foreignKey: {
          name: "userId",
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
            msg: "Username must be between 4 and 25 characters",
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
        unique: "Email already exists",
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
        },
        set(this: any, password: string) {
          const salt = bcrypt.genSaltSync(10);
          const hashedPassword = bcrypt.hashSync(password, salt);
          this.setDataValue("password", hashedPassword);
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
