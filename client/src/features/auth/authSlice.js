import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../app/api";

export const taskSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    signuped: (state, action) => {},

    signined: (state, action) => {
      state.user = action.payload.user;
    },

    logout: (state, action) => {
        state.user = null
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signin.fulfilled, (state, action) => {
      state.user = action.payload.user
    });
  },
});

export const { signuped, signined, logout } = taskSlice.actions;

export const signup = (payload) => (dispatch) => {
  api
    .auth()
    .signup(payload)
    .then((res) => {
      dispatch(signuped(res.data));
    })
    .catch((err) => console.log(err));
};

export const signin = createAsyncThunk(
  "users/signinStatus",
  async (payload) => {
    const response = await api.auth().signin(payload);
    return response.data;
  }
);

export default taskSlice.reducer;
