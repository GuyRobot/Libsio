import { createSlice } from "@reduxjs/toolkit";

export const shareSlice = createSlice({
    name: 'share',
    initialState: {
        searchQuery: "",
    },
    reducers: {
        search: (state, action) => {
            state.searchQuery = action.payload
        },
    }
})

export const { search } = shareSlice.actions

export default shareSlice.reducer