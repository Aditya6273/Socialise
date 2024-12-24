import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileTabs } from "./components/ProfileTabs";


export default function ProfilePage() {
  return (
    <div className="min-h-screen text-zinc-900 dark:text-zinc-100">
      <div className="container mx-auto px-4 py-8">
        <ProfileHeader />
        <ProfileTabs />
      </div>
    </div>
  )
}
