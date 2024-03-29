import IUserId from "../authSlice/IUserId";

export default interface IPostsForUser {
  description: string;
  communityId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  Users: IUserId[];
}
