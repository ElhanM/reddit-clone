import IUserId from "../authSlice/IUserId";

export default interface ICommunityRes {
  communityId: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  Users: IUserId[];
}
