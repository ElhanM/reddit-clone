import db from "models";

const comments = [
  {
    comment: "Comment 1",
  },

  {
    comment: "Comment 2",
  },

  {
    comment: "Comment 3",
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
