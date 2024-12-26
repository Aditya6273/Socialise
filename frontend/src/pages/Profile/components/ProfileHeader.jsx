
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { Link } from "react-router-dom";



export const ProfileHeader = () => {
  const parsedUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="relative">
      {/* Cover Image */}
      <div className="h-80 overflow-hidden">
        <img
          src={parsedUser.coverImg ? parsedUser.coverImg : "/defaults/default_cover_img.jpeg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Profile Info */}
      <div className="absolute left-0 right-0 -bottom-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-end">
            <div className="flex gap-6 items-end">
              <Avatar className="h-40 w-40 border-4 border-zinc-900">
                <AvatarImage src={parsedUser.profilePic ? parsedUser.profilePic : "/defaults/default_profile_pic.jpeg"} alt={parsedUser.firstName + " " + parsedUser.lastName} />
                <AvatarFallback>{parsedUser.firstName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="mb-2 space-y-1">
                <h1 className="text-3xl font-bold text-white">{parsedUser.firstName + " " + parsedUser.lastName}</h1>
                <p className="text-zinc-400">@{parsedUser.username}</p>
              </div>
            </div>
            <Link to="/profile/update">
            <Button variant="outline" className="mb-2 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800">
              <PenLine className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};