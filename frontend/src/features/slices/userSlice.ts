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
      deleteUserCookies();
      return initialState;
    },
    setUser: (state, action: PayloadAction<IUserAuth>) => {
      state.user = action.payload;
      setUserCookies(action.payload.userId);
    },
  },
});

export default userSlice.reducer;

export const { logout, setUser } = userSlice.actions;
