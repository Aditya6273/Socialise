/* eslint-disable react/prop-types */
import { UserIcon } from "lucide-react";
import { Card } from "@/components/ui/card";



export function EmptyState({ title, description }) {
  return (
    <div className="col-span-full">
      <Card className="p-8 text-center border-none bg-gradient-to-br from-background to-muted/50">
        <UserIcon className="h-12 w-12 mx-auto text-muted-foreground/50" />
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </Card>
    </div>
  );
}