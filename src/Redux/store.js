import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import alertReducer from "./alertSlice";
import apiKeyReducer from "./apiKeySlice";
import apiReducer from "./apiSlice";
import promptTemplateSlice from "./promptTemplateSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  alerts: alertReducer,
  apiKey: apiKeyReducer,
  api: apiReducer,
  promptTemplate: promptTemplateSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/REGISTER",
        ],
      },
    }),
});

export const persistor = persistStore(store);
export default store;
