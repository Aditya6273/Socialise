import { useState, useCallback } from "react";
import { useUserStore } from "@/Stores/useUserStore";

export function useBondManagement() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const { makeAndUnMakeBond, isLoading: globalLoading } = useUserStore();

  const isLoading = localLoading || globalLoading;

  const handleMakeBond = useCallback(async () => {
    if (!selectedUser) return;

    setLocalLoading(true);
    const parsedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const res = await makeAndUnMakeBond(selectedUser._id);

    if (res) {
      const updatedUser = {
        ...parsedUser,
        bondings: [...(parsedUser.bondings || []), selectedUser._id],
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setSelectedUser(null);
      setIsDialogOpen(false);
    }
    setLocalLoading(false);
  }, [selectedUser, makeAndUnMakeBond]);

  const handleUnmakeBond = useCallback(async (userId) => {
    setLocalLoading(true);
    const parsedUser = JSON.parse(localStorage.getItem("user") || "{}");
    const res = await makeAndUnMakeBond(userId);

    if (res) {
      const updatedUser = {
        ...parsedUser,
        bondings: parsedUser.bondings.filter((bond) => bond !== userId),
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
    setLocalLoading(false);
  }, [makeAndUnMakeBond]);

  return {
    selectedUser,
    setSelectedUser,
    isDialogOpen,
    setIsDialogOpen,
    handleMakeBond,
    handleUnmakeBond,
    isLoading, // Unified loading state
  };
}
