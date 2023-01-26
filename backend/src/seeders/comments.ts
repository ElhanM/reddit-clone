import db from "models";

const comments = [
  {
    commentId: "7a5d9e25-17eb-42ab-a891-a95ba0bb128e",
    comment: "Comment 1",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    postId: "1f4a2051-7d55-4290-9d54-3ba29ec7cdf4",
  },
  {
    commentId: "39615aff-92ce-46d5-b16f-174f46bbd4e1",
    comment: "Comment 2",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    postId: "1f4a2051-7d55-4290-9d54-3ba29ec7cdf4",
  },
  {
    commentId: "de9d4bd8-a230-4968-b4cd-9b51b8989c3b",
    comment: "Comment 3",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    postId: "1f4a2051-7d55-4290-9d54-3ba29ec7cdf4",
  },
];

const createComments = () => {
  comments.map(async comment => {
    try {
      const createComment = await db.Comment.create(comment);
      console.log("success", createComment.toJSON());
    } catch (error) {
      console.log(error);
    }
  });
};

export default createComments;