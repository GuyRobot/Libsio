import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

export const resourceSlice = createSlice({
    name: 'public',
    initialState: {
        resources: {},
    },
    reducers: {
        loaded: (state, action) => {
            state.resources["all"] = action.payload
        },
        created: (state, action) => {

        },
        loadedOfCategory: (state, action) => {
            state.resources[action.payload.category] = action.payload.data
        }
    }
})

export const { loaded, loadedOfCategory, created } = resourceSlice.actions

export const fetchResources = () => dispatch => {
    api.public()
        .fetchResources()
        .then(res => {
            dispatch(loaded(res.data))
        })
        .catch(err => console.log(err))
}

export const fetchResourcesOfCategory = (category) => dispatch => {
    api.public()
        .fetchResourcesOfCategory(category)
        .then(res => {
            dispatch(loadedOfCategory({ category: category, data: res.data }))
        })
        .catch(err => console.log(err))
}

export default resourceSlice.reducer