import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePostStore } from "@/Stores/usePostStore";

export const useLikes = (postId, initialLikes = []) => {
  const navigate = useNavigate();
  const { likeAndUnlikePost, getLikesOfPost } = usePostStore(); 
  const [likes, setLikes] = useState(initialLikes);
  const [likesLoading, setLikesLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");


  const hasLiked = likes.some((like) => like._id === user?._id);

  useEffect(() => {
    
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

    setLikesLoading(true);

    try {
      
      const updatedLikes = hasLiked
        ? likes.filter((like) => like._id !== user._id)
        : [...likes, { _id: user._id }];

      setLikes(updatedLikes);

      
      await likeAndUnlikePost(postId);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
   
      setLikes(likes);
    } finally {
      setLikesLoading(false); 
    }
  };

  return {
    likes,
    hasLiked,
    handleLikeUnlike,
    likesCount: likes.length,
    likesLoading, 
  };
};
