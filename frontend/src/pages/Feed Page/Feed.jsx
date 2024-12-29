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
  
  const trendingArticles = [
    {
      title: "The Future of AI Development",
      description:
        "New breakthroughs in machine learning are changing how we code",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=150",
      link: "#",
    },
    {
      title: "Web Development Trends 2024",
      description: "Top frameworks and tools developers are using this year",
      imageUrl:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=150",
      link: "#",
    },
    {
      title: "The Rise of Edge Computing",
      description: "How edge computing is revolutionizing web performance",
      imageUrl:
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=150",
      link: "#",
    },
  ];

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


  useEffect(() => {
    console.log(bondingPosts);
  }, [bondingPosts]);

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
                        No bonding posts found. Make a bond with someone to see posts here!
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

         
          <div className="lg:col-span-1">
            <div className="bg-zinc-800/30 rounded-lg overflow-hidden">
              <h2 className="text-lg font-semibold p-4 border-b border-zinc-700">
                Trending Articles
              </h2>
              <div className="divide-y divide-zinc-700">
                {trendingArticles.map((article, index) => (
                  <TrendingCard key={index} {...article} />
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
