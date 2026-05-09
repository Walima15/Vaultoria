import { Navbar } from "@/components/navbar";
import { AnimatedBackground } from "@/components/animated-background";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { StatsSection } from "@/components/landing/stats-section";
import { CategoriesSection } from "@/components/landing/categories-section";
import { CTASection } from "@/components/landing/cta-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <AnimatedBackground />
      <Navbar />
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <CategoriesSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
