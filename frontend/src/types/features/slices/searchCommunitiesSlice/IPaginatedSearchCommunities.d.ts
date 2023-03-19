import { ISearchCommunity } from "types/features";
import IReqInfo from "../../IReqInfo";
import type { IPostInfo } from "../postSlice";

export default interface ISearchCommunity extends IReqInfo {
  info: IPostInfo;
  communities: ISearchCommunity[];
}
