import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import resourceReducer from "../features/resource/resourceSlice";
import adminResourceReducer from "../features/admin/resource/adminResourceSlice";
import categoryReducer from "../features/category/categorySlice";
import publicReducer from "../features/public/publicSlice";
import shareReducer from "../features/share/shareSlice";

import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const rootReducer = combineReducers({
  auth: persistedReducer,
  resource: resourceReducer,
  category: categoryReducer,
  public: publicReducer,
  adminResource: adminResourceReducer,
  share: shareReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: true,
});

export const persistor = persistStore(store);

export default store;
