import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IExtendedUserAuth, IUserAuth, IUserBody } from "types/features";
import { setUserCookies } from "utils";

const initialState: { user: IUserAuth } = {
  // we need to use user:{...} in initialState in order to be able to get user data from the state
  // otherwise we initail state with empty strings
  user: {
    userId: "",
    username: "",
    email: "",
    createdAt: "",
    updatedAt: "",
  },
};

export const userSlice = createSlice({
  initialState,
  name: "userSlice",
  reducers: {
    logout: () => {
      // TODO delete cookie
      return initialState;
    },
    setUser: (state, action: PayloadAction<IUserAuth>) => {
      state.user = action.payload;
      setUserCookies(action.payload.userId);
      console.log({ state: state.user });
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
