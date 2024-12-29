/* eslint-disable react/prop-types */
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-lg blur" />
        <div className="relative bg-background/80 rounded-lg backdrop-blur-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search users by name or username..."
            className="pl-10 w-full border-none bg-transparent"
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}