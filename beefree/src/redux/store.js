import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { editorSlice } from "./slice/editorSlice";
import { builderSlice } from "./slice/builderSlice";

export const store = configureStore({
  reducer: {
    editor: editorSlice.reducer,
    builder: builderSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
