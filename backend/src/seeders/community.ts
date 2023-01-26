import db from "models";

const communities = [
  {
    name: "Community 1",
    description: "Community 1 description",
  },
  {
    name: "Community 2",
    description: "Community 2 description",
  },
  {
    name: "Community 3",
    description: "Community 3 description",
  },
];

const createCommunities = () => {
  communities.map(async community => {
    try {
      const createCommunity = await db.Community.create(community);
      console.log("success", createCommunity.toJSON());
    } catch (error) {
      console.log(error);
    }
  });
};

export default createCommunities;
