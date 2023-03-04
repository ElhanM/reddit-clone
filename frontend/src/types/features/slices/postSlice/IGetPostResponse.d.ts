export default interface IGetPostResponse {
  success: boolean;
  msg?: string;
  data: IPostsForUser;
}
