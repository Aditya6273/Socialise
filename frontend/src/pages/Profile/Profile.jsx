import { ProfileContent } from "./components/ProfileContent";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileMeta } from "./components/ProfileMeta";
import { ProfileStats } from "./components/ProfileStats";


export const Profile = () => {
  // Mock data - replace with real data in production

  const parsedUser = JSON.parse(localStorage.getItem("profile"));

  return (
    <div className="min-h-screen bg-zinc-900">
      <ProfileHeader />
      
      <div className="max-w-6xl mx-auto px-6 mt-28">
        <div className="space-y-8">
          <ProfileMeta
          />
          
          <ProfileStats
            following={parsedUser.bondings.length || 0}
            followers={parsedUser.bonds.length || 0} 
          />
          
          <ProfileContent />
        </div>
      </div>
    </div>
  );
};