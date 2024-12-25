/* eslint-disable react/prop-types */
import { MapPinCheck, LinkIcon, Calendar  } from "lucide-react";


export const ProfileMeta = ({ location, bio }) => {
  const parsedUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="space-y-4">
      <p className="text-zinc-300 max-w-2xl">{bio}</p>
      <div className="flex flex-wrap gap-6 text-sm text-zinc-400">
        <div className="flex items-center gap-2">
          <MapPinCheck className="h-4 w-4" />
          {location}
        </div>
        <div className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4" />
          {parsedUser.email}
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Joined {parsedUser.createdAt.split("T")[0] }
        </div>
      </div>
    </div>
  );
};