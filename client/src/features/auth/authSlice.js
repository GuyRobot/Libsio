import { createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

export const taskSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {}
    },
    reducers: {
        signuped: (state, action) => {

        },

        signined: (state, action) => {
            state.user.token = action.payload.token
        }
    }
})

export const { signuped, signined } = taskSlice.actions


export const signup = (payload) => dispatch => {
    api.auth()
        .signup(payload)
        .then(res => {
            dispatch(signuped(res.data))
        })
        .catch(err => console.log(err))
}

export const signin = (payload) => dispatch => {
    api.auth()
        .signin(payload)
        .then(res => {
            dispatch(signined(res.data))
        })
        .catch(err => console.log(err))
}

export default taskSlice.reducer