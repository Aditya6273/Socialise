/* eslint-disable react/prop-types */
import { ExternalLinkIcon, User2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

export function UserCard({ user, isbonding, onToggleFollow }) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Card className="p-4 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors group">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user.profilePic} alt={fullName} />
          <AvatarFallback className="bg-zinc-800/50">
            <User2 className="h-6 w-6 text-zinc-400" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-100">{fullName}</h3>
          <p className="text-sm text-zinc-400">@{user.username}</p>
          {user.bio && <p className="text-sm text-zinc-400 mt-1">{user.bio}</p>}
        </div>
        <div className="flex items-center justify-center gap-2">
          <Button
            variant={isbonding ? "secondary" : "default"}
            size="sm"
            onClick={() => onToggleFollow(user._id)}
            className={
              isbonding
                ? "bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100"
                : "hover:bg-zinc-700 bg-zinc-800 text-zinc-50"
            }
          >
            {isbonding ? "UnBond" : "Make Bond"}
          </Button>
          <Link
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 size-7 rounded-md hover:bg-zinc-800/50  flex items-center justify-center text-zinc-100"
            to={`/profile/${user._id}`}
          >
            <ExternalLinkIcon size={16} className="text-zinc-400 "/></Link>
          
        </div>
      </div>
    </Card>
  );
}
