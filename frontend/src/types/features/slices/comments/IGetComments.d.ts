import IComment from "./IGetComment";

export default interface IGetComments {
  success: boolean;
  data: IGetComment[];
}
