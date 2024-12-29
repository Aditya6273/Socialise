/* eslint-disable react/prop-types */
import { Heart, MessageCircle, Repeat2, Share2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

function ActionButton({ icon: Icon, count, onClick, hoverColor = "blue" }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center space-x-2 hover:text-${hoverColor}-400 transition group`}
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
        hoverColor="blue"
      />
      <ActionButton 
        icon={Repeat2} 
        count={0} 
        hoverColor="green"
      />
      <ActionButton 
        icon={Heart} 
        count={likeCount} 
        hoverColor="red"
      />
      <ActionButton 
        icon={Share2} 
        hoverColor="blue"
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