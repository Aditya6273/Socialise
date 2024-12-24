
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2 } from 'lucide-react'


export function PostsList() {
  const posts = [
    { 
      id: 1, 
      content: "Just launched my new project! Check it out and let me know what you think. #NewProject #Excited", 
      likes: 42, 
      comments: 7,
      timestamp: "2h ago",
      image: "/placeholder.svg?height=300&width=400"
    },
    { 
      id: 2, 
      content: "Enjoying a beautiful sunset after a productive day of coding. Sometimes you need to step back and appreciate the little things. 🌅 #CodingLife #Sunset", 
      likes: 89, 
      comments: 13,
      timestamp: "5h ago",
      image: "/placeholder.svg?height=300&width=400"
    },
    { 
      id: 3, 
      content: "Just solved a tricky bug that's been bothering me for days. The feeling of finally figuring it out is unmatched! 💪 #ProgrammingWins #BugSquashed", 
      likes: 65, 
      comments: 9,
      timestamp: "1d ago"
    },
  ]
  const user = localStorage.getItem('user');
  const parsedUser = JSON.parse(user);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="bg-white dark:bg-zinc-800 shadow-lg border-none">
          <CardHeader className="flex flex-row items-center space-x-4 pb-4">
            <Avatar>
              <AvatarImage src={"http://localhost:3000/" + parsedUser.profilePic} alt="User Name" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{parsedUser.firstName + " " + parsedUser.lastName}</p>
            <div className="flex gap-5">  <p className="font-normal text-xs text-gray-500 ">{parsedUser.email}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{post.timestamp}</p></div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm md:text-base">{post.content}</p>
            {post.image && (
              <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden">
                <img
                  src={post.image}
                  alt="Post image"
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" size="sm" className="text-red-500 dark:text-red-400">
              <Heart className="mr-1 h-4 w-4" />
              {post.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-1 h-4 w-4" />
              {post.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="mr-1 h-4 w-4" />
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

