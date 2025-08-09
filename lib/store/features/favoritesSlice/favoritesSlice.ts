import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../store";

interface ExternalHackathon {
  id: string;
  title: string;
  url: string;
  logo?: string;
  platform: string;
  mode?: string;
  location?: string;
  status?: string;
}

interface FavoritesState {
  favoriteIds: string[];
  favorites: ExternalHackathon[];
  loading: boolean;
  error: string | null;
}

const initialState: FavoritesState = {
  favoriteIds: [],
  favorites: [],
  loading: false,
  error: null,
};

// Async thunks
export const loadExternalFavorites = createAsyncThunk(
  'favorites/loadExternalFavorites',
  async (_, { rejectWithValue, getState }) => {
    const state = getState() as RootState;
    
    // Skip if already loading to prevent duplicate requests
    if (state.favorites.loading) {
      return rejectWithValue("Already loading favorites");
    }
    
    try {
      const response = await axios.get("/api/external-favorites");
      const favorites = response.data;
      const favoriteKeys = favorites.map((fav: any) => `${fav.platform}-${fav.externalId}`);
      return { favorites, favoriteKeys };
    } catch (error) {
      console.error("Failed to load favorites", error);
      return rejectWithValue("Failed to load favorites");
    }
  }
);

export const addExternalFavorite = createAsyncThunk(
  'favorites/addExternalFavorite',
  async (hackathon: ExternalHackathon, { rejectWithValue, dispatch }) => {
    try {
      await axios.post("/api/external-favorites", {
        externalId: hackathon.id,
        title: hackathon.title,
        url: hackathon.url,
        logo: hackathon.logo,
        platform: hackathon.platform,
        mode: hackathon.mode,
        location: hackathon.location,
        status: hackathon.status,
      });
      
      const favoriteKey = `${hackathon.platform}-${hackathon.id}`;
      return favoriteKey;
    } catch (error) {
      console.error("Failed to add to favorites", error);
      return rejectWithValue("Failed to add to favorites");
    }
  }
);

export const removeExternalFavorite = createAsyncThunk(
  'favorites/removeExternalFavorite',
  async ({ externalId, platform }: { externalId: string; platform: string }, { rejectWithValue }) => {
    try {
      await axios.post("/api/external-favorites", {
        externalId,
        platform,
      });
      
      const favoriteKey = `${platform}-${externalId}`;
      return favoriteKey;
    } catch (error) {
      console.error("Failed to remove from favorites", error);
      return rejectWithValue("Failed to remove from favorites");
    }
  }
);

export const toggleExternalFavorite = createAsyncThunk(
  'favorites/toggleExternalFavorite',
  async (hackathon: ExternalHackathon, { getState, dispatch }) => {
    const state = getState() as RootState;
    const isFavorited = state.favorites.favoriteIds.includes(`${hackathon.platform}-${hackathon.id}`);
    
    if (isFavorited) {
      await dispatch(removeExternalFavorite({ externalId: hackathon.id, platform: hackathon.platform }));
    } else {
      await dispatch(addExternalFavorite(hackathon));
    }
    
    // Remove redundant loadExternalFavorites call - optimistic updates handle state
  }
);

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    clearFavorites: (state) => {
      state.favoriteIds = [];
      state.favorites = [];
      state.error = null;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Load favorites
      .addCase(loadExternalFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadExternalFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favoriteIds = action.payload.favoriteKeys;
        state.favorites = action.payload.favorites;
        state.error = null;
      })
      .addCase(loadExternalFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Add favorite
      .addCase(addExternalFavorite.fulfilled, (state, action) => {
        if (!state.favoriteIds.includes(action.payload)) {
          state.favoriteIds.push(action.payload);
        }
        state.error = null;
      })
      .addCase(addExternalFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      // Remove favorite
      .addCase(removeExternalFavorite.fulfilled, (state, action) => {
        state.favoriteIds = state.favoriteIds.filter(id => id !== action.payload);
        state.error = null;
      })
      .addCase(removeExternalFavorite.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearFavorites, setError } = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state: RootState) => state.favorites;
export const selectFavoriteIds = (state: RootState) => state.favorites.favoriteIds;
export const selectIsExternalFavorited = (externalId: string, platform: string) => (state: RootState) => {
  const favoriteKey = `${platform}-${externalId}`;
  return state.favorites.favoriteIds.includes(favoriteKey);
};

export default favoritesSlice.reducer;