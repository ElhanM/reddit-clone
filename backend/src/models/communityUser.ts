"use strict";
import { Model } from "sequelize";

export interface ICommunityUser {
  communityUserId?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class CommunityUser extends Model<ICommunityUser> implements ICommunityUser {
    communityUserId!: string;
  }
  // the foreign keys also act as a composite alternate key
  // so their pair has to be unique
  CommunityUser.init(
    {
      communityUserId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      modelName: "CommunityUser",
      tableName: "communityUsers",
      timestamps: false,
    },
  );

  return CommunityUser;
};
