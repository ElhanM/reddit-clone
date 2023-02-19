import ICommunity from "../postSlice/ICommunity";

export default interface IGetCommunities {
  success: boolean;
  msg: string;
  communities: ICommunity[];
}
