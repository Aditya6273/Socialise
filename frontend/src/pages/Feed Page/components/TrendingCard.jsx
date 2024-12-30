/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import Markdown from "react-markdown";
export function TrendingCard({ post }) {
  return (
    <Link
      to={`/post/${post._id}`}
      className="group block p-4 hover:bg-zinc-800/50 transition-colors rounded-lg"
    >
      <div className="flex space-x-4">
        <div className="flex-1 min-w-0">
          {" "}
          
          <div className="font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors truncate">
            <Markdown>{post.title}</Markdown>
          </div>
          <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
            {" "}
           
            {post.description?.length > 200
              ? `${post.description.slice(0, 200)}...`
              : post.descriptions}
          </p>
        </div>
        {post.image && (
          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 group-hover:bg-blue-500/10 transition-colors" />
          </div>
        )}
      </div>
    </Link>
  );
}
