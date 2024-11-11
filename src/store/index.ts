import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import api from "./api";
import { slice } from "./slice";

const store = configureStore({
  reducer: {
    root: slice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(api.middleware),
});

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export type RootState = ReturnType<typeof store.getState>;
export default store;

export * from "./slice";
