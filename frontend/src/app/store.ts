import { configureStore } from "@reduxjs/toolkit";
import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector } from "react-redux";

import { postsApi } from "../features/api/postsApi";

export const store = configureStore({
  devTools: true,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(postsApi.middleware),
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
