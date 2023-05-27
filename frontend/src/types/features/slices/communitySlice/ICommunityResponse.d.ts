export default interface ICommunityResponse {
  success: boolean;
  msg: string;
  createCommunity: {
    description: string;
    communityId: string;
    name: string;
    updatedAt: string;
    createdAt: string;
  };
}
