import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { TripPlanner } from "@/components/site/TripPlanner";
import { GlobeSection } from "@/components/site/GlobeSection";
import { Destinations } from "@/components/site/Destinations";
import { Products } from "@/components/site/Products";
import { Assistant } from "@/components/site/Assistant";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <main className="relative min-h-dvh overflow-x-clip bg-background text-foreground">
      <Navbar />
      <Hero />
      <TripPlanner />
      <GlobeSection />
      <Destinations />
      <Products />
      <Assistant />
      <Footer />
    </main>
  );
}
