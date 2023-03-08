export default interface IGetComment {
  comment: string;
  commentId: string;
  createdAt: string;
  updatedAt: string;
  User: {
    userId: string;
    username: string;
  };
}
