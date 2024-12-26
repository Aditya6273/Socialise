import Axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  isLoading: false,
  isError: false,
  error: null,
  isAuthenticated: false,

  signup: async (data) => {
    try {
      set({ isLoading: true });
      const res = await Axios.post("/auth/register", data);
      console.log(res.data);
      set({
        isLoading: false,
        isError: false,
        isAuthenticated: true,
        user: res.data.user,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("User registered successfully");
      return res.data.user;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";

      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  login: async (data) => {
    try {
      set({ isLoading: true });
      const res = await Axios.post("/auth/login", data);
      set({
        isLoading: false,
        isError: false,
        isAuthenticated: true,
        user: res.data.user,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("User logged in successfully");

      return res.data.user;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";

      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      const res = await Axios.get("/auth/logout");
      set({
        isLoading: false,
        isError: false,
        isAuthenticated: false,
        user: null,
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("User logged out successfully");
      console.log(res.data);
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
      
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },
  getProfile:async () =>{
    try {
      set({ isLoading: true });
      const res = await Axios.get("/auth/profile");
      set({
        isLoading: false,
        isError: false,
        user: res.data.user,
      });
     return res.data.user;
      // console.log(res.data.user);
      
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
      
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isLoading: true, isError: false, error: null }); // Reset error state before request
      const res = await Axios.put("/auth/update-profile", data);
      set({
        isLoading: false,
        user: res.data.user,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Profile updated successfully");
      return res.data.user; // Return updated user data
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "An unexpected error occurred";
      set({ isLoading: false, isError: true, error: errorMessage });
      toast.error(errorMessage);
      throw error; 
    }
  },
  
}));
