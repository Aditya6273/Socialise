/* eslint-disable react/prop-types */
import ReactMarkdown from "react-markdown";
import { useState } from "react";

export function PostContent({ title, description, image }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="space-y-3">
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{title}</ReactMarkdown>
      </div>
      
      <div className={`prose prose-invert prose-sm max-w-none ${!isExpanded && "line-clamp-3"}`}>
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
      
      {description.length > 200 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}

      {image && (
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <img
            src={image}
            alt="Post content"
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
    </div>
  );
}