import Axios from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useUserStore = create((set) => ({
  // Initialize user from localStorage
  user: JSON.parse(localStorage.getItem("user") || "null"),
  isLoading: false,
  isError: false,
  error: null,

  signup: async (data) => {
    try {
      set({ isLoading: true });
      const res = await Axios.post("/auth/register", data);
      const { user, token } = res.data;

      set({
        isLoading: false,
        isError: false,
        user,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("User registered successfully");

      return user;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  login: async (data) => {
    try {
      set({ isLoading: true });
      const res = await Axios.post("/auth/login", data);
      const { user, token } = res.data;

      set({
        isLoading: false,
        isError: false,
        user,
      });
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("User logged in successfully");

      return user;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Logout
  logout: async () => {
    try {
      set({ isLoading: true });
      const res = await Axios.get("/auth/logout");

      set({
        isLoading: false,
        isError: false,
        user: null,
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("User logged out successfully");

      return res.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Fetch user profile
  getProfile: async () => {
    try {
      set({ isLoading: true });
      const res = await Axios.get("/auth/profile");

      set({
        isLoading: false,
        isError: false,
        user: res.data.user,
      });

      localStorage.setItem("user", JSON.stringify(res.data.user));

      return res.data.user;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      set({ isError: true, error: errorMessage, isLoading: false });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Update profile
  updateProfile: async (data) => {
    try {
      set({ isLoading: true, isError: false, error: null });
      const res = await Axios.put("/auth/update-profile", data);

      set({
        isLoading: false,
        user: res.data.user,
      });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Profile updated successfully");

      return res.data.user;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      set({ isLoading: false, isError: true, error: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  },

  // Get user by ID
  getUserById: async (userId) => {
    try {
      set({ isLoading: true });
      const res = await Axios.get(`/users/get-user/${userId}`);

      set({
        isLoading: false,
        isError: false,
        user: res.data.user,
      });

      localStorage.setItem("userbyid", JSON.stringify(res.data.user));

      return res.data.user;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      set({ isLoading: false, isError: true, error: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  },
  getAllUnBondedUsers: async () => {
    try {
      set({ isLoading: true });
      const res = await Axios.get("/users/all-users");
      set({
        isLoading: false,
        isError: false,
        unbondedUsers: res.data.users,
      });
      return res.data.users;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      set({ isLoading: false, isError: true, error: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  },
  makeAndUnMakeBond: async (id) => {
    try {
      set({ isLoading: true });

      const res = await Axios.post(`/users/make-bond/${id}`);
      const { loggedInUser, message } = res.data;

      localStorage.setItem("user", JSON.stringify(loggedInUser));

      set({
        isLoading: false,
        isError: false,
      });

      toast.success(message);
      return res.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";

      set({ isLoading: false, isError: true, error: errorMessage });

      toast.error(errorMessage);
      throw error;
    }
  },

  getBondings: async () => {
    try {
      set({ isLoading: true });
      const res = await Axios.get("/users/get-bondings");
      set({
        isLoading: false,
        isError: false,
        bondings: res.data.bondings,
      });
      return res.data.bondings;


    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
      set({ isLoading: false, isError: true, error: errorMessage });
      toast.error(errorMessage);
      throw error;
    }
  },
  getBonds:async () => {
    try {
      set({ isLoading: true });
      const res = await Axios.get("/users/get-bonds");
      set({
        isLoading: false,
        isError: false,
        bonds: res.data.bonds,
      });
      return res.data.bonds;
      
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred";
        set({ isLoading: false, isError: true, error: errorMessage });
        toast.error(errorMessage);
        throw error;
      
    }
  }
}));
