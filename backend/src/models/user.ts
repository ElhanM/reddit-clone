import { DataTypes, Model } from "sequelize";
import db from "config/config";
import { v4 as uuidv4 } from "uuid";

interface IUser {
  id?: string;
  username: string;
}

export class UserInstance extends Model<IUser> {}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuidv4(),
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "users",
  },
);
