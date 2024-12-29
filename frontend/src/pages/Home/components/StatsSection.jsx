import { GlassCard } from "@/components/ui/glass-card";

const stats = [
  { number: "10M+", label: "Active Users" },
  { number: "50M+", label: "Messages Daily" },
  { number: "100+", label: "Countries" }
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <GlassCard 
          key={index}
          className="p-8 text-center hover:scale-105 transition-all duration-300"
        >
          <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400">
            {stat.number}
          </div>
          <div className="text-zinc-400 mt-2">{stat.label}</div>
        </GlassCard>
      ))}
    </div>
  );
}