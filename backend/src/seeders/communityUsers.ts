import db from "models";

const communityUsers = [
  {
    communityUserId: "af6afaef-3ecd-46cf-8e93-9fb752c35218",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
  },
  {
    communityUserId: "51fa3807-dfea-4f73-b197-734fa08302a5",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
  },
  {
    communityUserId: "36bb506a-067c-46fc-9c15-db627aacdf30",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "0a22e48d-4a2a-41c0-94d6-949af9d5fe00",
  },
];

const createCommunityUsers = async () => {
  try {
    await db.CommunityUser.bulkCreate(communityUsers, {
      runValidators: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default createCommunityUsers;
