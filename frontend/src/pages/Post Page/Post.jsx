import { usePostStore } from "@/Stores/usePostStore";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Calendar,
  Heart,
  Loader2,
  MessageCircle,
  Share2,
  Trash2,
} from "lucide-react"; // Import Trash2
import ReactMarkdown from "react-markdown"; // Importing ReactMarkdown

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Assuming navigate is defined
  const { getPostById, deletePostById, isLoading, isError, error } =
    usePostStore(); // Assuming deletePost is defined
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false); // State for showing the modal
  const [deleteError, setDeleteError] = useState(null); // State for delete error

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res);
      } catch (err) {
        console.error("Error fetching post:", err);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, getPostById]);

  const handleDelete = async () => {
    try {
      await deletePostById(id); // Call the delete function
      setShowModal(false);
      navigate("/profile"); // Navigate to the root route after deletion
    } catch (err) {
      setDeleteError("Failed to delete the post. Please try again later."); // Set the delete error state
      console.error("Error deleting post:", err);
    }
  };

  const handleCancel = () => {
    setShowModal(false); // Close the modal if the user cancels
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin size-20 text-zinc-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-6 rounded-lg">
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No post found</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-transparent sm:py-8 smpx-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-zinc-900 text-white rounded-xl shadow-sm overflow-hidden">
          {/* Hero Image */}
          {post.image && (
            <div className="relative h-[400px] sm:h-[600px]">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          )}

          {/* Content */}
          <div className="p-6 sm:p-8 w-full">
            {/* Author Info */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                <img
                  src={post.userId.profilePic}
                  alt={`${post.userId.firstName} ${post.userId.lastName}`}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-100">
                    {post.userId.firstName} {post.userId.lastName}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </div>
              {/* Delete Button */}
              <button
                onClick={() => setShowModal(true)} // Open the modal
                className="ml-auto text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Delete post"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>

            {/* Title and Description */}
            <div className="prose prose-invert mb-4 max-w-[60rem]">
              <ReactMarkdown className="w-full text-gray-200 sm:text-2xl font-bold leading-none">
                {post.title}
              </ReactMarkdown>
            </div>

            <ReactMarkdown className="prose prose-invert max-w-none prose-headings:text-gray-100 prose-a:text-blue-500 hover:prose-a:underline prose-strong:text-gray-200 prose-em:text-gray-300 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-gray-400 prose-code:rounded-md prose-code:bg-zinc-800 prose-code:p-1 prose-code:text-green-400">
              {post.description}
            </ReactMarkdown>

            {/* Interaction Buttons */}
            <div className="flex items-center space-x-6 pt-6">
              <button className="flex items-center text-gray-300 hover:text-red-500 transition-colors">
                <Heart className="w-6 h-6 mr-2" />
                <span>{post.likes.length} Likes</span>
              </button>
              <button className="flex items-center text-gray-300 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-6 h-6 mr-2" />
                <span>{post.comments.length} Comments</span>
              </button>
              <button className="flex items-center text-gray-300 hover:text-green-500 transition-colors">
                <Share2 className="w-6 h-6 mr-2" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section - Placeholder */}
        <div className="mt-8 bg-zinc-900 rounded-xl shadow-sm p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-100 mb-6">Comments</h2>
          {post.comments.length === 0 ? (
            <p className="text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          ) : (
            <div className="space-y-6">
              {/* Comments will be rendered here */}
            </div>
          )}
        </div>
      </div>

      {/* Modal for Delete Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-zinc-950 rounded-lg p-6 w-1/4 h-40 flex flex-col justify-between">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">
              Are you sure you want to delete this post?
            </h2>
            {deleteError && (
              <div className="text-red-500 text-sm mb-2">{deleteError}</div> // Display the error message
            )}
            <div className="flex flex-row-reverse justify-start gap-2">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
