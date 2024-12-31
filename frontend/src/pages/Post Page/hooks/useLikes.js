import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "@/Stores/usePostStore"; // Custom store for API calls

export const useLikes = (postId, initialLikes = []) => {
  const navigate = useNavigate();
  const { likeAndUnlikePost, getLikesOfPost } = usePostStore(); // Include a fetch method
  const [likes, setLikes] = useState(initialLikes);
  const [likesLoading, setLikesLoading] = useState(false); // Add loading state
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // Check if the user has liked the post
  const hasLiked = likes.some((like) => like._id === user?._id);

  useEffect(() => {
    // Fetch likes from the server to ensure synchronization
    const fetchLikes = async () => {
      try {
        const response = await getLikesOfPost(postId);
        setLikes(response);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [getLikesOfPost, postId]);

  const handleLikeUnlike = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setLikesLoading(true); // Set loading to true when the like/unlike process starts

    try {
      // Optimistic update
      const updatedLikes = hasLiked
        ? likes.filter((like) => like._id !== user._id)
        : [...likes, { _id: user._id }];

      setLikes(updatedLikes);

      // API call to toggle like/unlike
      await likeAndUnlikePost(postId);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      // Revert on error
      setLikes(likes);
    } finally {
      setLikesLoading(false); // Set loading to false once the process is complete
    }
  };

  return {
    likes,
    hasLiked,
    handleLikeUnlike,
    likesCount: likes.length,
    likesLoading, // Return loading state
  };
};
