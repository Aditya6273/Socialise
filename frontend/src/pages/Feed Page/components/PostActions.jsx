/* eslint-disable react/prop-types */
import { Heart, MessageCircle, Repeat2, Share2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";


// Mapping for hover colors
const hoverColors = {
  blue: "hover:text-blue-400",
  green: "hover:text-green-400",
  red: "hover:text-red-400",
  purple: "hover:text-purple-400",
};

function ActionButton({ icon: Icon, count, onClick, hoverColor }) {
  // Get the hover class for the color
  const hoverClass = hoverColors[hoverColor] || "hover:text-blue-400"; // Default to blue if color not found

  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 ${hoverClass} transition group`}
    >
      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
      {count !== undefined && <span>{count}</span>}
    </button>
  );
}

export function PostActions({ postId, commentCount, likeCount }) {
  return (
    <div className="flex items-center justify-between pt-3 text-zinc-400">
      <ActionButton
        icon={MessageCircle}
        count={commentCount}
        hoverColor="blue"  // Blue hover effect
      />
      <ActionButton
        icon={Repeat2}
        count={0}
        hoverColor="green"  // Green hover effect
      />
      <ActionButton
        icon={Heart}
        count={likeCount}
        hoverColor="red"  // Red hover effect
      />
      <ActionButton
        icon={Share2}
        hoverColor="purple"  // Purple hover effect
      />
      <Link
        to={`/post/${postId}`}
        className="flex items-center space-x-2 hover:text-blue-400 transition group"
      >
        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-sm">Visit</span>
      </Link>
    </div>
  );
}
