import { Button } from "@/components/ui/button";



// eslint-disable-next-line react/prop-types
export const ProfileStats = ({ following, followers }) => {
  return (
    <div className="flex gap-6">
      <Button variant="ghost" className="hover:bg-zinc-800">
        <span className="font-bold text-white mr-1">{following}</span>
        <span className="text-zinc-400">Following</span>
      </Button>
      <Button variant="ghost" className="hover:bg-zinc-800">
        <span className="font-bold text-white mr-1">{followers}</span>
        <span className="text-zinc-400">Followers</span>
      </Button>
    </div>
  );
};