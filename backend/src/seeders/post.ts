import db from "models";

const posts = [
  {
    postId: "97cbf1a0-5b1f-11eb-ae93-0242ac130004",
    title: "post1",
    description: "post1 description",
  },
  {
    postId: "97cbf1a0-5b1f-11eb-ae93-0242ac130005",
    title: "post2",
    description: "post2 description",
  },
  {
    postId: "97cbf1a0-5b1f-11eb-ae93-0242ac130006",
    title: "post3",
    description: "post3 description",
  },
];

const createPosts = () => {
  posts.map(async post => {
    try {
      const createPost = await db.Post.create(post);
      console.log("success", createPost.toJSON());
    } catch (error) {
      console.log(error);
    }
  });
};

export default createPosts;
