import { configureStore } from '@reduxjs/toolkit'
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
import { combineReducers } from 'redux'

import { userSlice } from './modules/user'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['user'] 
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  user: userSlice.reducer
}))

let store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

let persistor = persistStore(store)

export {
  store,
  persistor
}