/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResult';
import { ConnectionsTab } from './components/ConnectionsTab';
import { useConnections } from './hooks/useConnections';
import { useUserStore } from '@/Stores/useUserStore';
import { Loader, Loader2 } from 'lucide-react';


function BondPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { bonding, bonds, isLoading, fetchConnections } = useConnections();
const {makeAndUnMakeBond ,isLoading:Loading} = useUserStore();
  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);
 
  const handleToggleFollow = async (userId) => {
   const res = await makeAndUnMakeBond(userId);
   window.location.reload();
  };

  const filteredUsers = searchQuery
    ? [...bonding, ...bonds].filter((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (isLoading || Loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 size={24}  className='animate-spin'/>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-8">Connections</h1>
        <div className="mb-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        
        {searchQuery ? (
          <SearchResults 
            users={filteredUsers}
            onToggleFollow={handleToggleFollow}
          />
        ) : (
          <ConnectionsTab
            bonds={bonds}
            bonding={bonding}
            onToggleFollow={handleToggleFollow}
          />
        )}
      </div>
    </div>
  );
}

export default BondPage;