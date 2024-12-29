import { useEffect, useState, useCallback } from "react";
import { ProfileContent } from "./components/ProfileContent";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileMeta } from "./components/ProfileMeta";
import { ProfileStats } from "./components/ProfileStats";
import { useParams } from "react-router-dom";
import { useUserStore } from "@/Stores/useUserStore";
import { Loader2Icon } from "lucide-react";

const UserProfilePage = () => {
  const { id } = useParams();
  const { getUserById, isLoading } = useUserStore();
  const [user, setUser] = useState(null);

  // Memoize the fetchUser function using useCallback
  const fetchUser = useCallback(async () => {
    try {
      const fetchedUser = await getUserById(id);
      setUser(fetchedUser);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [getUserById, id]); // Dependencies: `getUserById` and `id`

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // Dependency on memoized fetchUser

  console.log("User data:", user);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-900">
        <Loader2Icon size={24} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900">
      <ProfileHeader parsedUser={user} />

      <div className="max-w-6xl mx-auto px-6 mt-28">
        <div className="space-y-8">
          <ProfileMeta parsedUser={user} />

          <ProfileStats
            following={user?.bondings?.length || 0}
            followers={user?.bonds?.length || 0}
          />

          <ProfileContent parsedUser={user} />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
