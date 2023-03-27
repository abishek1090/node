import { configureStore } from "@reduxjs/toolkit";
import postReducer from "./slice"
import storage from "redux-persist/lib/storage"
import {persistReducer,FLUSH,REHYDRATE,REGISTER} from "redux-persist"
import {combineReducers} from "@reduxjs/toolkit"
const persistConfig={
  key:"root",
  version:1,
  storage
}
const reducer=combineReducers({
  posts:postReducer
});

const persistedReducer=persistReducer(persistConfig,reducer);
export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck:{ignoreActions:[FLUSH,REGISTER,REHYDRATE]}})
});