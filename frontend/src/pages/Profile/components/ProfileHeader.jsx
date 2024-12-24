import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Link } from "react-router-dom";

export function ProfileHeader() {
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);
  return (
    <Card className="mb-8 bg-white dark:bg-zinc-800 border-none">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={"http://localhost:3000/" + parsedUser.profilePic} className="h-24 w-24" alt="User Name" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">{parsedUser.firstName + " " + parsedUser.lastName}</h1>
            <p className="text-muted-foreground">@{parsedUser.username}</p>
          </div>
          <div className="flex-grow" />
          <Link to="/edit-profile" ><Button variant="secondary" className="bg-zinc-900 hover:bg-zinc-950">Edit Profile</Button></Link>
        </div>
        <p className="mt-4 text-center md:text-left">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <div className="mt-4 flex justify-center space-x-4 md:justify-start">
          <div className="text-center">
            <p className="font-semibold">1,234</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">5,678</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-semibold">42</p>
            <p className="text-sm text-muted-foreground">Posts</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

