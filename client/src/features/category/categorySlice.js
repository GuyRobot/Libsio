import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

export const resourceSlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        details: []
    },
    reducers: {
        loaded: (state, action) => {
            state.categories = action.payload
        },
        created: (state, action) => {

        },
        loadedDetails: (state, action) => {
            state.details = action.payload
        },
    }
})

export const { loaded, loadedDetails, created } = resourceSlice.actions


export const create = (payload) => async (dispatch, getState) => {
    const token = getState().auth?.user?.token
    api.admin(token)
        .createCategory(payload)
        .then(res => {
            dispatch(created(res.data))
        })
        .catch(err => console.log(err))
}

export const fetchAll = () => (dispatch, getState) => {
    const token = getState().auth?.user?.token
    api.category(token)
        .fetchAll()
        .then(res => {
            dispatch(loaded(res.data))
        })
        .catch(err => console.log(err))
}

export const fetchDetails = () => (dispatch, getState) => {
    const token = getState().auth?.user?.token
    api.category(token)
        .fetchDetails()
        .then(res => {
            dispatch(loadedDetails(res.data))
        })
        .catch(err => console.log(err))
}

export default resourceSlice.reducer