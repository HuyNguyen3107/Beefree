import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  previewStatus: false,
};

export const previewSlice = createSlice({
  name: "preview",
  initialState,
  reducers: {
    setPreviewStatus: (state, action) => {
      state.previewStatus = action.payload;
    },
  },
});
