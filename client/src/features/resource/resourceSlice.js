import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {
        resources: [],
        category: {

        }
    },
    reducers: {
        loaded: (state, action) => {
            state.category["all"] = action.payload
        },
        created: (state, action) => {

        },
        loadedOfCategory: (state, action) => {
            state.category[action.payload.category] = action.payload.data
        }
    }
})

export const { loaded, loadedOfCategory, created } = resourceSlice.actions


export const create = (payload) => async (dispatch, getState) => {
    const token = getState().auth?.user?.token
    if ("image" in payload) {
        const res = await api.upload(token)
            .uploadImage(payload['image'])
        payload['image'] = res.data.data.name
    }
    api.resource(token)
        .create(payload)
        .then(res => {
            dispatch(created(res.data))
        })
        .catch(err => console.log(err))
}

export const fetchResources = () => (dispatch, getState) => {
    const token = getState().auth?.user?.token
    api.resource(token)
        .fetchAll()
        .then(res => {
            dispatch(loaded(res.data))
        })
        .catch(err => console.log(err))
}

export const fetchOfCategory = (category) => (dispatch, getState) => {
    const token = getState().auth?.user?.token
    api.resource(token)
        .fetchOfCategory(category)
        .then(res => {
            dispatch(loadedOfCategory({ category: category, data: res.data }))
        })
        .catch(err => console.log(err))
}

export default resourceSlice.reducer