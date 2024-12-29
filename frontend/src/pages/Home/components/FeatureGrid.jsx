import { MessageCircle, Share2, Sparkles, Shield, Globe2, Users } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";

const features = [
  {
    icon: MessageCircle,
    title: "Real-time Chat",
    description: "Connect instantly with friends through our lightning-fast messaging system"
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share your moments, thoughts, and stories with just a few clicks"
  },
  {
    icon: Sparkles,
    title: "Rich Content",
    description: "Express yourself with multimedia posts, stories, and interactive content"
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "Advanced privacy controls to keep your data safe and secure"
  },
  {
    icon: Globe2,
    title: "Global Community",
    description: "Connect with like-minded people from around the world"
  },
  {
    icon: Users,
    title: "Group Features",
    description: "Create and join groups based on your interests and passions"
  }
];

export function FeaturesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <GlassCard 
          key={index}
          className="p-6 group hover:scale-[1.02] transition-all duration-300"
        >
          <feature.icon className="h-8 w-8 text-zinc-400 group-hover:text-zinc-300 transition-colors" />
          <h3 className="text-xl font-semibold mt-4 mb-2 text-zinc-200">
            {feature.title}
          </h3>
          <p className="text-zinc-400">
            {feature.description}
          </p>
        </GlassCard>
      ))}
    </div>
  );
}