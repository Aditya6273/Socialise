import { Loader2 } from "lucide-react";
import { SearchBar } from "./components/SearchBar";
import { UserCard } from "./components/UserCard";
import { useBondManagement } from "./hooks/useBondManagement";
import { useUserSearch } from "./hooks/useUserSearch";
import { EmptyState } from "./components/EmptyState";
import { BondConfirmDialog } from "./components/BondConfirmation";

export default function MakeBond() {
  const {
    setSelectedUser,
    isDialogOpen,
    setIsDialogOpen,
    handleMakeBond,
    handleUnmakeBond,
  } = useBondManagement();

  const { searchTerm, setSearchTerm, filteredUsers, isLoading } =
    useUserSearch();

  const parsedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const isBonded = (userId) =>
    parsedUser && parsedUser.bondings?.includes(userId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-primary/20 blur-xl" />
          <Loader2 className="relative animate-spin h-12 w-12 text-primary" />
        </div>
      </div>
    );
  }

  const makeBondUsers = filteredUsers.filter((user) => !isBonded(user._id));
  const bondMadeUsers = filteredUsers.filter((user) => isBonded(user._id));

  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Connect with Others
            </h1>
            <p className="text-muted-foreground text-lg">
              Find and connect with other users to create meaningful bonds.
            </p>
          </div>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Make Bond</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {makeBondUsers.length > 0 ? (
                makeBondUsers.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    isBonded={isBonded(user._id)}
                    onBondClick={() => {
                      setSelectedUser(user);
                      setIsDialogOpen(true);
                    }}
                  />
                ))
              ) : (
                <EmptyState
                  title="No users found"
                  description="Try adjusting your search terms or check back later for new users."
                />
              )}
            </div>
          </div>
          <div className="space-y-6 mt-8">
            <h2 className="text-2xl font-semibold">Bond Made</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {bondMadeUsers.length > 0 ? (
                bondMadeUsers.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    isBonded={true}
                    onBondClick={() => handleUnmakeBond(user._id)}
                  />
                ))
              ) : (
                <EmptyState
                  title="No bonds yet"
                  description="Start making connections to create bonds."
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <BondConfirmDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleMakeBond}
        isLoading={isLoading}
      />
    </div>
  );
}
