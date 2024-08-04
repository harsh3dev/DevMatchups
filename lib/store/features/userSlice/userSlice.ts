// redux/userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import axios from 'axios';

export interface UserState {
    name: string;
    email: string;
    image?: string;
    username?: string;
    githubURL?: string;
    linkedinURL?: string;
    portfolio?: string;
    skills?: string[];
    bio?: string;
    role?: string;
    experience?: string;
    loading?: boolean;
    error?: string;
}

const initialState: UserState = {
    name: '',
    email: '',
    loading: false,
    skills: ["Javascript", "Kubernetes", "Docker", "React.js", "Tailwind CSS", "Django", "Node.js", "MongoDB", "AWS", "GCP"]
};

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async ({ userId, email }: { userId: string; email: string | null | undefined }, { rejectWithValue }) => {
        try {
        const response = await axios.get(`https://api.github.com/user/${userId}`);
        return { ...response.data, email };
        } catch (error) {
        return rejectWithValue('Failed to fetch user data');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
        return { ...state, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchUser.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.image = action.payload.avatar_url;
            state.username = action.payload.login;
            state.githubURL = action.payload.html_url;
            state.bio = action.payload.bio;
        })
        .addCase(fetchUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
