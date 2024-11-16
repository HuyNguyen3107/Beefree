import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    search: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        updateSearch: (state, action) => {
            // console.log("action", action.payload);
            state.search = action.payload;
        },
    },
});
