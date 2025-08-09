'use client';

import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { 
  selectFavorites, 
  selectFavoriteIds, 
  selectIsExternalFavorited,
  loadExternalFavorites,
  addExternalFavorite,
  removeExternalFavorite,
  toggleExternalFavorite
} from "@/lib/store/features/favoritesSlice/favoritesSlice";
import { toast } from "react-toastify";

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

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector(selectFavorites);
  const favoriteIds = useAppSelector(selectFavoriteIds);

  const handleAddExternalFavorite = useCallback(async (hackathon: ExternalHackathon) => {
    try {
      await dispatch(addExternalFavorite(hackathon)).unwrap();
      toast.success("Added to favorites!");
    } catch (error) {
      toast.error("Failed to add to favorites");
      console.error(error);
    }
  }, [dispatch]);

  const handleRemoveExternalFavorite = useCallback(async (externalId: string, platform: string) => {
    try {
      await dispatch(removeExternalFavorite({ externalId, platform })).unwrap();
      toast.success("Removed from favorites!");
    } catch (error) {
      toast.error("Failed to remove from favorites");
      console.error(error);
    }
  }, [dispatch]);

  const handleToggleExternalFavorite = useCallback(async (hackathon: ExternalHackathon) => {
    try {
      await dispatch(toggleExternalFavorite(hackathon)).unwrap();
    } catch (error) {
      toast.error("Failed to update favorites");
      console.error(error);
    }
  }, [dispatch]);

  const handleLoadExternalFavorites = useCallback(async () => {
    try {
      await dispatch(loadExternalFavorites()).unwrap();
    } catch (error) {
      toast.error("Failed to load favorites");
      console.error(error);
    }
  }, [dispatch]);

  const isExternalFavorited = useCallback((externalId: string, platform: string) => {
    const favoriteKey = `${platform}-${externalId}`;
    return favoriteIds.includes(favoriteKey);
  }, [favoriteIds]);

  return {
    favoriteIds,
    favorites: favorites.favorites,
    loading: favorites.loading,
    error: favorites.error,
    addExternalFavorite: handleAddExternalFavorite,
    removeExternalFavorite: handleRemoveExternalFavorite,
    toggleExternalFavorite: handleToggleExternalFavorite,
    isExternalFavorited,
    loadExternalFavorites: handleLoadExternalFavorites,
  };
};