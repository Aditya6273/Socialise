import { LogOut } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/Stores/useUserStore";

export default function UserProfile() {
  const user = localStorage.getItem("user");
  const parsedUser = JSON.parse(user);
  console.log(parsedUser);
  const name = parsedUser?.firstName + " " + parsedUser?.lastName;
  const pic = parsedUser?.profilePic;
  const { logout } = useUserStore();
  const handleClick = async () => {
    await logout();
    window.location.reload();
  };
  return (
    <div className={cn("border-t border-white/10 p-4 flex items-center gap-4")}>
      <img
        src={`http://localhost:3000/${pic}`}
        alt="Profile"
        className="w-8 h-8 rounded-full"
      />
      <div className={cn("flex-1 transition-opacity")}>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-400">{parsedUser.email}</p>
      </div>
      <Button
        onClick={handleClick}
        variant="outline"
        size="sm"
        className="text-center bg-transparent hover:text-red-500 text-white rounded-md transition"
      >
        <LogOut className=" " size={20} />
      </Button>
    </div>
  );
}
