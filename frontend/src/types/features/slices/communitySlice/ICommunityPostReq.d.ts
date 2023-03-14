export default interface ICommunityPostReq {
  success: boolean;
  msg: string;
  joinCommunity?: {
    communityUserId: string;
    communityId: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
  };
  leaveCommunity?: number;
}
