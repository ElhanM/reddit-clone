import db from "models";

const postUpvotes = [
  {
    postUpvoteId: "af6afaef-3ecd-46cf-8e93-9fb752c35218",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    postId: "1f4a2051-7d55-4290-9d54-3ba29ec7cdf4",
  },
  {
    postUpvoteId: "51fa3807-dfea-4f73-b197-734fa08302a5",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    postId: "1f4a2051-7d55-4290-9d54-3ba29ec7cdf4",
  },
  {
    postUpvoteId: "36bb506a-067c-46fc-9c15-db627aacdf30",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    postId: "73af088f-254c-4ed6-8b89-1470ef26985f",
  },
  {
    postUpvoteId: "3a47bc17-daed-41c8-a10e-cf38a3f71590",
    userId: "81de75b1-8ebe-47ae-8b8d-95f0c2aae8ba",
    postId: "dbb15a09-dd18-4407-9484-95cc7b60a1bc",
  },
  {
    postUpvoteId: "5126cb3f-805e-49a7-8629-dadc11d64918",
    userId: "81de75b1-8ebe-47ae-8b8d-95f0c2aae8ba",
    postId: "73af088f-254c-4ed6-8b89-1470ef26985f",
  },
  {
    postUpvoteId: "1e9c4429-e8dc-40a9-9f9a-86e15f43476a",
    userId: "81de75b1-8ebe-47ae-8b8d-95f0c2aae8ba",
    postId: "35a4671a-85e8-4a90-926b-7f264d04259d",
  },
];

const createPostUpvotes = async () => {
  try {
    await db.PostUpvote.bulkCreate(postUpvotes, {
      runValidators: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default createPostUpvotes;
