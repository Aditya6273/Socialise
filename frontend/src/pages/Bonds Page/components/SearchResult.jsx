/* eslint-disable react/prop-types */
import { UserCard } from './UserCard';




export function SearchResults({ users, bonding, onToggleFollow }) {
  if (users.length === 0) {
    return (
      <div className="text-center text-zinc-500">
        No users found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      {users.map((user) => (
        <UserCard
          key={user._id}
          user={user}
          isbonding={bonding?.some(f => f._id === user._id)}
          onToggleFollow={onToggleFollow}
        />
      ))}
    </div>
  );
}