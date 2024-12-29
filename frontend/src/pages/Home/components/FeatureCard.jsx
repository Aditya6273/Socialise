/* eslint-disable react/prop-types */
import { Card } from "@/components/ui/card";


export function FeatureCard({ icon, title, description }) {
  return (
    <Card className="p-6 bg-black/40 border-zinc-800 hover:border-zinc-700 transition-all">
      <div className="space-y-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    </Card>
  );
}