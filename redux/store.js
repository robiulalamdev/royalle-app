// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api/api"; // Assuming you have an api defined
import userReducer from "./user/userSlice";

// Reducers to persist
const persistedReducers = combineReducers({
  // posts: postsReducer,
  [api.reducerPath]: api.reducer,
});

// Reducers not to persist
const nonPersistedReducers = combineReducers({
  user: userReducer,
});

// Persist config for persisted reducers
const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["posts"], // Specify which reducers you want to persist
};

const persistedRootReducer = persistReducer(persistConfig, persistedReducers);

// Combine persisted and non-persisted reducers
const rootReducer = combineReducers({
  persisted: persistedRootReducer,
  nonPersisted: nonPersistedReducers,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
