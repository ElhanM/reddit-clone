import { IUserResponse } from "types/user";

const removePassword = (user: IUserResponse) => {
  console.log(user);
  const userWithoutPassword = { ...user };
  delete userWithoutPassword.password;
  return userWithoutPassword;
};

export default removePassword;
