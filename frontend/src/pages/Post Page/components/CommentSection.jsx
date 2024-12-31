/* eslint-disable react/prop-types */
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';


export const CommentsSection = ({
  user,
  comments,
  showComments,
  visibleComments,
  commentContent,
  isSubmittingComment,
  commentsLoading,
  onToggleComments,
  onCommentChange,
  onCommentSubmit,
  onLoadMore,
}) => {
  return (
    <div className="mt-8 bg-zinc-900 rounded-xl shadow-sm overflow-hidden">
      <button
        onClick={onToggleComments}
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
          <CommentForm
            user={user}
            commentContent={commentContent}
            isSubmitting={isSubmittingComment}
            onCommentChange={onCommentChange}
            onSubmit={onCommentSubmit}
          />

          <CommentList
            comments={comments}
            visibleComments={visibleComments}
            isLoading={commentsLoading}
            onLoadMore={onLoadMore}
          />
        </div>
      )}
    </div>
  );
};