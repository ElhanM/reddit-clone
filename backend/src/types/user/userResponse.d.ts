export default interface IUserResponse {
  userId: string;
  username: string;
  email: string;
  // password needs to be optional if we want to be able to delete it
  password?: string;
  createdAt: string;
  updatedAt: string;
}
