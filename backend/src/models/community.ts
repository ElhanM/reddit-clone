"use strict";
import { Model } from "sequelize";

interface ICommunity {
  communityId?: string;
  name: string;
  description: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Community extends Model<ICommunity> implements ICommunity {
    communityId!: string;
    name!: string;
    description!: string;
    static associate(models: any) {
      Community.belongsToMany(models.User, {
        through: "CommunityUser",
        foreignKey: {
          name: "communityId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      // community has many posts
      Community.hasMany(models.Post, {
        foreignKey: {
          name: "communityId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Community.init(
    {
      communityId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required",
          },
          len: {
            args: [1, 25],
            msg: "Name must be between 1 and 25 characters",
          },
          is: {
            args: /^[a-zA-Z0-9-_.]+$/,
            msg: "Community name can only contain letters, numbers, dash, underscore and dot and no space",
          },
        },
        // remove all spaces
        set(value: string) {
          this.setDataValue("name", value.replace(/\s/g, ""));
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
      modelName: "Community",
      tableName: "communities",
    },
  );
  return Community;
};
