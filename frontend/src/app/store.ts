// PLUGINS IMPORTS //
import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

// COMPONENTS IMPORTS //

// EXTRA IMPORTS //
import { apiSlice } from "features/api/apiSlice";
import userReducer from "features/slices/userSlice";

/////////////////////////////////////////////////////////////////////////////

export const store = configureStore({
  devTools: true,
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    userState: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
