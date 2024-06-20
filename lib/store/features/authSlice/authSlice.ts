// slices/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignupData {
  email: string;
  username: string;
  password: string;
  name: string;
}

interface AuthState {
  signupData: SignupData | null;
  loading: boolean;
  token: string | null;
}

const initialState: AuthState = {
  signupData: null,
  loading: false,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setSignupData(state, action: PayloadAction<SignupData>){
      state.signupData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>){
      state.loading = action.payload;
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
