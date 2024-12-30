/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { UserIcon, UserPlus, Mail, Sparkles, ExternalLink } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";



export function UserCard({ user, isBonded, onBondClick }) {
  return (
    <Card className="group relative overflow-hidden border-none bg-gradient-to-br from-background to-muted/10 backdrop-blur-sm transition-all hover:shadow-xl hover:shadow-primary/5">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <Link
        to={`/profile/${user._id}`}
        className="absolute right-4 bottom-4 opacity-0 transition-opacity group-hover:opacity-100 z-10"
      >
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ExternalLink className="h-4 w-4" />
        </Button>
      </Link>
      <div className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
            <img className="w-full h-full object-cover" src={user.profilePic || "/default_profile_pic.jpeg"} alt="" />
        
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <h3 className="font-semibold tracking-tight">
                  {user.firstName} {user.lastName}
                </h3>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <UserIcon className="h-3 w-3" />
                  <span>@{user.username}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className={`bg-background/50 backdrop-blur-sm transition-all ${
                  isBonded
                    ? "bg-white text-black"
                    : "hover:bg-primary hover:text-primary-foreground"
                }`}
                onClick={onBondClick}
               
              >
                <UserPlus className="h-4 w-4 mr-1" />
                {isBonded ? "Unbond" : "Make Bond"}
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="group-hover:border-primary/30">
                <Sparkles className="h-3 w-3 mr-1" />
                New Connection
              </Badge>
              <Badge variant="outline" className="group-hover:border-primary/30">
                <Mail className="h-3 w-3 mr-1" />
                Available
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}