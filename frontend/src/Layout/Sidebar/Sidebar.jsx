
import { ChevronLeft, Box } from "lucide-react";

import { cn } from "../../lib/utils";
import { sidebarConfig } from "../config/SidebarConfig";
import SidebarItem from "../components/SidebarItem";
import UserProfile from "../components/UserProfile";
import Login from "../components/Login";
import { Link } from "react-router-dom";

export default function Sidebar() {
 
    const user = localStorage.getItem('user');
    const parsedUser = JSON.parse(user);

  return (
    <aside
      className={cn(
        "bg-[#1a1a1a] w-[256px] text-white flex flex-col flex-shrink-0 relative group/sidebar",
       
        "transition-all duration-300 ease-in-out"
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "p-4 flex items-center gap-4 flex-shrink-0",
          
        )}
      >
        <div className="min-w-[32px] h-[32px] bg-blue-600 rounded-lg flex items-center justify-center">
          <Box className="w-5 h-5" />
        </div>
        <div
          className={cn(
            "flex-1 overflow-hidden transition-all duration-300",
           
            "group-hover/sidebar:w-auto group-hover/sidebar:opacity-100"
          )}
        >
          <Link to={"/"} className="font-semibold truncate">Socialise</Link>
          <p className="text-xs text-gray-400 truncate"> By @adityashah2701</p>
        </div>
        <button
   
          className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
        >
           <ChevronLeft size={20} /> 
        </button>
      </div>

      {/* Platform Label */}
      <div
        className={cn(
          "px-4 py-2 flex-shrink-0 transition-opacity duration-300",
          
          "group-hover/sidebar:opacity-100"
        )}
      >
        <p className="text-sm font-medium text-gray-400">Platform</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-hidden">
        <div
          className={cn(
            "flex flex-col",
           
          )}
        >
          {sidebarConfig.map((item) => (
            <SidebarItem key={item.title} path={item.path} {...item}  />
          ))}
        </div>
      </nav>

      {/* User Profile */}
     {parsedUser && <Link ><UserProfile /></Link>}
     {!parsedUser && <Login />}
    </aside>
  );
}
