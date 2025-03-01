import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

export interface UserState {
  id: string;
  name: string | null;
  username: string | null;
  email: string | null;
  emailVerified: string | null;
  image: string | null;
  bio: string | null;
  role: string;
  applications: any[];
  hackathons: any[];
  accounts: any[];
  skills: string[] | string;
  resumeUrl: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  loading: boolean;
  error?: string | null;
}

const initialState: UserState = {
  id: "",
  name: "",
  username: "",
  email: "",
  emailVerified: null,
  image: "",
  bio: "",
  role: "USER",
  applications: [],
  hackathons: [],
  accounts: [],
  skills: [],
  resumeUrl: "",
  linkedinUrl: "",
  githubUrl: "",
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (
    { userId, email }: { userId: string; email: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.get(`/api/user?id=${userId}`);
      const userData = response.data;

      // Ensure we're returning the correct shape of data
      return {
        ...userData,
        email,
        id: userId,
      };
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Failed to fetch user data");
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...initialState, ...action.payload };
    },
    updateUserFields: (state, action: PayloadAction<Partial<UserState>>) => {
      Object.assign(state, action.payload);
    },
    clearUser: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        // Ensure we're updating all fields properly
        Object.assign(state, {
          ...action.payload,
          loading: false,
          error: null,
        });
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch user data";
      });
  },
});

export const { setUser, updateUserFields } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
