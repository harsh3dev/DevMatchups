import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  search: string;
  mode: string[];
  experience: string[];
  skills: string[];
}

const initialState: FilterState = {
  search: "",
  mode: [],
  experience: [],
  skills: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setMode(state, action: PayloadAction<string>) {
      state.mode.push(action.payload);
    },
    setExperience(state, action: PayloadAction<string>) {
      state.experience.push(action.payload);
    },
    setSkills(state, action: PayloadAction<string>) {
      state.skills.push(action.payload);
    },
    resetFilters(state) {
      state.search = '';
      state.mode = [];
      state.experience = [];
      state.skills = [];
    },
  },
});

export const { setSearch, setMode, setExperience, setSkills, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
