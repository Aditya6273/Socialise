/* eslint-disable react/prop-types */
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";



export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search users by username"
        className="pl-9 bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:bg-zinc-900 transition-colors"
      />
    </div>
  );
}