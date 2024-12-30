import { useState, useEffect, useMemo } from 'react';
import { useUserStore } from '@/Stores/useUserStore';
import { matchesSearchTerm } from './searchUtils';



const USERS_PER_PAGE = 6;

export const useUserSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const { getAllUnBondedUsers, isLoading } = useUserStore();

  const loggedInUser = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || '{"bondings": []}');
    } catch {
      return { bondings: [] };
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchUsers = async () => {
      try {
        const allUsers = await getAllUnBondedUsers();
        if (!mounted) return;

        const unbondedUsers = allUsers.filter(
          user => !loggedInUser.bondings.some(bond => bond.userId === user._id)
        );
        setUsers(shuffleArray(unbondedUsers));
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
    return () => { mounted = false };
  }, [getAllUnBondedUsers, loggedInUser.bondings]);

  const filteredUsers = useMemo(() => {
    const matchingUsers = users.filter(user => matchesSearchTerm(user, searchTerm));
    return searchTerm ? matchingUsers : matchingUsers.slice(0, USERS_PER_PAGE);
  }, [searchTerm, users]);

  const reshuffleUsers = () => {
    setUsers(prevUsers => shuffleArray([...prevUsers]));
  };

  return {
    searchTerm,
    setSearchTerm,
    filteredUsers,
    isLoading,
    totalUsers: users.length,
    reshuffleUsers
  };
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

