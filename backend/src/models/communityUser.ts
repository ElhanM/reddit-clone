"use strict";
import { Model } from "sequelize";

interface ICommunity {
  communityUserId?: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
  class Community extends Model<ICommunity> implements ICommunity {
    communityUserId!: string;
  }
  // the foreign keys also act as a composite alternate key
  // so their pair has to be unique
  Community.init(
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
    },
  );

  return Community;
};
