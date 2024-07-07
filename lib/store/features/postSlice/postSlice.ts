// postSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HackathonEntry } from '@/app/(dashboard)/(routes)/findmember/Form/types';

interface PostInterface {
    posts: HackathonEntry[];
}

const initialState: PostInterface = {
    posts: [],
};

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<HackathonEntry[]>) {
            state.posts = action.payload;
        },
    },
});

export const { setPosts } = postSlice.actions;
export default postSlice.reducer;
