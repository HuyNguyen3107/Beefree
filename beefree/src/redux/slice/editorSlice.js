import { createSlice } from "@reduxjs/toolkit";
import editors from "@/core/editor";
import sidebars from "@/core/sidebar";

const initialState = {
  editor: null,
  sidebar: sidebars[0],
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    updateEditor: (state, action) => {
      const newEditor = editors.find((item) => {
        if (action.payload === item.id) return item;
      });
      state.editor = newEditor;
    },
    updateSidebar: (state, action) => {
      const newSidebar = sidebars.find((item) => {
        if (item.type === action.payload) return item;
      });
      state.sidebar = newSidebar;
    },
  },
});
