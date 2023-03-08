import db from "models";

const comments = [
  {
    commentId: "7a5d9e25-17eb-42ab-a891-a95ba0bb128e",
    comment: "Comment 1",
    userId: "eca7aa61-7567-4d1d-befc-b22e3bc372f6",
    postId: "4044831b-e665-42d0-b5ce-aaa309867b36",
  },
  {
    commentId: "39615aff-92ce-46d5-b16f-174f46bbd4e1",
    comment: "Comment 2",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    postId: "4044831b-e665-42d0-b5ce-aaa309867b36",
  },
  {
    commentId: "de9d4bd8-a230-4968-b4cd-9b51b8989c3b",
    comment: "Comment 3",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    postId: "4044831b-e665-42d0-b5ce-aaa309867b36",
  },
  {
    commentId: "de9d4bd8-a230-4968-b4cd-9b51b8989c3a",
    comment: "Comment 34",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    postId: "8ce67c5c-99d8-46c7-9a90-615cb0ec3617",
  },
  {
    commentId: "de9d4bd8-a230-4968-b4cd-9b51b8989c34",
    comment: "Comment 31231",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    postId: "8ce67c5c-99d8-46c7-9a90-615cb0ec3617",
  },
  {
    commentId: "de9d4bd8-a230-4968-b4cd-9b51b8989c32",
    comment: "Comment 3312334",
    userId: "311f992b-e482-4a1a-b15d-68252b5d1ac3",
    postId: "8ce67c5c-99d8-46c7-9a90-615cb0ec3617",
  },
];

const createComments = async () => {
  try {
    await db.Comment.bulkCreate(comments, {
      runValidators: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default createComments;
