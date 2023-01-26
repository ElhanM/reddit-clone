import db from "models";

const communities = [
  {
    communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
    name: "Community 1",
    description: "Community 1 description",
  },
  {
    communityId: "0a22e48d-4a2a-41c0-94d6-949af9d5fe00",
    name: "Community 2",
    description: "Community 2 description",
  },
  {
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
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