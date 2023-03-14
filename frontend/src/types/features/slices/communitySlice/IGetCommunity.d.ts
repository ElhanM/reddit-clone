import ICommunityRes from "./ICommunityRes";

export default interface IGetCommunity {
  success: boolean;
  msg: string;
  community: ICommunityRes;
}
