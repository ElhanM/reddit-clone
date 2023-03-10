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
  {
    communityUserId: "3a47bc17-daed-41c8-a10e-cf38a3f71590",
    userId: "81de75b1-8ebe-47ae-8b8d-95f0c2aae8ba",
    communityId: "1dbd35c9-cc57-4635-afb3-9f8825516bd1",
  },
  {
    communityUserId: "5126cb3f-805e-49a7-8629-dadc11d64918",
    userId: "81de75b1-8ebe-47ae-8b8d-95f0c2aae8ba",
    communityId: "0a22e48d-4a2a-41c0-94d6-949af9d5fe00",
  },
  {
    communityUserId: "1e9c4429-e8dc-40a9-9f9a-86e15f43476a",
    userId: "81de75b1-8ebe-47ae-8b8d-95f0c2aae8ba",
    communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
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
