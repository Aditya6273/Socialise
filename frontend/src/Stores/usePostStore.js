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
  getPostById : async (id) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      const res = await Axios.get(`/posts/get-post/${id}`);
      set({ post: res.data.post, isLoading: false });
      toast.success("Post fetched successfully");
      return res.data.post;
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        error: error.response?.data?.message || "An unexpected error occurred",
      });
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      console.error(error);
    }
  },
  deletePostById : async (id) => {
    set({ isLoading: true, isError: false, error: null });
    try {
      await Axios.delete(`/posts/delete/${id}`);
      const updatedPosts = get().posts.filter((post) => post._id!== id);
      set({ posts: updatedPosts, isLoading: false });
      toast.success("Post deleted successfully");
    } catch (error) {
      set({
        isLoading: false,
        isError: true,
        error: error.response?.data?.message || "An unexpected error occurred",
      });
      toast.error(error.response?.data?.message || "An unexpected error occurred");
      console.error(error);
    }
  }
}));
