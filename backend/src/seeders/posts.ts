import db from "models";

const posts = [
  {
    postId: "1f4a2051-7d55-4290-9d54-3ba29ec7cdf4",
    title: "post1",
    description: "post1 description",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
  },
  {
    postId: "73af088f-254c-4ed6-8b89-1470ef26985f",
    title: "post2",
    description: "post2 description",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    communityId: "d3c62225-dbbc-4335-b25e-fe06d5edbec1",
  },
  {
    postId: "dbb15a09-dd18-4407-9484-95cc7b60a1bc",
    title: "post3",
    description: "post3 description",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    communityId: "0a22e48d-4a2a-41c0-94d6-949af9d5fe00",
  },
];

const createPosts = async () => {
  try {
    await db.Post.bulkCreate(posts, {
      runValidators: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default createPosts;
