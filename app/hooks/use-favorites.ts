'use client';

import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

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

interface FavoritesStore {
  favoriteIds: string[];
  addExternalFavorite: (hackathon: ExternalHackathon) => Promise<void>;
  removeExternalFavorite: (externalId: string, platform: string) => Promise<void>;
  toggleExternalFavorite: (hackathon: ExternalHackathon) => Promise<void>;
  isExternalFavorited: (externalId: string, platform: string) => boolean;
  loadExternalFavorites: () => Promise<void>;
}

export const useFavorites = create<FavoritesStore>((set, get) => ({
  favoriteIds: [],

  addExternalFavorite: async (hackathon: ExternalHackathon) => {
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
      set((state) => ({
        favoriteIds: [...state.favoriteIds, favoriteKey],
      }));
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error("Failed to add to favorites");
      console.error(error);
    }
  },

  removeExternalFavorite: async (externalId: string, platform: string) => {
    try {
      await axios.post("/api/external-favorites", {
        externalId,
        platform,
      });
      
      const favoriteKey = `${platform}-${externalId}`;
      set((state) => ({
        favoriteIds: state.favoriteIds.filter((id) => id !== favoriteKey),
      }));
      toast.success("Removed from favorites!");
    } catch (error) {
      toast.error("Failed to remove from favorites");
      console.error(error);
    }
  },

  toggleExternalFavorite: async (hackathon: ExternalHackathon) => {
    const isFavorited = get().isExternalFavorited(hackathon.id, hackathon.platform);
    if (isFavorited) {
      await get().removeExternalFavorite(hackathon.id, hackathon.platform);
    } else {
      await get().addExternalFavorite(hackathon);
    }
    // Reload favorites to ensure consistency
    await get().loadExternalFavorites();
  },

  isExternalFavorited: (externalId: string, platform: string) => {
    const favoriteKey = `${platform}-${externalId}`;
    return get().favoriteIds.includes(favoriteKey);
  },

  loadExternalFavorites: async () => {
    try {
      const response = await axios.get("/api/external-favorites");
      const favorites = response.data;
      const favoriteKeys = favorites.map((fav: any) => `${fav.platform}-${fav.externalId}`);
      set({
        favoriteIds: favoriteKeys,
      });
    } catch (error) {
      console.error("Failed to load favorites", error);
      toast.error("Failed to load favorites");
    }
  },
}));