/* eslint-disable react/prop-types */
import { Trash, Heart, MessageCircle, Share2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PostCard = ({ post, onDeleteClick }) => {
  return (
    <div className="relative group h-full">
      <Card className="bg-zinc-800/50 h-fit border-zinc-700 flex flex-col hover:bg-zinc-800/80 transition-colors">
        {post.image ? (
          <div className="relative h-48">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover rounded-t-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ) : (
          <div className="h-3" /> 
        )}
        <CardHeader className="space-y-2 flex-grow">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <CardTitle className="text-lg text-zinc-100 line-clamp-1">
                {post.title}
              </CardTitle>
              <CardDescription className="text-zinc-400 text-sm">
                {post.date}
              </CardDescription>
            </div>
          </div>
          <p className={`text-zinc-300 text-sm leading-relaxed ${post.image ? 'line-clamp-2' : 'line-clamp-4'}`}>
            {post.description}
          </p>
        </CardHeader>
        <CardContent className="mt-auto">
          <div className="flex items-center justify-between gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-zinc-100"
            >
              <Heart className="h-4 w-4 mr-1" />
              {post?.likes?.length || 0}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-zinc-100"
            >
              <MessageCircle className="h-4 w-4 mr-1" />
              {post?.comments?.length || 0}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-zinc-400 hover:text-zinc-100"
            >
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Link
        to={`/post/${post._id}`}
        className="absolute inset-0"
        aria-label={`View post: ${post.title}`}
      />
      
      <Button
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20"
        onClick={(e) => {
          e.preventDefault(); // Prevent link navigation when clicking delete
          onDeleteClick(post._id);
        }}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </div>
  );
};