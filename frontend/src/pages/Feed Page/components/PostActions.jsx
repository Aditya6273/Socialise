/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Heart, MessageCircle, Repeat2, Share2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { usePostStore } from "@/Stores/usePostStore";

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
  const [comment, setComment] = useState(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false); 
  const [localComments, setLocalComments] = useState([]); // To manage comments locally

  const { postComment, comments, isLoading } = usePostStore(); // Assuming `usePostStore` returns postComment function

  const handleCommentSubmit = async () => {
    if (isSubmitting || !comment.trim()) return; 
    setIsSubmitting(true);

    try {
      // Call postComment to post the comment
      const newComment = await postComment(postId, { text: comment });

      // Update the local comments state
      setLocalComments([newComment, ...localComments]);
      setComment(""); // Reset the comment input
      setIsDialogOpen(false); // Close the dialog
    } catch (error) {
      console.error("Error posting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-between pt-3 text-zinc-400">
      <ActionButton
        icon={MessageCircle}
        count={commentCount}
        hoverColor="blue" // Blue hover effect
        onClick={() => setIsDialogOpen(true)} // Open the comment input dialog
      />
      <ActionButton
        icon={Repeat2}
        count={0}
        hoverColor="green" // Green hover effect
      />
      <ActionButton
        icon={Heart}
        count={likeCount}
        hoverColor="red" // Red hover effect
      />
      <ActionButton
        icon={Share2}
        hoverColor="purple" // Purple hover effect
      />
      <Link
        to={`/post/${postId}`}
        className="flex items-center space-x-2 hover:text-blue-400 transition group"
      >
        <ExternalLink className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-sm">Visit</span>
      </Link>

      {/* Comment dialog box */}
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
          <div className="p-6 rounded-lg max-w-md w-full bg-zinc-800">
            <h2 className="text-xl font-semibold mb-4">Write a Comment</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="p-2 border border-zinc-600 rounded-md bg-transparent text-gray-100 w-full h-32 mb-4"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsDialogOpen(false)} // Close the dialog
                className="px-4 py-2 bg-zinc-500 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleCommentSubmit}
                disabled={isSubmitting || !comment.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-zinc-600"
              >
                {isSubmitting ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
