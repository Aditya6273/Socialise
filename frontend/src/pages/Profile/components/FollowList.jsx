/* eslint-disable react/prop-types */
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"


export function FollowList({ type }) {
  const users = [
    { id: 1, name: "Alice Johnson", username: "@alice", avatar: "/avatar-1.jpg" },
    { id: 2, name: "Bob Smith", username: "@bob", avatar: "/avatar-2.jpg" },
    { id: 3, name: "Charlie Brown", username: "@charlie", avatar: "/avatar-3.jpg" },
  ]

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <Card key={user.id} className="bg-white dark:bg-zinc-800 border-none">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{user.username}</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                {type === "following" ? "Unfollow" : "Follow"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

