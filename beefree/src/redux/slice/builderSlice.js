import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contentList: [],
  isUploadFile: false,
};

export const builderSlice = createSlice({
  name: "builder",
  initialState,
  reducers: {
    addContent: (state, action) => {
      const temp = [];
      if (state.contentList.length) {
        state.contentList.forEach((item, index) => {
          if (+action.payload.tagIndex === +index) {
            if (!action.payload.isAppend) {
              temp.push(action.payload.tag);
              temp.push(item);
            } else {
              temp.push(item);
              temp.push(action.payload.tag);
            }
          } else {
            temp.push(item);
          }
        });
      } else {
        temp.push(action.payload.tag);
      }
      state.contentList = temp;
    },
    updateContent: (state, action) => {
      let temp;
      if (action.payload?.tagIndex || +action.payload?.tagIndex === 0) {
        temp = state.contentList.map((content, index) => {
          if (+index === +action.payload.tagIndex) {
            content.contentCode = action.payload.code;
            return content;
          } else {
            return content;
          }
        });
      } else if (action.payload?.contentId) {
        temp = state.contentList.map((content, index) => {
          if (+index === +action.payload.contentId) {
            content.isShow = true;
            return content;
          } else if (content.isShow) {
            content.isShow = false;
            return content;
          } else {
            return content;
          }
        });
      } else if (action.payload?.hideEditor) {
        temp = state.contentList.map((content) => {
          if (content.isShow) {
            content.isShow = false;
          }
          return content;
        });
      }
      if (temp) state.contentList = temp;
    },
    changeUploadFileStatus: (state, action) => {
      state.isUploadFile = action.payload;
    },
  },
});
