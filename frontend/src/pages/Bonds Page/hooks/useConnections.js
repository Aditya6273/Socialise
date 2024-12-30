import { useCallback, useState } from 'react';
import { useUserStore } from '@/Stores/useUserStore';


export function useConnections() {
  const [bonding, setBonding] = useState([]);
  const [bonds, setBonds] = useState([]);
  const { getBondings, getBonds, isLoading } = useUserStore();

  const fetchConnections = useCallback(async () => {
    try {
      const bondingData = await getBondings();
      const bondsData = await getBonds();
      setBonding(bondingData || []);
      setBonds(bondsData || []);
    } catch (error) {
      console.error('Error fetching connections:', error);
    }
  }, [getBondings, getBonds]);

  return {
    bonding,
    bonds,
    isLoading,
    fetchConnections
  };
}