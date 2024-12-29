import { useState, useEffect, useMemo } from "react";
import { useUserStore } from "@/Stores/useUserStore";

export function useUserSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [limitedUsers, setLimitedUsers] = useState([]);
  const { getAllUnBondedUsers, isLoading } = useUserStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getAllUnBondedUsers();
        setUsers(fetchedUsers);
        setLimitedUsers(fetchedUsers.slice(0, 6));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [getAllUnBondedUsers]);

  const filteredUsers = useMemo(() => {
    const searchWords = searchTerm.toLowerCase().split(" ").filter(Boolean);

    const matches = users.filter((user) =>
      searchWords.every((word) =>
        [user.username, user.firstname, user.lastname ,user._id]
          .filter(Boolean)
          .some((field) => field.toLowerCase().includes(word))
      )
    );

    if (searchTerm) {
      return matches;
    }

    return limitedUsers;
  }, [searchTerm, users, limitedUsers]);

 
  useEffect(() => {
    if (!searchTerm) {
     
      setLimitedUsers(users.slice(0, 6));
    }
  }, [searchTerm, users]);

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers,
    isLoading,
  };
}
