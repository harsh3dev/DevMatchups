import { redirect } from "next/navigation";
import { Heading } from "../../../../components/heading";
import { FaStar } from "react-icons/fa";
import { Suspense } from "react";
import { FavoritesList } from "./components/favorites-list";
import { auth } from "@/auth";

export default async function FavoritesPage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div>
      <Heading
        title="Favorite Hackathons"
        description="View and manage your favorite hackathons"
        icon={FaStar}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/10"
      />
      <div className="px-4 lg:px-8">
        <Suspense fallback={<div>Loading...</div>}>
          <FavoritesList />
        </Suspense>
      </div>
    </div>
  );
}