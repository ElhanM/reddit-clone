// PLUGINS IMPORTS //
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// COMPONENTS IMPORTS //
import { deleteUserCookies, setUserCookies } from "utils";

// EXTRA IMPORTS //
import { IUserAuth } from "types/features";

/////////////////////////////////////////////////////////////////////////////

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
      console.log("LOGOUT USER SLICE");
      deleteUserCookies();
      return initialState;
    },
    setUser: (state, action: PayloadAction<IUserAuth>) => {
      console.log("LOGIN SETTING DATA");
      state.user = action.payload;
      setUserCookies(action.payload.userId);
      console.log({ state: state.user });
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
