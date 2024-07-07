import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice/authSlice'
import filterReducer from './features/filterSlice/filterSlice'
import postReducer from './features/postSlice/postSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
        auth:authReducer,
        filter: filterReducer,
        post: postReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']