/* eslint-disable react/prop-types */
import { Calendar, Trash2 } from 'lucide-react';



export const PostHeader = ({
  profilePic,
  firstName,
  lastName,
  createdAt,
  isOwner,
  onDeleteClick,
}) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <img
          src={profilePic || "/default_profile_pic.jpeg"}
          alt={`${firstName} ${lastName}`}
          className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700"
        />
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-100">
            {firstName} {lastName}
          </h3>
          <div className="flex items-center text-sm text-gray-400">
            <Calendar className="w-4 h-4 mr-1" />
            {formatDate(createdAt)}
          </div>
        </div>
      </div>
      {isOwner && (
        <button
          onClick={onDeleteClick}
          className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-zinc-800"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};