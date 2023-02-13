import IReqInfo from "types/features/IReqInfo";
import IUserAuth from "./IUserAuth";

export default interface IExtendedUserAuth extends IReqInfo{
  user: IUserAuth;
}
