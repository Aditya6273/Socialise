import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '@/Stores/usePostStore';

export const useComments = (postId) => {
  const navigate = useNavigate();
  const { postComment, getCommentsOfPost } = usePostStore();

  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [showComments, setShowComments] = useState(true);
  const [visibleComments, setVisibleComments] = useState(3);

  const fetchComments = useCallback(async () => {
    if (!postId) return;
    setCommentsLoading(true);
    try {
      const fetchedComments = await getCommentsOfPost(postId);
      setComments(fetchedComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
    } finally {
      setCommentsLoading(false);
    }
  }, [getCommentsOfPost, postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("user") || "null");
    
    if (!user) {
      navigate("/login");
      return;
    }

    if (!commentContent.trim()) return;

    setIsSubmittingComment(true);
    try {
      await postComment(postId, { text: commentContent });
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

  return {
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
  };
};