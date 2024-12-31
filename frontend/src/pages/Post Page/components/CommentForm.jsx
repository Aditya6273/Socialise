/* eslint-disable react/prop-types */
import { Send } from "lucide-react";

export const CommentForm = ({
  user,
  commentContent,
  isSubmitting,
  onCommentChange,
  onSubmit,
}) => {
  if (!user) {
    return (
      <div className="bg-zinc-800 rounded-lg p-8 text-center mb-8">
        <p className="text-gray-300 mb-4">Join the discussion</p>
        <a
          href="/login"
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
        >
          Log in to comment
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mb-8">
      <div className="flex items-start space-x-4">
        <img
          src={user.profilePic || "/default_profile_pic.jpeg"}
          alt="Your profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700"
        />
        <div className="flex-1 relative">
          <textarea
            value={commentContent}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full bg-zinc-800 text-gray-100 rounded-lg p-4 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !commentContent.trim()}
            className="absolute bottom-4 right-4 inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </form>
  );
};
