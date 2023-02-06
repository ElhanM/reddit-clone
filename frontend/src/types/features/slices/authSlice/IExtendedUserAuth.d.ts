import IUserAuth from "./IUserAuth";

export default interface IExtendedUserAuth {
  success: boolean;
  msg: string;
  user: IUserAuth;
}
