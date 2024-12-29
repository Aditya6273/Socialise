import { Button } from "@/components/ui/button";
import { Box } from "lucide-react";
import { FeaturesGrid } from "./components/FeatureGrid";
import { StatsSection } from "./components/StatsSection";

import { Link } from "react-router-dom";

export default function Home() {
  const parsedUser = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="min-h-screen relative overflow-hidden bg-zinc-950">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/50 to-zinc-800/30" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-32 pb-20">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="flex items-center space-x-4 animate-fade-in">
              <div className="p-3 rounded-2xl bg-gradient-to-br bg-blue-600 backdrop-blur-sm">
                <Box className="h-8 w-8 text-zinc-300" />
              </div>
              <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400">
                Welcome to Socialise , <span className="text-blue-600">{parsedUser ? parsedUser?.username : ""}</span>
              </h1>
            </div>
            <p className="text-2xl text-zinc-400 max-w-2xl leading-relaxed">
              Connect, Share, and Engage with people around the world in a new
              way of social networking
            </p>
            <div className="flex gap-4 pt-4">
              <Link to={"/register"}>
                <Button size="lg" variant="outline" className="bg-transparent">
                  Get Started
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent"
                onClick={() =>
                  document
                    .getElementById("learn")
                    .scrollIntoView({ behavior: "smooth" })
                }
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="learn" className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-400">
            Why Choose Socialise?
          </h2>
          <FeaturesGrid />
        </section>

        {/* Stats Section */}
        <div className="container mx-auto px-4 py-20">
          <StatsSection />
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-zinc-200">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-zinc-400">
              Start connecting with millions of users worldwide and experience
              social networking like never before.
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-zinc-700 to-zinc-800 hover:from-zinc-600 hover:to-zinc-700 text-zinc-100 rounded-xl px-8 py-6 text-lg mt-4"
            >
              Join Socialise Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
