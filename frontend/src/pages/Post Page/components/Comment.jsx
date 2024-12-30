/* eslint-disable react/prop-types */
import { Calendar } from 'lucide-react';


const Comment = ({ comment }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex gap-4 p-4 bg-zinc-800/50 rounded-lg">
      <img
        src={comment.userId.profilePic || '/default_profile_pic.jpeg'}
        alt={`${comment.userId.firstName} ${comment.userId.lastName}`}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-medium text-gray-100">
            {comment.userId.firstName} {comment.userId.lastName}
          </h4>
          <span className="text-sm text-gray-400 flex items-center">
            <Calendar className="w-3 h-3 mr-1" />
            {formatDate(comment.createdAt)}
          </span>
        </div>
        <p className="text-gray-300">{comment.content}</p>
      </div>
    </div>
  );
};

export default Comment;