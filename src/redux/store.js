import { configureStore, combineReducers } from "@reduxjs/toolkit"; 
import topSalesSlice from "./topSalesSlice";
import catalogSlice from "./catalogSlice";
import productSlice from "./productSlice";
import searchSlice from './searchSlice';
import cartSlice from "./cartSlice";
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
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cartSlice'], //Things you want to persist
  blacklist: ['topSalesSlice', 'catalogSlice', 'productSlice', 'searchSlice'], //Things you dont
};

const rootReducer = combineReducers({
  topSalesSlice,
  catalogSlice,
  productSlice,
  searchSlice,
  cartSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

let persistor = persistStore(store);

export {
  store,
  persistor,
};
