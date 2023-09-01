import { IUserResponse } from "types/user";

const removePassword = (user: IUserResponse) => {
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  return userWithoutPassword;
};

export default removePassword;
