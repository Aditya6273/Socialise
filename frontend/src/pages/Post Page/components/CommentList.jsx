/* eslint-disable react/prop-types */
import { MessageCircle, ThumbsUp, Loader2 } from 'lucide-react';



export const CommentList = ({
  comments,
  visibleComments,
  isLoading,
  onLoadMore,
}) => {
  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const past = new Date(dateString);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="animate-spin w-8 h-8 text-zinc-500" />
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
        <p className="text-gray-400">
          No comments yet. Be the first to share your thoughts!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, visibleComments)
        .map((comment) => (
          <div
            key={comment._id}
            className="group animate-fadeIn transition-all duration-200 ease-in-out"
          >
            <div className="flex items-start space-x-4">
              <img
                src={comment.user?.profilePic || "/default_profile_pic.jpeg"}
                alt={`${comment.user.firstName} ${comment.user.lastName}`}
                className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700"
              />
              <div className="flex-1">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="text-gray-200 font-medium">
                        {comment.user.firstName} {comment.user.lastName}
                      </h3>
                      <span className="text-gray-500 text-sm">
                        {formatTimeAgo(comment.createdAt)}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                    {comment.text}
                  </p>
                </div>
                <div className="flex items-center gap-6 mt-2 px-2">
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors text-sm">
                    <ThumbsUp className="w-4 h-4" />
                    Like
                  </button>
                  <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors text-sm">
                    <MessageCircle className="w-4 h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

      {visibleComments < comments.length && (
        <button
          onClick={onLoadMore}
          className="w-full py-3 px-4 bg-zinc-800 text-blue-500 rounded-lg hover:bg-zinc-700 transition-colors font-medium text-sm"
        >
          Read More
        </button>
      )}
    </div>
  );
};