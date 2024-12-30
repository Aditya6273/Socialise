import { usePostStore } from "@/Stores/usePostStore";
import {
  Calendar,
  Send,
  Share2,
  MessageCircle,
  Heart,
  Trash2,
  Loader2,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getPostById,
    deletePostById,
    postComment,
    getCommentsOfPost,
    isLoading,
    isError,
    error,
  } = usePostStore();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [visibleComments, setVisibleComments] = useState(3);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isOwner = user?._id === post?.userId._id;

  const fetchPost = useCallback(async () => {
    if (!id) return;
    try {
      const res = await getPostById(id);
      setPost(res);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  }, [getPostById, id]);

  const fetchComments = useCallback(async () => {
    if (!id) return;
    setCommentsLoading(true);
    try {
      const comments = await getCommentsOfPost(id);
      setComments(comments);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setCommentsLoading(false);
    }
  }, [getCommentsOfPost, id]);

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id, fetchPost, fetchComments]);

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

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }

    if (!commentContent.trim()) return;

    setIsSubmittingComment(true);
    try {
      await postComment(id, { text: commentContent });
      await fetchComments();
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const loadMoreComments = () => {
    setVisibleComments((prev) => Math.min(prev + 3, comments.length));
  };

  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
    return formatDate(dateString);
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

  return (
    <div className="min-h-screen bg-transparent sm:py-8 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 text-white rounded-xl shadow-sm overflow-hidden">
          {post.image && (
            <div className="relative h-[400px] sm:h-[500px]">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src={post.userId?.profilePic || "/default_profile_pic.jpeg"}
                  alt={`${post.userId.firstName} ${post.userId.lastName}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-zinc-700"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-100">
                    {post.userId.firstName} {post.userId.lastName}
                  </h3>
                  <div className="flex items-center text-sm text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </div>
              {isOwner && (
                <button
                  onClick={() => setShowModal(true)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-zinc-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="prose prose-invert mb-6 max-w-none">
              <ReactMarkdown className="text-gray-100 text-2xl font-bold leading-tight mb-4">
                {post.title}
              </ReactMarkdown>
              <ReactMarkdown className="text-gray-300 leading-relaxed">
                {post.description}
              </ReactMarkdown>
            </div>

            <div className="flex items-center space-x-6 pt-6 border-t border-zinc-800">
              <button className="flex items-center text-gray-300 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5 mr-2" />
                <span>{post.likes?.length || 0} Likes</span>
              </button>
              <button className="flex items-center text-gray-300 hover:text-blue-500 transition-colors">
                <MessageCircle className="w-5 h-5 mr-2" />
                <span>{comments.length} Comments</span>
              </button>
              <button className="flex items-center text-gray-300 hover:text-green-500 transition-colors">
                <Share2 className="w-5 h-5 mr-2" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-zinc-900 rounded-xl shadow-sm overflow-hidden">
          <button
            onClick={toggleComments}
            className="w-full p-6 flex items-center justify-between text-gray-100 hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5" />
              <h2 className="text-xl font-bold">
                Discussion ({comments.length})
              </h2>
            </div>
            {showComments ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showComments && (
            <div className="p-6 sm:p-8 border-t border-zinc-800">
              {user ? (
                <form onSubmit={handleCommentSubmit} className="mb-8">
                  <div className="flex items-start space-x-4">
                    <img
                      src={user.profilePic || "/default_profile_pic.jpeg"}
                      alt="Your profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700"
                    />
                    <div className="flex-1 relative">
                      <textarea
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="What are your thoughts?"
                        className="w-full bg-zinc-800 text-gray-100 rounded-lg p-4 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
                        disabled={isSubmittingComment}
                      />
                      <button
                        type="submit"
                        disabled={isSubmittingComment || !commentContent.trim()}
                        className="absolute bottom-4 right-4 inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        {isSubmittingComment ? "Posting..." : "Post"}
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                <div className="bg-zinc-800 rounded-lg p-8 text-center mb-8">
                  <p className="text-gray-300 mb-4">Join the discussion</p>
                  <a
                    href="/login"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-500 transition-colors"
                  >
                    Log in to comment
                  </a>
                </div>
              )}

              {commentsLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="animate-spin w-8 h-8 text-zinc-500" />
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-6">
                  {comments
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                    )
                    .slice(0, visibleComments) // Display the number of comments based on `visibleComments`
                    .map((comment) => (
                      <div
                        key={comment._id}
                        className="group animate-fadeIn transition-all duration-200 ease-in-out"
                      >
                        <div className="flex items-start space-x-4">
                          <img
                            src={
                              comment.user?.profilePic ||
                              "/default_profile_pic.jpeg"
                            }
                            alt={`${comment.user.firstName} ${comment.user.lastName}`}
                            className="w-10 h-10 rounded-full object-cover border-2 border-zinc-700"
                          />
                          <div className="flex-1">
                            <div className="bg-zinc-800 p-4 rounded-lg">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h3 className="text-gray-200 font-medium">
                                    {comment.user.firstName}{" "}
                                    {comment.user.lastName}
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
                      onClick={loadMoreComments}
                      className="w-full py-3 px-4 bg-zinc-800 text-blue-500 rounded-lg hover:bg-zinc-700 transition-colors font-medium text-sm"
                    >
                      Read More
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-zinc-900 rounded-lg p-6 max-w-sm w-full border border-zinc-800">
            <h3 className="text-lg font-semibold mb-4 text-gray-100">
              Are you sure you want to delete this post?
            </h3>
            {deleteError && (
              <p className="text-red-500 text-sm mb-4">{deleteError}</p>
            )}
            <div className="flex space-x-4">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-zinc-800 text-gray-300 px-4 py-2 rounded-lg hover:bg-zinc-700 transition-colors"
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
