/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loader2, MessageCircle } from "lucide-react";

import { usePost } from "./hooks/usePost";
import { useComments } from "./hooks/useComments";
import { useLikes } from "./hooks/useLikes";
import { PostHeader } from "./components/PostHeader";
import { PostContent } from "./components/PostContent";
import { PostActions } from "./components/PostActions";
import { CommentsSection } from "./components/CommentSection";
import { DeleteModal } from "./components/DeleteModal";

const Post = () => {
  const { id } = useParams();
  const {
    post,
    user,
    isOwner,
    isLoading,
    isError,
    error,
    showModal,
    deleteError,
    setShowModal,
    fetchPost,
    handleDelete,
  } = usePost(id);

  const {
    likes,
    hasLiked,
    handleLikeUnlike,
    likesCount,
    likesLoading
  } = useLikes(id, post?.likes || []);

  const {
    comments,
    commentsLoading,
    isSubmittingComment,
    commentContent,
    showComments,
    visibleComments,
    setCommentContent,
    fetchComments,
    handleCommentSubmit,
    loadMoreComments,
    toggleComments,
  } = useComments(id);

  useEffect(() => {
    if (id) {
      fetchPost();
      fetchComments();
    }
  }, [id, fetchPost, fetchComments]);

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
          <div className="p-6 sm:p-8">
            <PostHeader
              profilePic={post.userId.profilePic}
              firstName={post.userId.firstName}
              lastName={post.userId.lastName}
              createdAt={post.createdAt}
              isOwner={isOwner}
              onDeleteClick={() => setShowModal(true)}
            />

            <PostContent
              image={post.image}
              title={post.title}
              description={post.description}
            />

            <PostActions
              likesCount={likesCount}
              commentsCount={comments.length}
              hasLiked={hasLiked}
              onLikeClick={handleLikeUnlike}
              likesLoading={likesLoading}
            />
          </div>
        </div>

        <CommentsSection
          user={user}
          comments={comments}
          showComments={showComments}
          visibleComments={visibleComments}
          commentContent={commentContent}
          isSubmittingComment={isSubmittingComment}
          commentsLoading={commentsLoading}
          onToggleComments={toggleComments}
          onCommentChange={setCommentContent}
          onCommentSubmit={handleCommentSubmit}
          onLoadMore={loadMoreComments}
        />

        <DeleteModal
          isOpen={showModal}
          error={deleteError}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default Post;