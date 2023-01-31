import type { IPostsForUser, IInfo } from "../postSlice";

export default interface IPaginatedGetPosts {
  success?: boolean;
  info: IInfo;
  postsForUser: IPostsForUser[];
}
