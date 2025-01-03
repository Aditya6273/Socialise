import Axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const usePostStore = create((set, get) => ({
  posts: [],
  isLoading: false,
  isError: false,
  error: null,

  createPost: async (data) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const res = await Axios.post("/posts/create", data);
      const currentPosts = get().posts;
      set({ posts: [...currentPosts, res.data], isLoading: false });
      return res;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        error: error.response?.data?.message || "An unexpected error occurred",
      });
      console.error(error);
    }
  },
  getPostById: async (id) => {
    set({ isError: false, error: null });
    try {
      const res = await Axios.get(`/posts/get-post/${id}`);
      const post = res.data.post;

      // Update the state
      set({ post, isLoading: false });

      // Update the user's posts array in localStorage
      const parsedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...parsedUser,
        posts: [...(parsedUser.posts || []), post],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // Show success notification
     

      return post;
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";

      set({
        isLoading: false,
        isError: true,
        error: errorMessage,
      });

      toast.error(errorMessage);
      console.error(error);
    }
  },
  deletePostById: async (id) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      // Send delete request to the backend
      await Axios.delete(`/posts/delete/${id}`);

      // Update posts in the store
      const updatedPosts = get().posts.filter((post) => post._id !== id);
      set({ posts: updatedPosts, isLoading: false });

      // Update the user's posts array in localStorage
      const parsedUser = JSON.parse(localStorage.getItem("user") || "{}");
      const updatedUser = {
        ...parsedUser,
        posts: (parsedUser.posts || []).filter((post) => post._id !== id),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Post deleted successfully");
    } catch (error) {
      // Handle errors
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";

      set({
        isLoading: false,
        isError: true,
        error: errorMessage,
      });

      toast.error(errorMessage);
      console.error(error);
    }
  },
  getAllPosts: async () => {
    try {
      set({ isLoading: true, isError: false, error: null });
      const res = await Axios.get("/posts/all-posts");

      if (res?.data?.posts) {
        set({ posts: res.data.posts, isLoading: false });
        return res.data.posts;
      } else {
        set({ isLoading: false, isError: true, error: "No posts found" });
        toast.error("No posts found");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";

      set({
        isLoading: false,
        isError: true,
        error: errorMessage,
      });

      toast.error(errorMessage);
    }
  },
  getBondingsPosts: async () => {
    try {
      set({ isLoading: true, isError: false, error: null });
      const res = await Axios.get("/posts/get-bondings-posts");
      if (res?.data?.posts) {
        set({ posts: res.data.posts, isLoading: false });

        return res.data.posts;
      } else {
        set({ isLoading: false, isError: true, error: "No posts found" });
        toast.error("No posts found");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      set({
        isLoading: false,
        isError: true,
        error: errorMessage,
      });
      toast.error(errorMessage);
    }
  },
  postComment: async (id, text) => {
    try {
      set({ isError: false, error: null });
      const res = await Axios.post(`/comments/add-comment/${id}`, text);
      const currentPosts = get().posts;
      const updatedPosts = currentPosts.map((post) =>
        post._id === id
          ? { ...post, comments: [...post.comments, res.data] }
          : post
      );
      set({ posts: updatedPosts, isLoading: false });
      return res.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      set({
        isLoading: false,
        isError: true,
        error: errorMessage,
      });
      toast.error(errorMessage);
    }
  },
  getCommentsOfPost: async (id) => {
    try {
      set({ isError: false, error: null });
      const res = await Axios.get(`/comments/get-comments/${id}`);
      return res.data.comments;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      set({
        isLoading: false,
        isError: true,
        error: errorMessage,
      });
      toast.error(errorMessage);
    }
  },
  deleteComment: async (id) => {
    try {
      set({ isLoading: true, isError: false, error: null });
      await Axios.delete(`/comments/delete-comment/${id}`);

      const updatedPosts = get().posts.map((post) =>
        post.comments.map((comment) =>
          comment._id === id ? { ...comment, isDeleted: true } : comment
        )
      );
      set({ posts: updatedPosts, isLoading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred";
      set({
        isLoading: false,
        isError: true,
        error: errorMessage,
      });
      toast.error(errorMessage);
    }
  },
  likeAndUnlikePost: async (id) => {
    try {
      set({ isError: false, error: null });

      const res = await Axios.post(`/posts/like/${id}`);
      const { message, post } = res.data;

      const currentPosts = get().posts;
      const updatedPosts = currentPosts.map((p) =>
        p._id === post._id ? post : p
      );

      set({
        posts: updatedPosts,
        isLoading: false,
        isError: false,
      });

      toast.success(message);

      return post;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";

      set({
     
        isError: true,
        error: errorMessage,
      });

      toast.error(errorMessage);
      throw error;
    }
  },
  getLikesOfPost: async (id) => {
    try {
      set({ isError: false, error: null });
      const res = await Axios.get(`/posts/get-likes/${id}`);
      return res.data.likes;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      set({
       
        isError: true,
        error: errorMessage,
      });
      toast.error(errorMessage);
    }
  },
}));
