import { usePostStore } from "@/Stores/usePostStore";
import { PostCard } from "./components/PostCard";
import { TrendingCard } from "./components/TrendingCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallback, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";


const shuffleArray = (array) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

function Feed() {
  const [fetchedPosts, setFetchedPosts] = useState([]);
  const [bondingPosts, setBondingPosts] = useState([]);
  const { getAllPosts, isLoading, getBondingsPosts } = usePostStore();

  const fetch = useCallback(async () => {
    try {
      const res = await getAllPosts();
      const bondingRes = await getBondingsPosts();
      setFetchedPosts(shuffleArray(res));
      setBondingPosts(shuffleArray(bondingRes));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [getAllPosts, getBondingsPosts]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen w-full">
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section - Feed */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="w-full bg-zinc-800/50">
                <TabsTrigger value="trending" className="flex-1">
                  Trending
                </TabsTrigger>
                <TabsTrigger value="bonding" className="flex-1">
                  Bonding
                </TabsTrigger>
              </TabsList>
              <TabsContent value="trending">
                <div className="space-y-1 bg-zinc-800/30 rounded-lg">
                  {fetchedPosts.map((post, index) => (
                    <PostCard key={index} post={post} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="bonding">
                <div className="space-y-1 bg-zinc-800/30 rounded-lg">
                  {bondingPosts.length > 0 ? (
                    bondingPosts.map((post, index) => (
                      <PostCard key={index} post={post} />
                    ))
                  ) : (
                    <div className="flex justify-center items-center min-h-[200px]">
                      <p className="text-center text-2xl my-auto">
                        No bonding posts found. Make a bond with someone to see
                        posts here!
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1 fixed top-10 max-w-sm right-10">
            <div className="bg-zinc-800/30 rounded-lg overflow-hidden">
              <h2 className="text-lg font-semibold p-4 border-b border-zinc-700">
                Trending Articles
              </h2>
              <div className="divide-y divide-zinc-700">
                {fetchedPosts.slice(0, 3).map((post, index) => (
                  <TrendingCard key={index} post={post} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
