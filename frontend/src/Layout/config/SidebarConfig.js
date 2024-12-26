import { Layout, Settings, Database, Users, MessageSquare, Bell, TrendingUp, User2, PlusCircleIcon, Pen } from 'lucide-react';



export const sidebarConfig = [
  {
    title: 'Playground',
    icon: Layout,
    submenu: [
      { title: 'Create Post', icon: PlusCircleIcon, path: "/create" },
      { title: 'Edit Profile', icon: Pen ,  path: "/profile/update" },
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
      { title: 'Notifications', icon: Bell ,path: "/notifications" },
      { title: 'Bonds', icon: Users , path: "/bonds" },
    ]
  },
  {
    title: 'Accounts',
    icon: Settings,
    submenu: [
      { title: 'Profile', icon: Users , path: "/profile" },
      { title: 'Settings', icon: Settings , path: "/settings" },
    ]
  }
];