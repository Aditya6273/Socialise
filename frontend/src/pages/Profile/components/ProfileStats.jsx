import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export const ProfileStats = ({ following, followers }) => {
  return (
    <div className="flex gap-6">
      <Link to={"/show-bonds"}>
        <Button variant="ghost" className="hover:bg-zinc-800">
          <span className="font-bold text-white mr-1">{followers || 0}</span>
          <span className="text-zinc-400">Bonded</span>
        </Button>
      </Link>
      <Link to={"/show-bonds"}>
        <Button variant="ghost" className="hover:bg-zinc-800">
          <span className="font-bold text-white mr-1">{following || 0}</span>
          <span className="text-zinc-400">Bondings</span>
        </Button>
      </Link>
    </div>
  );
};
