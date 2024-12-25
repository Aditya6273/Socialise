/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PenLine, Heart, MessageCircle, Share2 } from "lucide-react";

export const ProfileContent = ({ posts }) => {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="w-full justify-start bg-transparent flex gap-3">
        <TabsTrigger value="posts" className="data-[state=active]:bg-zinc-700">
          Posts
        </TabsTrigger>
        <TabsTrigger value="media" className="data-[state=active]:bg-zinc-700">
          Media
        </TabsTrigger>
        <TabsTrigger value="likes" className="data-[state=active]:bg-zinc-700">
          Likes
        </TabsTrigger>
      </TabsList>

      <TabsContent value="posts" className="mt-6">
        <div className="grid gap-6">
          <Button className="w-fit bg-gradient-to-r from-zinc-500 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 border border-zinc-700/50 shadow-lg">
            <PenLine className="h-4 w-4 mr-2" />
            Create New Post
          </Button>

          <div className="flex flex-wrap justify-center gap-4 flex-1">
            {posts.map((post) => (
              <Card
                key={post.id}
                className={`bg-zinc-800/50 flex-grow border-zinc-700 overflow-hidden hover:bg-zinc-800/80 transition-colors w-[300px] ${
                  post.image ? "" : "h-fit"
                }`}
              >
                {post.image && (
                  <div className="relative group">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full aspect-video object-cover rounded-t-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )}
                <CardHeader className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-zinc-100 truncate">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-zinc-400 text-sm">
                        {post.date}
                      </CardDescription>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                </CardHeader>
                <CardContent className="space-y-2 p-0">
                  <div className="flex items-center gap-3 px-4 pb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-zinc-100"
                    >
                      <Heart className="h-4 w-4 mr-1" />
                      124
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-zinc-400 hover:text-zinc-100"
                    >
                      <MessageCircle className="h-4 w-4 mr-1" />
                      23
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
            ))}
          </div>
        </div>
      </TabsContent>

      <TabsContent value="media" className="mt-6">
        <div className="grid grid-cols-4 gap-4 justify-items-center cursor-pointer">
          {posts.map((post) => (
            post.image && (
              <div
                key={post.id}
                className="relative group aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-white font-medium truncate">
                      {post.title}
                    </h4>
                    <p className="text-zinc-300 text-sm">{post.date}</p>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      </TabsContent>

      <TabsContent value="likes" className="mt-6">
        <div className="flex items-center justify-center py-16 text-zinc-400">
          <p className="text-center">
            No liked posts yet
            <br />
            <span className="text-sm text-zinc-500">
              Posts you like will appear here
            </span>
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
