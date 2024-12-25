import { Layout, Settings, Database, Users, MessageSquare, Bell, ThumbsUp, TrendingUp, User2, PlusCircleIcon } from 'lucide-react';



export const sidebarConfig = [
  {
    title: 'Playground',
    icon: Layout,
    submenu: [
      { title: 'Liked Posts', icon: ThumbsUp ,  path: "/liked" },
      { title: 'Create', icon: PlusCircleIcon, path: "/create" },
      { title: 'Settings', icon: Settings , path: "/settings" },
    ]
  },
  {
    title: 'Feed',
    icon: Database,
    submenu: [
      { title: 'Followed', icon: User2 , path: "/followed" },
      { title: 'Trending', icon: TrendingUp , path: "/trending"}
    ]
  },
  {
    title: 'Community',
    icon: Users,
    submenu: [
      { title: 'Chat', icon: MessageSquare ,path: '/chat' },
      { title: 'Notifications', icon: Bell ,path: "/notifications" }
    ]
  },
  {
    title: 'Settings',
    icon: Settings,
    submenu: [
      { title: 'Profile', icon: Users , path: "/profile" },
      { title: 'Preferences', icon: Settings , path: "/settings" },
    ]
  }
];