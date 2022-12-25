import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

export const resourceSlice = createSlice({
    name: 'category',
    initialState: {
        categories: []
    },
    reducers: {
        loaded: (state, action) => {
            state.categories = action.payload
        },
        created: (state, action) => {

        }
    }
})

export const { loaded, created } = resourceSlice.actions


export const create = (payload) => async (dispatch, getState) => {
    const token = getState().auth?.user?.token
    api.adminCategory(token)
        .create(payload)
        .then(res => {
            dispatch(created(res.data))
        })
        .catch(err => console.log(err))
}

export const fetchAll = () => (dispatch, getState) => {
    const token = getState().auth?.user?.token
    api.adminCategory(token)
        .fetchAll()
        .then(res => {
            dispatch(loaded(res.data))
        })
        .catch(err => console.log(err))
}

export default resourceSlice.reducer