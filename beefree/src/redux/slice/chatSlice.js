import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatStatus: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    updateChatStatus: (state, action) => {
      state.chatStatus = action.payload;
    },
  },
});
