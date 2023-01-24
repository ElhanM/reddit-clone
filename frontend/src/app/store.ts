import { configureStore } from "@reduxjs/toolkit"
import type { TypedUseSelectorHook } from "react-redux"
import { useDispatch, useSelector } from "react-redux"

export const store = configureStore({
  reducer: {},
})
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
