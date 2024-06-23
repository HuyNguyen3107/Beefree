import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addNewProject: (state, action) => {
      const project = {
        id: action.payload.id,
        name: `New ${action.payload.type}`,
        type: action.payload.type,
        createdAt: new Date(),
        data: {
          generalStyle: "",
          contentGeneralStyle:
            "width: 745px; margin-left: auto; margin-right: auto;",
          rows: [],
        },
      };
      state.projects = [...state.projects, project];
    },
    updateProject: (state, action) => {
      const { projectInfo, data } = action.payload;
      const arr = state.projects.map((project) => {
        if (project.id === projectInfo.id) {
          return {
            ...project,
            name: projectInfo.name,
            type: projectInfo.type,
            data,
          };
        }
        return project;
      });
      state.projects = arr;
    },
  },
});
