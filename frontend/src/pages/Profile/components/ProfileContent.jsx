import { PenLine } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { useUserStore } from "@/Stores/useUserStore";
import { usePostStore } from "@/Stores/usePostStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PostCard } from "./PostCard";

export const ProfileContent = () => {
  const { getProfile, isLoading } = useUserStore();
  const { deletePostById } = usePostStore();

  const [error, setError] = useState(null);
  
  const [userPosts, setUserPosts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  const fetchProfile = useCallback(async () => {
    try {
      const response = await getProfile();
      localStorage.setItem("profile", JSON.stringify(response));
      setUserPosts(response.posts || []);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
      setError("Unable to load profile. Please try again later.");
    }
  }, [getProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleDelete = async () => {
    try {
      if (postIdToDelete) {
        await deletePostById(postIdToDelete);
        fetchProfile();
        setOpenDialog(false);
      }
    } catch (err) {
      setError("Failed to delete post. Please try again later.");
      console.error("Error deleting post:", err);
    }
  };

  const openDeleteDialog = (id) => {
    setPostIdToDelete(id);
    setOpenDialog(true);
  };

  const parsedUser = JSON.parse(localStorage.getItem("profile")) || {};
  const posts = parsedUser.posts || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-zinc-400">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-16 text-zinc-400">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this post?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
          <div className="space-y-6">
            <Link to="/create">
              <Button className="w-fit bg-gradient-to-r from-zinc-500 to-zinc-700 hover:from-zinc-700 hover:to-zinc-600 border border-zinc-700/50 shadow-lg">
                <PenLine className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.reverse().map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onDeleteClick={openDeleteDialog}
                />
              ))}
            </div>

            {posts.length === 0 && (
              <div className="flex items-center justify-center py-16 text-zinc-400">
                <h3 className="font-semibold text-2xl">No posts yet</h3>
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="media" className="mt-6">
          <div className="grid grid-cols-4 gap-4 justify-items-center cursor-pointer">
            {userPosts.map(
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
            )}
          </div>
          {userPosts.length === 0 && (
            <div className="flex items-center justify-center py-16 text-zinc-400">
              <h3 className="font-semibold text-2xl ">No Media</h3>
            </div>
          )}
        </TabsContent>

        <TabsContent value="likes" className="mt-6">
          <div className="grid gap-6">
            <h3 className="text-xl text-zinc-300 font-semibold">
              Liked Posts:
            </h3>
            {userPosts.length === 0 && (
              <div className="flex items-center justify-center py-16 text-zinc-400">
                <h3 className="font-semibold text-2xl ">No Likes</h3>
              </div>
            )}
          </div>
        </TabsContent>
        {/* Media and Likes tabs remain the same */}
      </Tabs>
    </div>
  );
};