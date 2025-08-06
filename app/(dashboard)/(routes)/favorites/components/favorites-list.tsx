"use client";

import { useEffect, useState } from "react";
import PostCard from "../../teams/components/PostCard";
import { useFavorites } from "@/app/hooks/use-favorites";

export const FavoritesList = () => {
  const [loading, setLoading] = useState(true);
  const { favoriteIds, loadExternalFavorites } = useFavorites();

  useEffect(() => {
    const initializeFavorites = async () => {
      try {
        await loadExternalFavorites();
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      } finally {
        setLoading(false);
      }
    };

    initializeFavorites();
  }, [loadExternalFavorites]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (favoriteIds.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-muted-foreground">No favorite hackathons yet.</p>
      </div>
    );
  }

  return (
    <div className="text-center mt-10">
      <p className="text-muted-foreground">External favorite hackathons are displayed in the Hackathons page under the "Favorites" tab.</p>
    </div>
  );
};