import { Layout, Settings, Database, Users, MessageSquare, Bell, PlusCircleIcon, Pen, StickyNote } from 'lucide-react';



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
    title: 'Posts',
    icon: Database,
    submenu: [
      { title: 'Feed', icon: StickyNote , path: "/feed" },
    ]
  },
  {
    title: 'Community',
    icon: Users,
    submenu: [
      { title: 'Chat', icon: MessageSquare ,path: '/chat' },
      { title: 'Notifications', icon: Bell ,path: "/notifications" },
      { title: 'Make Bonds', icon: Users , path: "/make-bonds" },
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