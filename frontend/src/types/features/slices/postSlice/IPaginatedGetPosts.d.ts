import IReqInfo from "../../IReqInfo";
import type { IPostsForUser, IPostInfo } from "../postSlice";

export default interface IPaginatedGetPosts extends IReqInfo {
  info: IPostInfo;
  postsForUser: IPostsForUser[];
}
