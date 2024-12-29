/* eslint-disable react/prop-types */

import { Heart, MessageCircle, Repeat2, Share } from 'lucide-react';



export function FeedPost({ username, avatar, content, timestamp, likes, comments, shares }) {
  return (
    <div className="bg-white rounded-xl p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-3">
        <img src={avatar} alt={username} className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold">{username}</h3>
            <span className="text-gray-500 text-sm">· {timestamp}</span>
          </div>
          <p className="mt-2 text-gray-800">{content}</p>
          <div className="flex items-center justify-between mt-4 text-gray-500">
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <MessageCircle size={20} />
              <span>{comments}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-500">
              <Repeat2 size={20} />
              <span>{shares}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-red-500">
              <Heart size={20} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-blue-500">
              <Share size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}