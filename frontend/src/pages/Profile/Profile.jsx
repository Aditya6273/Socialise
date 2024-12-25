import { ProfileContent } from "./components/ProfileContent";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfileMeta } from "./components/ProfileMeta";
import { ProfileStats } from "./components/ProfileStats";


export const Profile = () => {
  // Mock data - replace with real data in production
  const user = {
    name: "Sarah Wilson",
    username: "@sarahwilson",
    bio: "Digital artist & creative developer. Creating beautiful experiences through code and design. Exploring the intersection of art and technology.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format",
    coverImage: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070&auto=format",
    location: "San Francisco, CA",
    website: "sarahwilson.dev",
    joinDate: "Joined January 2024",
    following: 234,
    followers: 1205,
    posts: [
      {
        id: 1,
        title: "Latest Design Project",
        description: "Just finished this amazing UI design for a new client. Exploring new trends in dark mode interfaces.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format",
        date: "2h ago"
      },
      {
        id: 2,
        title: "Creative Coding",
        description: "Experimenting with generative art using React and Canvas. The possibilities are endless!",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format",
        date: "2d ago"
      },
      {
        id: 3,
        title: "Latest Design Project",
        description: "Just finished this amazing UI design for a new client. Exploring new trends in dark mode interfaces.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format",
        date: "2h ago"
      },
      {
        id: 4,
        title: "Creative Coding",
        description: "Experimenting with generative art using React and Canvas. The possibilities are endless!",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format",
        date: "2d ago"
      },
      {
        id: 5,
        title: "Latest Design Project",
        description: "Just finished this amazing UI design for a new client. Exploring new trends in dark mode interfaces.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&auto=format",
        date: "2h ago"
      },
      {
        id: 6,
        title: "Creative Coding",
        description: "Experimenting with generative art using React and Canvas. The possibilities are endless!",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format",
        date: "2d ago"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-900">
      <ProfileHeader user={user} />
      
      <div className="max-w-6xl mx-auto px-6 mt-28">
        <div className="space-y-8">
          <ProfileMeta
            bio={user.bio}
            location={user.location}
            website={user.website}
            joinDate={user.joinDate}
          />
          
          <ProfileStats
            following={user.following}
            followers={user.followers}
          />
          
          <ProfileContent posts={user.posts} />
        </div>
      </div>
    </div>
  );
};