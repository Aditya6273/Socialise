/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export function PostHeader({ author, createdAt ,isOwner ,postId }) {
    const handleDelete = async () =>{

    }
  return (
    <div className="flex justify-between ">
      <div className="flex items-center space-x-2">
        <Avatar>
          <AvatarImage src={author.profilePic} alt={author.firstName}  />
          <AvatarFallback className="text-sm font-mono">{author.firstName[0] + author.lastName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-zinc-100">
            {author.firstName} {author.lastName}
          </h3>
          <span className="text-sm text-zinc-500">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>
      {isOwner && (<div className="">
        <Button variant="destructive" onClick={() => handleDelete(postId)}>
            <Trash2 className="w-4 h-4" />
            Delete
        </Button>
      </div>)}
    </div>
  );
}
