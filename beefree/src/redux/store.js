import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { editorSlice } from "./slice/editorSlice";
import { builderSlice } from "./slice/builderSlice";
import { chatSlice } from "./slice/chatSlice";
import { previewSlice } from "./slice/previewSlice";
import { projectSlice } from "./slice/projectSlice";

export const store = configureStore({
  reducer: {
    editor: editorSlice.reducer,
    builder: builderSlice.reducer,
    chat: chatSlice.reducer,
    preview: previewSlice.reducer,
    project: projectSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
