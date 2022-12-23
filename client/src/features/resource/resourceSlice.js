import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

export const resourceSlice = createSlice({
    name: 'resource',
    initialState: {

    },
    reducers: {
        loaded: (state, action) => {

        },
        created: (state, action) => {

        }
    }
})

export const { loaded, created } = resourceSlice.actions


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

export default resourceSlice.reducer