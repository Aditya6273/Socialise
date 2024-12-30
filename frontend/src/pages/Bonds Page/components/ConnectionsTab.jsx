/* eslint-disable react/prop-types */
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCard } from "./UserCard";




export function ConnectionsTab({ bonds, bonding, onToggleFollow }) {
  return (
    <Tabs defaultValue="bonding" className="w-full">
      <TabsList className="w-full bg-zinc-900/50 border-b border-zinc-800">
        <TabsTrigger
          value="bonding"
          className="flex-1 data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
        >
          Bonding ({bonding?.length || 0})
        </TabsTrigger>
        <TabsTrigger
          value="bonds"
          className="flex-1 data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 hover:bg-zinc-800/50 transition-colors"
        >
          Bonds ({bonds?.length || 0})
        </TabsTrigger>
      </TabsList>
      <TabsContent value="bonding" className="mt-4 space-y-3">
        {bonding.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            isbonding={true}
            onToggleFollow={onToggleFollow}
          />
        ))}
        {bonding.length === 0 && (
          <p className="text-center text-zinc-500">You are not bonding anyone yet</p>
        )}
      </TabsContent>
      <TabsContent value="bonds" className="mt-4 space-y-3">
        {bonds.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            isbonding={bonding.some(f => f._id === user._id)}
            onToggleFollow={onToggleFollow}
          />
        ))}
        {bonds.length === 0 && (
          <p className="text-center text-zinc-500">You don&apos;t have any bonds yet</p>
        )}
      </TabsContent>
    </Tabs>
  );
}