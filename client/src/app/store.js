import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice";
import resourceReducer from "../features/resource/resourceSlice";
import categoryReducer from "../features/category/categorySlice";
import publicReducer from "../features/public/publicSlice";

import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  resource: resourceReducer,
  category: categoryReducer,
  public: publicReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    devTools: true
})

export const persistor = persistStore(store);

export default store;