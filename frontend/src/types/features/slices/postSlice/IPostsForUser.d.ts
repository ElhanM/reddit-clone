import type { IComment, IUser, ICommunity } from "../postSlice";

export default interface IPostsForUser {
  description: string;
  postId: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  Comments?: IComment[];
  User: IUser;
  Community: ICommunity;
  PostUpvotes?: IUser[];
}
