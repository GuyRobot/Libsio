import { createSlice } from "@reduxjs/toolkit";
import api from "../../../app/api";

export const adminResourceSlice = createSlice({
  name: "adminResource",
  initialState: {
    resources: [],
  },
  reducers: {
    loadedResources: (state, action) => {
      state.resources = action.payload;
    },
    approvedResource: (state, action) => {
      state.resources = state.resources.map((item) =>
        item._id === action.payload
          ? Object.assign(item, { status: true })
          : item
      );
    },
  },
});

export const { loadedResources, approvedResource } = adminResourceSlice.actions;

export const fetchResources = () => (dispatch, getState) => {
  const token = getState().auth?.user?.token;
  api
    .admin(token)
    .fetchResources()
    .then((res) => {
      dispatch(loadedResources(res.data));
    })
    .catch((err) => console.log(err));
};

export const approveResource = (id) => (dispatch, getState) => {
  const token = getState().auth?.user?.token;
  api
    .admin(token)
    .approveResource(id)
    .then(() => {
      dispatch(approvedResource(id));
    })
    .catch((err) => console.log(err));
};

export default adminResourceSlice.reducer;
