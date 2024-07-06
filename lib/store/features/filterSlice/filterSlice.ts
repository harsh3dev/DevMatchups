import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  search: string;
  modeOptions: string[];
  expOptions: string[];
  skillOptions: string[];
}

const initialState: FilterState = {
  search: '',
  modeOptions: [],
  expOptions: [],
  skillOptions: [],
};


const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    updateFilters(state, action: PayloadAction<Omit<FilterState, 'search'>>) {
      state.modeOptions = action.payload.modeOptions;
      state.expOptions = action.payload.expOptions;
      state.skillOptions = action.payload.skillOptions;
    },
    resetFilters(state) {
      state.search = '';
      state.modeOptions = [];
      state.skillOptions = [];
      state.skillOptions = [];
    },
  },
});

export const { setSearch, updateFilters, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
