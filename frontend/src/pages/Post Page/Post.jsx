import { usePostStore } from "@/Stores/usePostStore";
import { Calendar, Heart, Loader2, MessageCircle, Share2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPostById, deletePostById, isLoading, isError, error } = usePostStore();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

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

  // Get user data and check ownership
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isOwner = user?._id === post?.userId._id;

  const handleDelete = async () => {
    try {
      await deletePostById(id);
      setShowModal(false);
      navigate("/profile");
    } catch (err) {
      setDeleteError("Failed to delete the post. Please try again later.");
      console.error("Error deleting post:", err);
    }
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
    <div className="min-h-screen bg-transparent sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-zinc-900 text-white rounded-xl shadow-sm overflow-hidden">
          {post.image && (
            <div className="relative h-[400px] sm:h-[600px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-8 w-full">
            <div className="flex items-center mb-6">
              <div className="flex items-center flex-1">
                <img
                  src={post.userId.profilePic || '/default_profile_pic.jpeg'}
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
              {isOwner && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete post"
                >
                  <Trash2 className="w-6 h-6" />
                </button>
              )}
            </div>

            <div className="prose prose-invert mb-4 max-w-[60rem]">
              <ReactMarkdown className="w-full text-gray-200 sm:text-2xl font-bold leading-none">
                {post.title}
              </ReactMarkdown>
            </div>

            <ReactMarkdown className="prose prose-invert max-w-none prose-headings:text-gray-100 prose-a:text-blue-500 hover:prose-a:underline prose-strong:text-gray-200 prose-em:text-gray-300 prose-ul:list-disc prose-ol:list-decimal prose-blockquote:border-l-4 prose-blockquote:pl-4 prose-blockquote:text-gray-400 prose-code:rounded-md prose-code:bg-zinc-800 prose-code:p-1 prose-code:text-green-400">
              {post.description}
            </ReactMarkdown>

            <div className="flex items-center space-x-6 pt-6 text-sm">
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

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-zinc-950 rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold text-gray-300 mb-4">
              Are you sure you want to delete this post?
            </h2>
            {deleteError && (
              <div className="text-red-500 text-sm mb-4">{deleteError}</div>
            )}
            <div className="flex flex-row-reverse justify-start gap-2">
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500 transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors"
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