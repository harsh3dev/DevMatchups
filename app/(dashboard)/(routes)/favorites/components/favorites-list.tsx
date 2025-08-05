"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../../teams/components/PostCard";
import { HackathonEntry } from "@/app/(dashboard)/(routes)/findmember/Form/types";
import { useFavorites } from "@/app/hooks/use-favorites";

export const FavoritesList = () => {
  const [favorites, setFavorites] = useState<HackathonEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { loadExternalFavorites } = useFavorites();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/api/favorites");
        setFavorites(response.data.map((fav: any) => fav.hackathon));
        loadExternalFavorites(); // Update the global favorites state
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [loadExternalFavorites]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-10">
        <p className="text-muted-foreground">No favorite hackathons yet.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favorites.map((hackathon) => (
        <PostCard key={hackathon.id} entry={hackathon} />
      ))}
    </div>
  );
};