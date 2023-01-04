import { createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export const adminResourceSlice = createSlice({
    name: 'adminResource',
    initialState: {
        resources: [],
    },
    reducers: {
        loadedResources: (state, action) => {
            state.resources = action.payload
        },
    }
})

export const { loadedResources } = adminResourceSlice.actions

export const fetchResources = () => (dispatch, getState) => {
    const token = getState().auth?.user?.token
    api.admin(token)
        .fetchResources()
        .then(res => {
            dispatch(loadedResources(res.data))
        })
        .catch(err => console.log(err))
}

export default adminResourceSlice.reducer