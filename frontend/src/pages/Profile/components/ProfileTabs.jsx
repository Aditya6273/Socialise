"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { PlusCircle } from 'lucide-react'
import { PostsList } from "./PostList"
import { FollowList } from "./FollowList"

export function ProfileTabs() {
  return (
    <Tabs defaultValue="posts" className="space-y-4 ">
      <div className="flex items-center justify-between ">
        <TabsList className="bg-zinc-200 dark:bg-zinc-700">
          <TabsTrigger value="posts" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800">Posts</TabsTrigger>
          <TabsTrigger value="following" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800">Following</TabsTrigger>
          <TabsTrigger value="followers" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800">Followers</TabsTrigger>
        </TabsList>
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Post
        </Button>
      </div>
      <TabsContent value="posts">
        <PostsList />
      </TabsContent>
      <TabsContent value="following">
        <Card className="bg-white dark:bg-zinc-800">
          <CardContent className="p-6">
            <FollowList type="following" />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="followers">
        <Card className="bg-white dark:bg-zinc-800 border-none">
          <CardContent className="p-6">
            <FollowList type="followers" />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

