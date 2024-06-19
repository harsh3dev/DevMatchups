import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/authSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
        auth: authReducer,
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']