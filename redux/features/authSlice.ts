import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the signup data object including otp
export interface SignupData {
  email: string;
  username: string;
  name: string;
  password: string;
}

// Define the state type
interface AuthState {
  signupData: SignupData | null;
  loading: boolean;
}

const initialState: AuthState = {
  signupData: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, action: PayloadAction<SignupData>) {
      state.signupData = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setSignupData, setLoading } = authSlice.actions;

export default authSlice.reducer;
