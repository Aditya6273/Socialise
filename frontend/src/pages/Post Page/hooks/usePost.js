import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePostStore } from '@/Stores/usePostStore';

export const usePost = (id) => {
  const navigate = useNavigate();
  const {
    getPostById,
    deletePostById,
    isLoading,
    isError,
    error,
  } = usePostStore();

  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isOwner = user?._id === post?.userId._id;

  const fetchPost = useCallback(async () => {
    if (!id) return;
    try {
      const res = await getPostById(id);
      // Don't update likes when fetching post
      setPost(res);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  }, [getPostById, id]);

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

  return {
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
  };
};