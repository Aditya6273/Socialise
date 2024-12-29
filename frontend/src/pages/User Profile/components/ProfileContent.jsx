/* eslint-disable react/prop-types */
import { Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useUserStore } from "@/Stores/useUserStore";

import { PostCard } from "./PostCard";

export const ProfileContent = ({parsedUser}) => {
  const { isLoading } = useUserStore();

  
  const posts = parsedUser?.posts || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-zinc-400">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="w-full justify-start bg-transparent flex gap-3">
          <TabsTrigger
            value="posts"
            className="data-[state=active]:bg-zinc-700"
          >
            Posts
          </TabsTrigger>
          <TabsTrigger
            value="media"
            className="data-[state=active]:bg-zinc-700"
          >
            Media
          </TabsTrigger>
          <TabsTrigger
            value="likes"
            className="data-[state=active]:bg-zinc-700"
          >
            Likes
          </TabsTrigger>
        </TabsList>

        {/* Posts Tab */}
        <TabsContent value="posts" className="mt-6">
          <div className="space-y-6">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.reverse().map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center py-16 text-zinc-400">
                <h3 className="font-semibold text-2xl">No posts yet</h3>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="mt-6">
          <div className="grid grid-cols-4 gap-4 justify-items-center cursor-pointer">
            {posts.some((post) => post.image) ? (
              posts.map(
                (post) =>
                  post.image && (
                    <div
                      key={post._id}
                      className="relative group aspect-square overflow-hidden rounded-lg"
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-zinc-100 font-bold truncate whitespace-pre-wrap">
                            {post.title}
                          </h4>
                          <p className="text-zinc-300 text-sm">
                            {post.createdAt.split("T")[0]}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
              )
            ) : (
              <div className="flex items-center justify-center py-16 text-zinc-400">
                <h3 className="font-semibold text-2xl ">No Media</h3>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Likes Tab */}
        <TabsContent value="likes" className="mt-6">
          <div className="grid gap-6">
            <h3 className="text-xl text-zinc-300 font-semibold">
              Liked Posts:
            </h3>
            {/* Display liked posts here if available */}
            {posts.length === 0 && (
              <div className="flex items-center justify-center py-16 text-zinc-400">
                <h3 className="font-semibold text-2xl ">No Likes</h3>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
