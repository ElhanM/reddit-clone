"use strict";
import { Model } from "sequelize";
import * as zlib from "zlib";

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
        type: DataTypes.TEXT,
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
      modelName: "Community",
      tableName: "communities",
    },
  );
  return Community;
};
