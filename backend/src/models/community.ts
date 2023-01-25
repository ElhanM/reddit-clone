import { DataTypes, Model } from "sequelize";
import db from "config/config";
import { v4 as uuidv4 } from "uuid";

interface ICommunity {
  commud?: string;
  name: string;
  description: string;
}

export class Community extends Model<ICommunity> {}

Community.init(
  {
    commud: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4(),
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
    tableName: "communities",
  },
);
