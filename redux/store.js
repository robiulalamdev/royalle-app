// store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "./apiSlice"; // Assuming you have an apiSlice defined

const rootReducer = combineReducers({
  // Add your reducers here
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);
