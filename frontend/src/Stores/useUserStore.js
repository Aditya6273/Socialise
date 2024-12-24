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
      const res = await Axios.post("/users/register", data);
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
      set({ isError: true, error: error, isLoading: false });
      toast.error("Failed to register user");
      throw error;
    }
  },

  login: async (data) => {
    try {
      set({ isLoading: true });
      const res = await Axios.post("/users/login", data);
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
      set({ isError: true, error: error, isLoading: false });
      toast.error("Error " + error.message);
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true });
      const res = await Axios.get("/users/logout");
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
      set({ isError: true, error: error, isLoading: false });
      toast.error("Error " + error.message);
      throw error;
    }
  },
}));
