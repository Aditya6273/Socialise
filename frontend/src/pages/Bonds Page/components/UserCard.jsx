/* eslint-disable react/prop-types */
import { User2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserCard({ user, isbonding, onToggleFollow }) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Card className="p-4 bg-zinc-900/50 border-zinc-800 hover:bg-zinc-900 transition-colors">
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
        <Button
          variant={isbonding ? "secondary" : "default"}
          size="sm"
          onClick={() => onToggleFollow(user._id)}
          className={isbonding 
            ? "bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-100" 
            : "hover:bg-zinc-700 bg-zinc-800 text-zinc-50"}
        >
          {isbonding ? "UnBond" : "Make Bond"}
        </Button>
      </div>
    </Card>
  );
}